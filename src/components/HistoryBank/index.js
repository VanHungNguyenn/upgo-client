import { useCallback, useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getAllHistoryBank } from '~/redux/toolkits/historyBankSlice'
import { currencyComma, formatDay } from '~/utils'

const HistoryBank = () => {
	const dispatch = useDispatch()
	const historyBank = useSelector((state) => state.historyBank)

	const fetchHistoryBank = useCallback(async () => {
		try {
			const res = await axios.get('/history/bank', {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})

			dispatch(getAllHistoryBank(res.data.historyBank))
		} catch (error) {
			console.log(error.message)
		}
	}, [dispatch])

	useEffect(() => {
		fetchHistoryBank()
	}, [fetchHistoryBank])

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'User',
			dataIndex: 'nameUser',
			key: 'nameUser',
			render: (nameUser) => (nameUser ? nameUser : '-'),
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			sorter: (a, b) => a.status.localeCompare(b.status),
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
			key: 'amount',
			render: (amount) => currencyComma(amount, 'VND'),
			sorter: (a, b) => a.amount - b.amount,
		},
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			render: (date) => formatDay(date),
		},
	]

	const data = historyBank

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

export default HistoryBank
