import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Table } from 'antd'

import { Link } from 'react-router-dom'
import { currencyComma } from '~/utils'
import { Button, Divider, Tag } from 'antd'
import Swal from 'sweetalert2'
import { getMembers } from '~/redux/toolkits/memberSlice'

const ListMembers = () => {
	const dispatch = useDispatch()
	const [data, setData] = useState([])
	const [search, setSearch] = useState('')
	const [dataSource, setDataSource] = useState([])

	const fetchMembers = useCallback(async () => {
		try {
			const res = await axios.get('/user/all', {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})

			setData(res.data.users)
			setDataSource(res.data.users)
			dispatch(getMembers(res.data.users))
		} catch (error) {
			console.log(error.message)
		}
	}, [dispatch])

	useEffect(() => {
		fetchMembers()
	}, [fetchMembers])

	const handleSearchChange = (e) => {
		setSearch(e.target.value)

		if (e.target.value === '') {
			setDataSource(data)
		} else {
			const newData = data.filter((item) => {
				// search with name, email, note
				return (
					item.name
						.toLowerCase()
						.includes(e.target.value.toLowerCase()) ||
					item.email
						.toLowerCase()
						.includes(e.target.value.toLowerCase()) ||
					item.note
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
		}).then((result) => {
			if (result.value) {
				const res = axios.delete(`/user/delete/${record._id}`, {
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

				fetchMembers()
			}
		})
	}

	const columns = [
		{
			title: '#',
			dataIndex: 'id_user',
			key: 'id_user',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Balance',
			dataIndex: 'balance',
			key: 'balance',
			render: (balance) => <span>{currencyComma(balance)} VND</span>,
		},
		{
			title: 'Total',
			dataIndex: 'totalDeposit',
			key: 'totalDeposit',
			render: (totalDeposit) => (
				<span>{currencyComma(totalDeposit)} VND</span>
			),
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Note',
			dataIndex: 'note',
			key: 'note',
		},
		{
			title: 'Role',
			dataIndex: 'role',
			key: 'role',
			render: (role) => {
				return (
					<span>
						{role === 0 ? (
							<Tag color='green'>Admin</Tag>
						) : role === 1 ? (
							<Tag color='blue'>Seller</Tag>
						) : (
							<Tag color='purple'>Customer</Tag>
						)}
					</span>
				)
			},
		},
		{
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<span>
					<Link to={`/edit-member/${record._id}`}>
						<Button type='primary'>Edit</Button>
					</Link>
					<Divider type='vertical' />
					<Button type='danger' onClick={() => handleDelete(record)}>
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
					<h2 className='h4'>List Members</h2>
				</div>
				<div className='btn-toolbar mb-2 mb-md-0'>
					<Link
						to='/add-member'
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
						Add Member
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
								placeholder='Search member'
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
				rowKey='_id'
				bordered
				scroll={{ x: '100%' }}
			/>
		</>
	)
}

export default ListMembers
