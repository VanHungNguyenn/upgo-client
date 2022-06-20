import React, { useCallback, useEffect, useState } from 'react'
import { Table, Button, Modal, Input, Space, Tag, Select, Tooltip } from 'antd'
import axios from 'axios'
import { showSuccessMessage, showErrorMessage } from '~/utils/Notification'
import { currencyComma, subString } from '~/utils'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const { Option } = Select

const init = {
	softwareId: null,
	title: '',
	price: null,
	originalPrice: null,
	discountValue: null,
	note: '',
	_id: null,
	value: null,
}

const ManageSoftwareOffer = () => {
	const [softwareOffers, setSoftwareOffers] = useState([])
	const [valuesForm, setValuesForm] = useState(init)
	const softwares = useSelector((state) => state.softwares)

	const {
		softwareId,
		title,
		price,
		originalPrice,
		discountValue,
		note,
		_id,
		value,
	} = valuesForm

	const [visibleAddModal, setVisibleAddModal] = useState(false)
	const [visibleEditModal, setVisibleEditModal] = useState(false)

	const fetchSoftwareOffers = useCallback(async () => {
		try {
			const res = await axios.get('/softwareoffer/all', {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})

			setSoftwareOffers(res.data.softwaresOfferWithNameProduct)
		} catch (error) {
			console.log(error.message)
		}
	}, [])

	useEffect(() => {
		fetchSoftwareOffers()
	}, [fetchSoftwareOffers])

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Software Name',
			dataIndex: 'nameProduct',
			key: 'nameProduct',
			sorter: (a, b) => a.nameProduct.localeCompare(b.nameProduct),
		},
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			render: (price) => {
				return currencyComma(price)
			},
		},
		{
			title: 'Value',
			dataIndex: 'value',
			key: 'value',
		},
		{
			title: 'Original Price',
			dataIndex: 'originalPrice',
			key: 'originalPrice',
			render: (originalPrice) => {
				return originalPrice ? (
					currencyComma(originalPrice)
				) : (
					<Tag color='red'>None</Tag>
				)
			},
		},
		{
			title: 'Discount',
			dataIndex: 'discountValue',
			key: 'discountValue',
			render: (discountValue) => {
				return discountValue ? (
					<Tag color='green'>{discountValue}%</Tag>
				) : (
					<Tag color='red'>None</Tag>
				)
			},
			sorter: (a, b) => a.discountValue - b.discountValue,
		},
		{
			title: 'Note',
			dataIndex: 'note',
			key: 'note',
			render: (note) => subString(note),
		},
		{
			title: 'Action',
			key: 'action',
			render: (action, record) => (
				<Space size='middle'>
					<Button
						type='primary'
						onClick={() => {
							setValuesForm({
								softwareId: record.softwareId,
								title: record.title,
								price: record.price,
								originalPrice: record.originalPrice,
								discountValue: record.discountValue,
								note: record.note,
								type: record.type,
								_id: record._id,
								value: record.value,
							})

							setVisibleEditModal(true)
						}}
					>
						<Tooltip title='Update'>
							<i className='fas fa-edit' />
						</Tooltip>
					</Button>
					<Button
						type='danger'
						onClick={() => {
							Swal.fire({
								title: 'Delete software offer?',
								text: "You won't be able to revert this!",
								icon: 'warning',
								showCancelButton: true,
								confirmButtonColor: '#d33',
								cancelButtonColor: '#3085d6',
								confirmButtonText: 'Yes, delete it!',
								cancelButtonText: 'No, cancel!',
							}).then(async (result) => {
								if (result.value) {
									try {
										const res = await axios.delete(
											`/softwareOffer/delete/${record._id}`,
											{
												headers: {
													Authorization:
														localStorage.getItem(
															'token'
														),
												},
											}
										)

										if (res.status === 200) {
											showSuccessMessage(res.data.message)
											fetchSoftwareOffers()
										}
									} catch (error) {
										error.response.data.message &&
											showErrorMessage(
												error.response.data.message
											)
									}
								}
							})
						}}
					>
						<Tooltip title='Delete'>
							<i className='fa fa-trash'></i>
						</Tooltip>
					</Button>
				</Space>
			),
		},
	]

	const handleChangeInput = (e) => {
		const { name, value } = e.target
		setValuesForm({ ...valuesForm, [name]: value })
	}

	const handleAdd = async () => {
		try {
			const res = await axios.post(
				'/softwareOffer/add',
				{
					softwareId,
					title,
					price,
					originalPrice,
					discountValue,
					note,
					value,
				},
				{
					headers: {
						Authorization: localStorage.getItem('token'),
					},
				}
			)

			showSuccessMessage(res.data.message)
			fetchSoftwareOffers()
			setVisibleAddModal(false)

			setValuesForm(init)
		} catch (error) {
			error.response.data.message
				? showErrorMessage(error.response.data.message)
				: showErrorMessage('Something went wrong')
		}
	}

	const handleEdit = async () => {
		try {
			const res = await axios.put(
				`/softwareOffer/update/${_id}`,
				{
					title: valuesForm.title,
					price: valuesForm.price,
					originalPrice: valuesForm.originalPrice,
					discountValue: valuesForm.discountValue,
					note: valuesForm.note,
					softwareId: valuesForm.softwareId,
					value: valuesForm.value,
				},
				{
					headers: {
						Authorization: localStorage.getItem('token'),
					},
				}
			)

			showSuccessMessage(res.data.message)
			setVisibleEditModal(false)
			fetchSoftwareOffers()

			setValuesForm(init)
		} catch (error) {
			error.response.data.message &&
				showErrorMessage(error.response.data.message)
		}
	}

	const data = softwareOffers.map((softwareOffer, index) => {
		return {
			id: index + 1,
			...softwareOffer,
		}
	})

	return (
		<>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4'>
				<div className='d-block mb-4 mb-md-0'>
					<h2 className='h4'>List Softwares Offer</h2>
				</div>
				<div className='btn-toolbar mb-2 mb-md-0'>
					<div
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
						Add Software Offer
					</div>
				</div>
			</div>

			<Table
				columns={columns}
				dataSource={data}
				rowKey='_id'
				bordered={true}
				scroll={{ x: '100%' }}
			/>

			{/* Add Software Offer */}
			<Modal
				title='Add Software Offer'
				visible={visibleAddModal}
				onOk={handleAdd}
				onCancel={() => setVisibleAddModal(false)}
				okText='Add'
				cancelText='Cancel'
				afterClose={() => setValuesForm(init)}
			>
				<Space
					direction='vertical'
					size='large'
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Select
						name='softwareId'
						onChange={(value) => {
							setValuesForm({
								...valuesForm,
								softwareId: value,
							})
						}}
						placeholder='Select Software'
						style={{ width: '100%' }}
						value={valuesForm.softwareId}
					>
						{softwares.map((software) => {
							return (
								<Option
									value={software.softwareId}
									key={software.softwareId}
								>
									{software.nameProduct}
								</Option>
							)
						})}
					</Select>
					<Input
						name='title'
						value={title}
						onChange={handleChangeInput}
						placeholder='Title'
					/>
					<Input
						name='price'
						value={price}
						onChange={handleChangeInput}
						placeholder='Price'
					/>
					<Input
						name='originalPrice'
						value={originalPrice}
						onChange={handleChangeInput}
						placeholder='Original Price (no required)'
					/>
					<Input
						name='value'
						value={value}
						onChange={handleChangeInput}
						placeholder='Value'
					/>
					<Input
						name='discountValue'
						value={discountValue}
						onChange={handleChangeInput}
						placeholder='Discount Value (no required)'
					/>
					<Input
						name='note'
						value={note}
						onChange={handleChangeInput}
						placeholder='Note (no required)'
					/>
				</Space>
			</Modal>

			{/* Edit Software Offer */}
			<Modal
				title='Edit Software Offer'
				visible={visibleEditModal}
				onOk={handleEdit}
				onCancel={() => setVisibleEditModal(false)}
				okText='Edit'
				cancelText='Cancel'
				afterClose={() => setValuesForm(init)}
			>
				<Space
					direction='vertical'
					size='large'
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Select
						name='softwareId'
						onChange={(value) => {
							setValuesForm({
								...valuesForm,
								softwareId: value,
							})
						}}
						placeholder='Select Software'
						style={{ width: '100%' }}
						value={valuesForm.softwareId}
					>
						{softwares.map((software) => {
							return (
								<Option
									value={software.softwareId}
									key={software.softwareId}
								>
									{software.nameProduct}
								</Option>
							)
						})}
					</Select>
					<Input
						name='title'
						value={title}
						onChange={handleChangeInput}
						placeholder='Title'
					/>
					<Input
						name='price'
						value={price}
						onChange={handleChangeInput}
						placeholder='Price'
					/>
					<Input
						name='originalPrice'
						value={originalPrice}
						onChange={handleChangeInput}
						placeholder='Original Price (no required)'
					/>
					<Input
						name='value'
						value={value}
						onChange={handleChangeInput}
						placeholder='Value'
					/>
					<Input
						name='discountValue'
						value={discountValue}
						onChange={handleChangeInput}
						placeholder='Discount Value (no required)'
					/>
					<Input
						name='note'
						value={note}
						onChange={handleChangeInput}
						placeholder='Note (no required)'
					/>
				</Space>
			</Modal>
		</>
	)
}

export default ManageSoftwareOffer
