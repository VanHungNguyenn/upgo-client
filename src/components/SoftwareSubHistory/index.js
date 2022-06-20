import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import { Table } from 'antd'
import axios from 'axios'
import { currencyComma, formatDay } from '~/utils'

const SoftwareSubHistory = () => {
	const [softwareSubHistory, setSoftwareSubHistory] = useState([])

	const fetchSoftwareSubHistory = useCallback(async () => {
		try {
			const res = await axios.get('/historysub/infor', {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})

			setSoftwareSubHistory(res.data.softwares)
		} catch (error) {
			console.log(error.message)
		}
	}, [])

	useEffect(() => {
		fetchSoftwareSubHistory()
	}, [fetchSoftwareSubHistory])

	const columns = [
		{
			title: 'Software Name',
			dataIndex: 'nameProduct',
			key: 'nameProduct',
			sorter: (a, b) => a.nameSoftware.localeCompare(b.nameSoftware),
		},
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Key',
			dataIndex: 'key',
			key: 'key',
			sorter: (a, b) => a.key.localeCompare(b.key),
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			render: (price) => currencyComma(price),
		},
		{
			title: 'Purchase Date',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (createdAt) => formatDay(createdAt),
		},
	]

	return (
		<>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4'>
				<div className='d-block mb-4 mb-md-0'>
					<h2 className='h4'>Software Subcription History</h2>
				</div>
			</div>
			<Table
				columns={columns}
				dataSource={softwareSubHistory}
				rowKey={(record) => record._id}
				bordered={true}
				scroll={{ x: '100%' }}
			/>
		</>
	)
}

export default SoftwareSubHistory
