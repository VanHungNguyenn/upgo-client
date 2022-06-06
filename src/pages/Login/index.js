import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { showErrorMessage, showSuccessMessage } from '~/components/Notification'
import { login } from '~/redux/toolkits/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

const initialState = {
	username: '',
	password: '',
}

const Login = () => {
	const [user, setUser] = useState(initialState)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const usernameRef = useRef()

	const { username, password } = user

	const handleChangeInput = (e) => {
		const { name, value } = e.target
		setUser({ ...user, [name]: value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const res = await axios.post('/user/login', {
				name: username,
				password: password,
			})

			showSuccessMessage(res.data.message)
			localStorage.setItem('token', res.data.token)

			dispatch(login(res.data.token))
			setUser(initialState)
			navigate('/')
		} catch (error) {
			error.response.data.message &&
				showErrorMessage(error.response.data.message)

			usernameRef.current.focus()
		}
	}

	useEffect(() => {
		usernameRef.current.focus()
	}, [])

	return (
		<main>
			<section className='vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center'>
				<div className='container'>
					<div className='row justify-content-center form-bg-image'>
						<div className='col-12 d-flex align-items-center justify-content-center'>
							<div className='bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500'>
								<div className='text-center text-md-center mb-4 mt-md-0 mt-4'>
									<h1 className='mb-0 h3'>
										Sign in to our platform
									</h1>
								</div>
								<form action='#' className='mt-4'>
									<div className='form-group mb-4'>
										<label htmlFor='username'>
											Username
										</label>
										<div className='input-group'>
											<span
												className='input-group-text'
												id='basic-addon1'
											>
												<svg
													className='icon icon-xs text-gray-600'
													fill='currentColor'
													viewBox='0 0 20 20'
													xmlns='http://www.w3.org/2000/svg'
												>
													<path
														fillRule='evenodd'
														d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
														clipRule='evenodd'
													></path>
												</svg>
											</span>
											<input
												type='text'
												className='form-control'
												placeholder='Username'
												id='username'
												name='username'
												value={username}
												onChange={handleChangeInput}
												ref={usernameRef}
												required
											/>
										</div>
									</div>

									<div className='form-group mb-4'>
										<label htmlFor='password'>
											Password
										</label>
										<div className='input-group'>
											<span
												className='input-group-text'
												id='basic-addon2'
											>
												<svg
													className='icon icon-xs text-gray-600'
													fill='currentColor'
													viewBox='0 0 20 20'
													xmlns='http://www.w3.org/2000/svg'
												>
													<path
														fillRule='evenodd'
														d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
														clipRule='evenodd'
													></path>
												</svg>
											</span>
											<input
												type='password'
												placeholder='Password'
												className='form-control'
												id='password'
												name='password'
												value={password}
												onChange={handleChangeInput}
												required
											/>
										</div>
									</div>

									<div className='d-grid pb-4'>
										<button
											type='submit'
											className='btn btn-gray-800'
											onClick={handleSubmit}
										>
											Sign In
										</button>
									</div>

									<div className='d-flex justify-content-center align-items-center mt-4'>
										<span className='fw-normal'>
											Not registered?{' '}
											<Link
												to='/register'
												className='fw-bold'
											>
												Create account
											</Link>
										</span>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Login
