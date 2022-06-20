import { useCallback, useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getAllHistoryMomo } from '~/redux/toolkits/historyMomoSlice'
import { currencyComma, formatDay } from '~/utils'

const HistoryMomo = () => {
	const dispatch = useDispatch()
	const historyMomo = useSelector((state) => state.historyMomo)

	const fetchHistoryMomo = useCallback(async () => {
		try {
			const res = await axios.get('/history/momo', {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})

			dispatch(getAllHistoryMomo(res.data.historyMomo))
		} catch (error) {
			console.log(error.message)
		}
	}, [dispatch])

	useEffect(() => {
		fetchHistoryMomo()
	}, [fetchHistoryMomo])

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

	const data = historyMomo

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

export default HistoryMomo
