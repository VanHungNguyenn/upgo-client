import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Table } from 'antd'
import { getKeys } from '../../redux/toolkits/keySlice'
import { Link } from 'react-router-dom'
import { currencyComma, formatDay } from '../../utils'
import { Button, Divider, Tag } from 'antd'
import Swal from 'sweetalert2'

const ListKeys = () => {
	const dispatch = useDispatch()
	const [data, setData] = useState([])
	const [search, setSearch] = useState('')
	const [dataSource, setDataSource] = useState([])

	const fetchKeys = useCallback(async () => {
		try {
			const res = await axios.get('/key/all', {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})

			setData(res.data.keys)
			setDataSource(res.data.keys)
			dispatch(getKeys(res.data.keys))
		} catch (error) {
			console.log(error.message)
		}
	}, [dispatch])

	useEffect(() => {
		fetchKeys()
	}, [fetchKeys])

	const handleSearchChange = (e) => {
		setSearch(e.target.value)

		if (e.target.value === '') {
			setDataSource(data)
		} else {
			const newData = data.filter((item) => {
				// search with key, seller, note and expired
				return (
					item.key
						.toLowerCase()
						.includes(e.target.value.toLowerCase()) ||
					item.seller
						.toLowerCase()
						.includes(e.target.value.toLowerCase()) ||
					item.note
						.toLowerCase()
						.includes(e.target.value.toLowerCase()) ||
					item.expired
						.toLowerCase()
						.includes(e.target.value.toLowerCase())
				)
			})
			setDataSource(newData)
		}
	}

	const handleDelete = (record) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then(async (result) => {
			if (result.value) {
				// call api
				const res = await axios.delete(`/key/delete/${record._id}`, {
					headers: {
						Authorization: localStorage.getItem('token'),
					},
				})

				if (res.status === 200) {
					Swal.fire(
						'Deleted!',
						'Your file has been deleted.',
						'success'
					)
				}

				fetchKeys()
			}
		})
	}

	const columns = [
		{
			title: '#',
			dataIndex: 'id_key',
			key: 'id_key',
		},
		{
			title: 'Seller',
			dataIndex: 'seller',
			key: 'seller',
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			render: (price) => <span>{currencyComma(price)} VND</span>,
			sorter: (a, b) => a.price - b.price,
		},
		{
			title: 'Key',
			dataIndex: 'key',
			key: 'key',
		},
		{
			title: 'Create Date',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (createdAt) => <span>{formatDay(createdAt)}</span>,
		},
		{
			title: 'Expired',
			dataIndex: 'expired',
			key: 'expired',
			render: (expired) => <span>{formatDay(expired)}</span>,
			sorter: (a, b) => new Date(a.expired) - new Date(b.expired),
		},
		{
			title: 'Note',
			dataIndex: 'note',
			key: 'note',
		},
		{
			title: 'Forever',
			dataIndex: 'forever',
			key: 'forever',
			render: (forever) => (
				<span>
					{forever ? (
						<Tag color='green'>Yes</Tag>
					) : (
						<Tag color='red'>No</Tag>
					)}
				</span>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<span>
					<Link to={`/edit-key/${record._id}`}>
						<Button type='primary'>Edit</Button>
					</Link>
					<Divider type='vertical' />
					<Button
						type='primary'
						danger
						onClick={() => handleDelete(record)}
					>
						Delete
					</Button>
				</span>
			),
		},
	]

	return (
		<>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4'>
				<div className='d-block mb-4 mb-md-0'>
					<h2 className='h4'>List Keys</h2>
				</div>
				<div className='btn-toolbar mb-2 mb-md-0'>
					<Link
						to='/add-key'
						className='btn btn-sm btn-gray-800 d-inline-flex align-items-center'
					>
						<svg
							className='icon icon-xs me-2'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M12 6v6m0 0v6m0-6h6m-6 0H6'
							></path>
						</svg>
						Add Key
					</Link>
				</div>
			</div>
			<div className='table-settings mb-4'>
				<div className='row align-items-center justify-content-between'>
					<div className='col col-md-6 col-lg-3 col-xl-4'>
						<div className='input-group me-2 me-lg-3 fmxw-400'>
							<span className='input-group-text'>
								<svg
									className='icon icon-xs'
									x-description='Heroicon name: solid/search'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									aria-hidden='true'
								>
									<path
										fillRule='evenodd'
										d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
										clipRule='evenodd'
									></path>
								</svg>
							</span>
							<input
								type='text'
								className='form-control'
								placeholder='Search key'
								value={search}
								onChange={handleSearchChange}
							/>
						</div>
					</div>
				</div>
			</div>
			<Table
				columns={columns}
				dataSource={dataSource}
				scroll={{ x: '100%' }}
			/>
		</>
	)
}

export default ListKeys
