import { Modal, Input, Form } from 'antd'
import { useState, useCallback, useEffect } from 'react'
import { showSuccessMessage, showErrorMessage } from '~/utils/Notification'
import axios from 'axios'
import { avatar } from '~/constants/images'
import { currencyComma } from '~/utils'
import './Profile.css'

const init = {
	oldPassword: '',
	newPassword: '',
	confirmPassword: '',
}

const Profile = () => {
	const [visible, setVisible] = useState(false)
	const [user, setUser] = useState(init)
	const [data, setData] = useState({})

	const fetchUser = useCallback(async () => {
		try {
			const res = await axios.get('/user/profile', {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})

			setData(res.data.user)
		} catch (error) {
			console.error(error.message)
		}
	}, [])

	useEffect(() => {
		if (localStorage.getItem('token')) {
			fetchUser()
		}
	}, [fetchUser])

	const handleChangePassword = async () => {
		try {
			const res = await axios.put('/user/update_password', user, {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})

			showSuccessMessage(res.data.message)
			setVisible(false)
			setUser(init)
		} catch (error) {
			error.response.data.message &&
				showErrorMessage(error.response.data.message)
			setUser(init)
		}
	}

	return (
		<>
			<div className='custom__card'>
				<div className='custom__card-body profile'>
					<div className='profile__header'>
						<div className='profile__header-infor'>
							<div className='profile__header-infor-avatar'>
								<img src={avatar} alt='avatar' />
							</div>
							<div className='profile__header-infor-name-and-role'>
								<h3 className='profile__header-infor-name'>
									{data.name ? data.name : ''}
								</h3>
								<div className='profile__header-infor-role'>
									{data.role === 0
										? 'Admin'
										: data.role === 1
										? 'Seller'
										: 'User'}
								</div>
							</div>
						</div>
						<div className='profile__header-parameters'>
							<div className='profile__header-parameters-item'>
								<div className='profile__header-parameters-item-value'>
									{currencyComma(
										data.balance ? data.balance : 0
									)}
								</div>
								<div className='profile__header-parameters-item-name'>
									Balance
								</div>
							</div>
							<div className='profile__header-parameters-item'>
								<div className='profile__header-parameters-item-value'>
									{currencyComma(
										data.totalDeposit
											? data.totalDeposit
											: 0
									)}
								</div>
								<div className='profile__header-parameters-item-name'>
									Total Deposit
								</div>
							</div>
						</div>
					</div>
					<div className='profile__body'>
						{/* header and button */}
						<div className='profile__body-header'>
							<h2 className='profile__body-header-title'>
								Details
							</h2>
							<div className='profile__body-header-buttons'>
								<div className='btn-toolbar mb-2 mb-md-0'>
									<div
										className='btn btn-sm btn-gray-800 d-inline-flex align-items-center'
										onClick={() => {
											setVisible(true)
										}}
									>
										Change Password
									</div>
								</div>
							</div>
						</div>
						{/* body */}
						<div className='profile__body-body'>
							<div className='profile__body-body-item'>
								<div className='profile__body-body-item-name'>
									Password:
								</div>
								<div className='profile__body-body-item-value'>
									************
								</div>
							</div>
							<div className='profile__body-body-item'>
								<div className='profile__body-body-item-name'>
									Email:
								</div>
								<div className='profile__body-body-item-value'>
									{data.email ? data.email : ''}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Modal
				title='Change Password'
				visible={visible}
				onOk={handleChangePassword}
				onCancel={() => {
					setVisible(false)
					setUser(init)
				}}
				okText='Change'
				cancelText='Cancel'
			>
				<Form layout='vertical'>
					<Form.Item label='Old Password:'>
						<Input
							name='oldPassword'
							placeholder='Old Password'
							value={user.oldPassword}
							onChange={(e) =>
								setUser({
									...user,
									oldPassword: e.target.value,
								})
							}
						/>
					</Form.Item>
					<Form.Item label='New Password:'>
						<Input
							name='newPassword'
							placeholder='New Password'
							value={user.newPassword}
							onChange={(e) =>
								setUser({
									...user,
									newPassword: e.target.value,
								})
							}
						/>
					</Form.Item>
					<Form.Item label='Confirm Password:'>
						<Input
							name='confirmPassword'
							placeholder='Confirm Password'
							value={user.confirmPassword}
							onChange={(e) =>
								setUser({
									...user,
									confirmPassword: e.target.value,
								})
							}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default Profile
