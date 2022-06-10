import React, { useEffect, useCallback } from 'react'
import axios from 'axios'
import { getHistoryRecharge } from '~/redux/toolkits/historyRechargeSlice'
import { currencyComma, formatDay } from '~/utils'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'

const columns = [
	{
		title: 'Id',
		dataIndex: '_id',
		key: '_id',
	},
	{
		title: 'Content',
		dataIndex: 'note',
		key: 'note',
		sorter: (a, b) => a.note.localeCompare(b.note),
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		key: 'amount',
		render: (amount) => <span>{currencyComma(amount)} VND</span>,
		sorter: (a, b) => a.amount - b.amount,
	},
	{
		title: 'Date',
		dataIndex: 'date',
		key: 'date',
		render: (date) => <span>{formatDay(date)}</span>,
	},
]

const History = () => {
	const dispatch = useDispatch()
	const historyRecharge = useSelector((state) => state.historyRecharge)

	const fetchHistoryRecharge = useCallback(async () => {
		try {
			const res = await axios.get('/user/history_recharge', {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})

			dispatch(getHistoryRecharge(res.data.history))
		} catch (error) {
			console.log(error.message)
		}
	}, [dispatch])

	useEffect(() => {
		fetchHistoryRecharge()
	}, [fetchHistoryRecharge])

	return (
		<>
			<Table
				columns={columns}
				dataSource={historyRecharge}
				bordered
				rowKey={(record) => record._id}
			/>
		</>
	)
}

export default History
