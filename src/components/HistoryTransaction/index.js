import { useCallback, useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getAllHistoryTransaction } from '~/redux/toolkits/historyTransactionSlice'
import { currencyComma, formatDay } from '~/utils'

const HistoryTransaction = () => {
	const dispatch = useDispatch()
	const historyTransaction = useSelector((state) => state.historyTransaction)

	const fetchHistoryTransaction = useCallback(async () => {
		try {
			const res = await axios.get('/history/transaction', {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})

			dispatch(getAllHistoryTransaction(res.data.historyTransaction))
		} catch (error) {
			console.log(error.message)
		}
	}, [dispatch])

	useEffect(() => {
		fetchHistoryTransaction()
	}, [fetchHistoryTransaction])

	const columns = [
		{
			title: 'ID',
			dataIndex: '_id',
			key: '_id',
		},
		{
			title: 'User',
			dataIndex: 'nameUser',
			key: 'nameUser',
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
			key: 'amount',
			render: (amount) => currencyComma(amount),
			sorter: (a, b) => a.amount - b.amount,
		},
		{
			title: 'Note',
			dataIndex: 'note',
			key: 'note',
			sorter: (a, b) => a.note.localeCompare(b.note),
		},
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			render: (date) => formatDay(date),
		},
	]

	const data = historyTransaction

	return (
		<>
			<Table
				columns={columns}
				dataSource={data}
				rowKey={(record) => record._id}
				bordered={true}
				scroll={{ x: '100%' }}
			/>
		</>
	)
}

export default HistoryTransaction
