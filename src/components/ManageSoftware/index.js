import React, { useCallback, useEffect, useState } from 'react'
import { Table, Button, Modal, Input, Space, Tooltip } from 'antd'
import axios from 'axios'
import { showSuccessMessage, showErrorMessage } from '~/utils/Notification'
import { subString } from '~/utils'
import { useSelector, useDispatch } from 'react-redux'
import { getAllSoftwares } from '~/redux/toolkits/softwaresSlice'
const init = {
	nameProduct: '',
	softwareId: null,
	note: '',
	desc: '',
	imgUrl: '',
}

const ManageSoftware = () => {
	const softwares = useSelector((state) => state.softwares)
	const [valuesForm, setValuesForm] = useState(init)
	const [visibleAddModal, setVisibleAddModal] = useState(false)
	const [visibleEditModal, setVisibleEditModal] = useState(false)
	const dispatch = useDispatch()

	const fetchSoftwares = useCallback(async () => {
		try {
			const res = await axios.get('/software/all', {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})

			dispatch(getAllSoftwares(res.data.softwares))
		} catch (error) {
			console.log(error.message)
		}
	}, [dispatch])

	useEffect(() => {
		fetchSoftwares()
	}, [fetchSoftwares])

	const colums = [
		{
			title: 'ID',
			dataIndex: 'softwareId',
			key: 'softwareId',
		},
		{
			title: 'Software Name',
			dataIndex: 'nameProduct',
			key: 'nameProduct',
		},
		{
			title: 'Description',
			dataIndex: 'desc',
			key: 'desc',
			render: (desc) => subString(desc),
		},
		{
			title: 'Note',
			dataIndex: 'note',
			key: 'note',
		},
		{
			title: 'Image',
			dataIndex: 'imgUrl',
			key: 'imgUrl',
			render: (imgUrl) => (
				<img
					src={imgUrl ? imgUrl : 'https://via.placeholder.com/150'}
					alt='img'
					style={{
						width: '3rem',
						height: '3rem',
						objectFit: 'cover',
					}}
				/>
			),
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			render: (action, record) => {
				return (
					<Button
						type='primary'
						onClick={() => {
							setValuesForm({
								nameProduct: record.nameProduct,
								softwareId: record.softwareId,
								note: record.note,
								desc: record.desc,
								imgUrl: record.imgUrl,
							})

							setVisibleEditModal(true)
						}}
					>
						<Tooltip title='Update'>
							<i className='fas fa-edit' />
						</Tooltip>
					</Button>
				)
			},
		},
	]

	const handleEdit = async () => {
		try {
			const res = await axios.put(
				`/software/update/${valuesForm.softwareId}`,
				{
					nameProduct: valuesForm.nameProduct,
					note: valuesForm.note,
					desc: valuesForm.desc,
					imgUrl: valuesForm.imgUrl,
				},
				{
					headers: {
						Authorization: localStorage.getItem('token'),
					},
				}
			)

			showSuccessMessage(res.data.message)
			setVisibleEditModal(false)
			fetchSoftwares()

			setValuesForm(init)
		} catch (error) {
			error.response.data.message &&
				showErrorMessage(error.response.data.message)
		}
	}

	const handleAdd = async () => {
		try {
			const res = await axios.post(
				'/software/add',
				{
					nameProduct: valuesForm.nameProduct,
					softwareId: valuesForm.softwareId,
					note: valuesForm.note,
					desc: valuesForm.desc,
					imgUrl: valuesForm.imgUrl,
				},
				{
					headers: {
						Authorization: localStorage.getItem('token'),
					},
				}
			)

			showSuccessMessage(res.data.message)
			setVisibleAddModal(false)
			fetchSoftwares()

			setValuesForm(init)
		} catch (error) {
			error.response.data.message
				? showErrorMessage(error.response.data.message)
				: showErrorMessage('Something went wrong')
		}
	}

	const handleOpenAddModal = () => {
		setVisibleAddModal(true)
	}

	const softwareRender = softwares.map((item, index) => {
		return {
			...item,
			id: index + 1,
		}
	})

	return (
		<>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4'>
				<div className='d-block mb-4 mb-md-0'>
					<h2 className='h4'>List Softwares</h2>
				</div>
				<div className='btn-toolbar mb-2 mb-md-0'>
					<div
						className='btn btn-sm btn-gray-800 d-inline-flex align-items-center'
						onClick={handleOpenAddModal}
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
						Add Software
					</div>
				</div>
			</div>
			<Table
				columns={colums}
				dataSource={softwareRender}
				rowKey={(record) => record.id}
				bordered={true}
				scroll={{ x: '100%' }}
			/>

			{/* Add Modal */}
			<Modal
				title='Add Software'
				visible={visibleAddModal}
				onOk={handleAdd}
				onCancel={() => setVisibleAddModal(false)}
				okText='Add'
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
					<Input
						placeholder='SoftwareID'
						value={valuesForm.softwareId}
						onChange={(e) =>
							setValuesForm({
								...valuesForm,
								softwareId: e.target.value,
							})
						}
					/>
					<Input
						placeholder='Product Name'
						value={valuesForm.nameProduct}
						onChange={(e) =>
							setValuesForm({
								...valuesForm,
								nameProduct: e.target.value,
							})
						}
					/>
					<Input
						placeholder='Image Url'
						value={valuesForm.imgUrl}
						onChange={(e) =>
							setValuesForm({
								...valuesForm,
								imgUrl: e.target.value,
							})
						}
					/>
					<Input.TextArea
						placeholder='Description'
						value={valuesForm.desc}
						onChange={(e) =>
							setValuesForm({
								...valuesForm,
								desc: e.target.value,
							})
						}
					/>
					<Input.TextArea
						placeholder='Note'
						value={valuesForm.note}
						onChange={(e) =>
							setValuesForm({
								...valuesForm,
								note: e.target.value,
							})
						}
					/>
				</Space>
			</Modal>
			{/* Edit Modal */}
			<Modal
				title='Edit Software'
				visible={visibleEditModal}
				onOk={handleEdit}
				onCancel={() => setVisibleEditModal(false)}
				okText='Edit'
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
					<Input
						placeholder='SoftwareID'
						value={valuesForm.softwareId}
						onChange={(e) =>
							setValuesForm({
								...valuesForm,
								softwareId: e.target.value,
							})
						}
						disabled
					/>
					<Input
						placeholder='Product Name'
						value={valuesForm.nameProduct}
						onChange={(e) =>
							setValuesForm({
								...valuesForm,
								nameProduct: e.target.value,
							})
						}
					/>
					<Input
						placeholder='Image Url'
						value={valuesForm.imgUrl}
						onChange={(e) =>
							setValuesForm({
								...valuesForm,
								imgUrl: e.target.value,
							})
						}
					/>
					<Input.TextArea
						placeholder='Description'
						value={valuesForm.desc}
						onChange={(e) =>
							setValuesForm({
								...valuesForm,
								desc: e.target.value,
							})
						}
					/>
					<Input.TextArea
						placeholder='Note'
						value={valuesForm.note}
						onChange={(e) =>
							setValuesForm({
								...valuesForm,
								note: e.target.value,
							})
						}
					/>
				</Space>
			</Modal>
		</>
	)
}

export default ManageSoftware
