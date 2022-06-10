import React from 'react'

const MemberForm = ({
	name,
	email,
	password,
	note,
	role,
	handleChangeInput,
	handleSubmit,
	titleButton = 'Add Member',
	titleForm = 'Member information',
}) => {
	return (
		<>
			<div className='row'>
				<div className='col-12 col-xl-12'>
					<div className='card card-body border-0 shadow mb-4'>
						<h2 className='h5 mb-4'>{titleForm}</h2>
						<form>
							<div className='row'>
								<div className='col-md-6 mb-3'>
									<div>
										<label htmlFor='name'>Username</label>
										<input
											className='form-control'
											id='name'
											type='text'
											placeholder='Enter username...'
											name='name'
											value={name}
											onChange={handleChangeInput}
											required
										/>
									</div>
								</div>
								<div className='col-md-6 mb-3'>
									<div>
										<label htmlFor='email'>Email</label>
										<input
											className='form-control'
											id='email'
											type='email'
											placeholder='Enter email...'
											name='email'
											value={email}
											onChange={handleChangeInput}
											required
										/>
									</div>
								</div>
							</div>
							<div className='row align-items-center'>
								<div className='col-md-6 mb-3'>
									<div>
										<label htmlFor='password'>
											Password
										</label>
										<input
											className='form-control'
											id='password'
											type='password'
											placeholder='Enter password...'
											name='password'
											value={password}
											onChange={handleChangeInput}
											required
										/>
									</div>
								</div>
								<div className='col-md-6 mb-3'>
									<label htmlFor='type'>Account Type</label>
									<select
										className='form-select mb-0'
										id='type'
										aria-label='type select example'
										name='role'
										value={role}
										onChange={handleChangeInput}
									>
										<option value='2'>User</option>
										<option value='1'>Seller</option>
										<option value='0'>Admin</option>
									</select>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-12'>
									<div className='form-group'>
										<label htmlFor='note'>Note</label>
										<textarea
											className='form-control'
											id='note'
											rows='3'
											placeholder='Enter note...'
											name='note'
											defaultValue={note}
											onChange={handleChangeInput}
										></textarea>
									</div>
								</div>
							</div>
							<div className='mt-3'>
								<button
									className='btn btn-gray-800 mt-2 animate-up-2'
									type='submit'
									onClick={handleSubmit}
								>
									{titleButton}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default MemberForm
