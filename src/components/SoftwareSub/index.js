import { useState, useCallback, useEffect } from 'react'
import { Table, Tag, Modal, Form, Input } from 'antd'
import axios from 'axios'
import { formatDay } from '~/utils'
import CustomButton from '../CustomButton'
import { showErrorMessage, showSuccessMessage } from '~/utils/Notification'

const init = {
	_id: null,
	key: '',
}

const SoftwareSub = () => {
	const [valuesForm, setValueForm] = useState(init)
	const [visibleEditForm, setVisibleEditForm] = useState(false)

	const { _id, key } = valuesForm

	const [softwareSubs, setSoftwareSubs] = useState([])

	const fetchSoftwareSubs = useCallback(async () => {
		try {
			const res = await axios.get('/softwaresub/infor', {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})

			setSoftwareSubs(res.data.softwareSubsWithNameSoftware)
		} catch (error) {
			console.log(error.message)
		}
	}, [])

	useEffect(() => {
		fetchSoftwareSubs()
	}, [fetchSoftwareSubs])

	const columns = [
		{
			title: 'Software Name',
			dataIndex: 'nameSoftware',
			key: 'nameSoftware',
			sorter: (a, b) => a.nameSoftware.localeCompare(b.nameSoftware),
		},
		{
			title: 'Key',
			dataIndex: 'key',
			key: 'key',
			sorter: (a, b) => a.key.localeCompare(b.key),
		},
		{
			title: 'Expired Date',
			dataIndex: 'expDate',
			key: 'expDate',
			render: (expDate, record) => {
				if (record.type === 'product') {
					return <Tag color='red'>None</Tag>
				} else {
					// if expDate < today => expired
					if (new Date(expDate) < new Date()) {
						return <Tag color='red'>{formatDay(expDate)}</Tag>
					}

					return <Tag color='green'>{formatDay(expDate)}</Tag>
				}
			},
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			render: (action, record) => (
				<CustomButton
					onClick={() => {
						setValueForm({
							...valuesForm,
							_id: record._id,
							key: record.key,
						})

						setVisibleEditForm(true)
					}}
				>
					Edit
				</CustomButton>
			),
		},
	]

	const handleEdit = async () => {
		console.log({ _id, key })

		try {
			const res = await axios.put(
				`/softwaresub/update/${_id}`,
				{ key },
				{
					headers: {
						Authorization: localStorage.getItem('token'),
					},
				}
			)

			showSuccessMessage(res.data.message)
			setValueForm(init)
			setVisibleEditForm(false)
		} catch (error) {
			showErrorMessage(error.response.data.message)
		}
	}

	return (
		<>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4'>
				<div className='d-block mb-4 mb-md-0'>
					<h2 className='h4'>Software Subcription</h2>
				</div>
			</div>
			<Table
				columns={columns}
				dataSource={softwareSubs}
				rowKey={(record) => record._id}
				bordered={true}
				scroll={{ x: '100%' }}
			/>

			<Modal
				title='Edit Software Key'
				visible={visibleEditForm}
				onOk={handleEdit}
				onCancel={() => setVisibleEditForm(false)}
				okText='Change'
				cancelText='Cancel'
				afterClose={() => setValueForm(init)}
			>
				<Form>
					<Form.Item label='Key'>
						<Input
							name='key'
							value={valuesForm.key}
							onChange={(e) =>
								setValueForm({
									...valuesForm,
									key: e.target.value,
								})
							}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default SoftwareSub
