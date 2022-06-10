import React from 'react'
import { Table, Tag } from 'antd'
// import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
// import { getSoftwareUser } from '~/redux/toolkits/softwareUserSlice'
import { currencyComma, formatDay } from '~/utils'

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
		title: 'Key',
		dataIndex: 'key',
		key: 'key',
	},
	{
		title: 'Price',
		dataIndex: 'price',
		key: 'price',
		render: (price) => <span>{currencyComma(price)}</span>,
	},
	{
		title: 'Create Date',
		dataIndex: 'createdAt',
		key: 'createdAt',
		render: (createdAt) => <span>{formatDay(createdAt)}</span>,
	},
	{
		title: 'Expired Date',
		dataIndex: 'expired',
		key: 'expired',
		render: (expired) => <span>{formatDay(expired)}</span>,
	},
	{
		title: 'Seller',
		dataIndex: 'seller',
		key: 'seller',
	},
	{
		title: 'Status',
		render: (expired) => {
			if (Date.now() > expired) {
				return <Tag color='red'>Expired</Tag>
			} else {
				return <Tag color='green'>Active</Tag>
			}
		},
	},
]

const Manage = () => {
	const id_user = useSelector((state) => state.auth?.username)
	console.log({ id_user })

	return (
		<div className='manage'>
			<Table columns={columns} dataSource={[]} />
		</div>
	)
}

export default Manage
