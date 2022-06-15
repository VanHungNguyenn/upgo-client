import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Table, Tooltip, Modal, Form, Input, Select, Space } from 'antd'
import { showErrorMessage, showSuccessMessage } from '~/components/Notification'
import { currencyComma, subString } from '~/utils'
import { Button, Tag } from 'antd'
import Swal from 'sweetalert2'

const { Option } = Select

const init = {
	_id: '',
	name: '',
	email: '',
	password: '',
	role: null,
	action: null,
	valuesChange: null,
	note: '',
}

const ManageMember = () => {
	const [data, setData] = useState([])
	const [search, setSearch] = useState('')
	const [dataSource, setDataSource] = useState([])
	const [loading, setLoading] = useState(false)
	const [valuesForm, setValuesForm] = useState(init)
	const [visibleAddModal, setVisibleAddModal] = useState(false)
	const [visibleUpdateModal, setVisibleUpdateModal] = useState(false)
	const [visibleChangeBalanceModal, setVisibleChangeBalanceModal] =
		useState(false)

	const { _id, name, email, password, role, action, valuesChange, note } =
		valuesForm
	console.log({ _id, name, email, password, role, action, valuesChange })

	const fetchMembers = useCallback(async () => {
		try {
			setLoading(true)

			const res = await axios.get('/user/all', {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})

			setData(res.data.users)
			setDataSource(res.data.users)

			setLoading(false)
		} catch (error) {
			console.log(error.message)
		}
	}, [])

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
		}).then(async (result) => {
			if (result.value) {
				try {
					const res = await axios.delete(
						`/user/delete/${record._id}`,
						{
							headers: {
								Authorization: localStorage.getItem('token'),
							},
						}
					)

					showSuccessMessage(res.data.message)
					fetchMembers()
				} catch (error) {
					error.response.data.message &&
						showErrorMessage(error.response.data.message)
				}
			}
		})
	}

	const handleAddMember = async () => {
		try {
			const res = await axios.post(
				'/user/create',
				{
					name,
					email,
					password,
					role,
					note,
				},
				{
					headers: {
						Authorization: localStorage.getItem('token'),
					},
				}
			)

			showSuccessMessage(res.data.message)
			setVisibleAddModal(false)
			fetchMembers()
		} catch (error) {
			error.response.data.message &&
				showErrorMessage(error.response.data.message)
		}
	}

	const handleUpdateMember = async () => {
		try {
			const res = await axios.put(
				`/user/update/${_id}`,
				{
					email,
					password,
					role,
					note,
				},
				{
					headers: {
						Authorization: localStorage.getItem('token'),
					},
				}
			)

			showSuccessMessage(res.data.message)
			setVisibleUpdateModal(false)
			fetchMembers()
		} catch (error) {
			error.response.data.message &&
				showErrorMessage(error.response.data.message)
		}
	}

	const handleChangeInput = (e) => {
		const { name, value } = e.target
		setValuesForm({ ...valuesForm, [name]: value })
	}

	const handleChangeBalance = async () => {
		try {
			const res = await axios.put(
				`/user/change_balance/${_id}`,
				{
					valuesChange,
					action,
				},
				{
					headers: {
						Authorization: localStorage.getItem('token'),
					},
				}
			)

			showSuccessMessage(res.data.message)
			setVisibleChangeBalanceModal(false)
			fetchMembers()
		} catch (error) {
			error.response.data.message &&
				showErrorMessage(error.response.data.message)
		}
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
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Balance',
			dataIndex: 'balance',
			key: 'balance',
			render: (balance) => <span>{currencyComma(balance)}</span>,
		},
		{
			title: 'Total',
			dataIndex: 'totalDeposit',
			key: 'totalDeposit',
			render: (totalDeposit) => (
				<span>{currencyComma(totalDeposit)}</span>
			),
		},
		{
			title: 'Note',
			dataIndex: 'note',
			key: 'note',
			render: (note) => subString(note),
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
					<Space>
						{/* change balance button */}
						<Button
							type='primary'
							onClick={() => {
								setVisibleChangeBalanceModal(true)
								setValuesForm({
									...valuesForm,
									_id: record._id,
									name: record.name,
								})
							}}
						>
							<Tooltip title='Change balance'>
								{/* fontawesome */}
								<i className='fa fa-money-bill-wave'></i>
							</Tooltip>
						</Button>

						<Button
							type='primary'
							onClick={() => {
								setVisibleUpdateModal(true)
								setValuesForm({
									...valuesForm,
									_id: record._id,
									name: record.name,
									email: record.email,
									role: record.role,
									note: record.note,
								})
							}}
						>
							<Tooltip title='Update'>
								<i className='fas fa-edit'></i>
							</Tooltip>
						</Button>
						<Button
							type='danger'
							onClick={() => handleDelete(record)}
						>
							<Tooltip title='Delete'>
								<i className='fas fa-trash'></i>
							</Tooltip>
						</Button>
					</Space>
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
					<div
						to='/add-member'
						className='btn btn-sm btn-gray-800 d-inline-flex align-items-center'
						onClick={() => setVisibleAddModal(true)}
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
					</div>
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
				loading={loading}
			/>
			{/* Add Modal */}
			<Modal
				title='Add Member'
				visible={visibleAddModal}
				onCancel={() => {
					setVisibleAddModal(false)
					setValuesForm(init)
				}}
				onOk={handleAddMember}
				okText='Add'
				cancelText='Cancel'
				afterClose={() => {
					setValuesForm(init)
				}}
			>
				<Form layout='vertical'>
					<Form.Item label='Name'>
						<Input
							placeholder='Name'
							value={name}
							name='name'
							onChange={handleChangeInput}
						/>
					</Form.Item>
					<Form.Item label='Password'>
						<Input
							placeholder='Password'
							value={password}
							name='password'
							onChange={handleChangeInput}
							type='password'
						/>
					</Form.Item>
					<Form.Item label='Email'>
						<Input
							placeholder='Email'
							value={email}
							name='email'
							onChange={handleChangeInput}
						/>
					</Form.Item>
					<Form.Item label='Role'>
						<Select
							placeholder='Role'
							value={role}
							name='role'
							onChange={(value) => {
								setValuesForm({ ...valuesForm, role: value })
							}}
						>
							<Option value={0}>Admin</Option>
							<Option value={1}>Seller</Option>
							<Option value={2}>User</Option>
						</Select>
					</Form.Item>
					<Form.Item label='Note'>
						<Input
							placeholder='Note'
							value={note}
							name='note'
							onChange={handleChangeInput}
						/>
					</Form.Item>
				</Form>
			</Modal>
			{/* Update Modal */}
			<Modal
				title={`Update "${name}"`}
				visible={visibleUpdateModal}
				onCancel={() => {
					setVisibleUpdateModal(false)
					setValuesForm(init)
				}}
				onOk={handleUpdateMember}
				okText='Update'
				cancelText='Cancel'
				afterClose={() => {
					setValuesForm(init)
				}}
			>
				<Form layout='vertical'>
					<Form.Item label='Password'>
						<Input
							placeholder='Password'
							value={password}
							name='password'
							onChange={handleChangeInput}
							type='password'
						/>
					</Form.Item>
					<Form.Item label='Email'>
						<Input
							placeholder='Email'
							value={email}
							name='email'
							onChange={handleChangeInput}
						/>
					</Form.Item>
					<Form.Item label='Role'>
						<Select
							placeholder='Role'
							value={role}
							name='role'
							onChange={(value) => {
								setValuesForm({ ...valuesForm, role: value })
							}}
						>
							<Option value={0}>Admin</Option>
							<Option value={1}>Seller</Option>
							<Option value={2}>User</Option>
						</Select>
					</Form.Item>
					<Form.Item label='Note'>
						<Input
							placeholder='Note'
							value={note}
							name='note'
							onChange={handleChangeInput}
						/>
					</Form.Item>
				</Form>
			</Modal>

			{/* Change balance Modal */}
			<Modal
				title={`Change balance of "${name}"`}
				visible={visibleChangeBalanceModal}
				onCancel={() => setVisibleChangeBalanceModal(false)}
				onOk={handleChangeBalance}
				okText='Change'
				cancelText='Cancel'
				afterClose={() => setValuesForm(init)}
			>
				<Form layout='vertical'>
					<Form.Item label='Action'>
						<Select
							name='action'
							value={action}
							onChange={(value) => {
								setValuesForm({ ...valuesForm, action: value })
							}}
							placeholder='Select Action'
							style={{ width: '100%' }}
						>
							<Option value='add'>+</Option>
							<Option value='sub'>-</Option>
						</Select>
					</Form.Item>
					<Form.Item label='Value'>
						<Input
							name='valuesChange'
							value={valuesChange}
							onChange={handleChangeInput}
							placeholder='Values (number)'
							defaultValue={0}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default ManageMember
