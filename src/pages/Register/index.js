import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { showErrorMessage, showSuccessMessage } from '~/components/Notification'
import { useNavigate, Link } from 'react-router-dom'

const initialState = {
	username: '',
	password: '',
	confirmPassword: '',
	email: '',
}

const Register = () => {
	const [user, setUser] = useState(initialState)
	const navigate = useNavigate()
	const usernameRef = useRef()

	const { username, password, confirmPassword, email } = user

	const handleChangeInput = (e) => {
		const { name, value } = e.target
		setUser({ ...user, [name]: value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const res = await axios.post('/user/register', {
				name: username,
				password,
				confirmPassword,
				email,
			})

			showSuccessMessage(res.data.message)
			setUser(initialState)
			navigate('/login')
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
									<h1 className='mb-0 h3'>Create Account</h1>
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

									<div className='form-group mb-4'>
										<label htmlFor='confirmPassword'>
											Confirm Password
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
												placeholder='Confirm Password'
												className='form-control'
												id='confirmPassword'
												name='confirmPassword'
												value={confirmPassword}
												onChange={handleChangeInput}
												required
											/>
										</div>
									</div>

									<div className='form-group mb-4'>
										<label htmlFor='email'>Email</label>
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
													<path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z'></path>
													<path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z'></path>
												</svg>
											</span>
											<input
												type='email'
												className='form-control'
												placeholder='Email'
												id='email'
												name='email'
												value={email}
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
											Register
										</button>
									</div>

									<div className='d-flex justify-content-center align-items-center mt-4'>
										<span className='fw-normal'>
											Already have an account?{' '}
											<Link
												to='/login'
												className='fw-bold'
											>
												Login here
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

export default Register
