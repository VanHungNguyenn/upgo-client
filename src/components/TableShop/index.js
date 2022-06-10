import React, { useCallback, useEffect, useState } from 'react'
import { Table, Tag } from 'antd'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '~/redux/toolkits/productSlice'
import { currencyComma } from '~/utils'

const columns = [
	{
		title: 'ID',
		dataIndex: 'id',
		key: 'id',
	},
	{
		title: 'Name software',
		dataIndex: 'nameProduct',
		key: 'nameProduct',
	},
	{
		title: '1 month',
		dataIndex: 'price',
		key: 'price',
		render: (price) => (
			<span>
				{price ? (
					<Tag color='green'>{currencyComma(price)} VND</Tag>
				) : (
					<Tag color='red'>None</Tag>
				)}
			</span>
		),
		sorter: (a, b) => a.price - b.price,
	},
	{
		title: '3 month',
		dataIndex: 'price1',
		key: 'price1',
		render: (price1) => (
			<span>
				{price1 ? (
					<Tag color='green'>{currencyComma(price1)} VND</Tag>
				) : (
					<Tag color='red'>None</Tag>
				)}
			</span>
		),
		sorter: (a, b) => a.price1 - b.price1,
	},
	{
		title: '6 month',
		dataIndex: 'price2',
		key: 'price2',
		render: (price2) => (
			<span>
				{price2 ? (
					<Tag color='green'>{currencyComma(price2)} VND</Tag>
				) : (
					<Tag color='red'>None</Tag>
				)}
			</span>
		),
		sorter: (a, b) => a.price2 - b.price2,
	},
	{
		title: '1 year',
		dataIndex: 'price3',
		key: 'price3',
		render: (price3) => (
			<span>
				{price3 ? (
					<Tag color='green'>{currencyComma(price3)} VND</Tag>
				) : (
					<Tag color='red'>None</Tag>
				)}
			</span>
		),
		sorter: (a, b) => a.price3 - b.price3,
	},
	{
		title: 'Description',
		dataIndex: 'desc',
		key: 'desc',
	},
	{
		title: 'Note',
		dataIndex: 'note',
		key: 'note',
	},
]

const TableShop = () => {
	const [searchText, setSearchText] = useState('')
	const dispatch = useDispatch()
	const products = useSelector((state) => state.products)

	const fetchProduct = useCallback(async () => {
		try {
			const res = await axios.get('/product/all', {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})

			dispatch(getProducts(res.data.products))
		} catch (error) {
			console.log(error)
		}
	}, [dispatch])

	useEffect(() => {
		fetchProduct()
	}, [fetchProduct])

	const handleSearchChange = (e) => {
		setSearchText(e.target.value)
	}

	const dataProduct = products.map((product, i) => {
		return {
			...product,
			id: i + 1,
		}
	})

	return (
		<>
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
								placeholder='Search products'
								value={searchText}
								onChange={handleSearchChange}
							/>
						</div>
					</div>
				</div>
			</div>
			<Table
				columns={columns}
				dataSource={dataProduct}
				rowKey={(record) => record._id}
				bordered
			/>
		</>
	)
}

export default TableShop
