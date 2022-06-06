import React from 'react'

const KeyForm = ({
	serialkey,
	price,
	expired,
	note,
	forever,
	handleChangeInput,
	handleSubmit,
	titleButton = 'Add Key',
	titleForm = 'Key information',
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
										<label htmlFor='key'>Key</label>
										<input
											className='form-control'
											id='key'
											type='text'
											placeholder='Enter serial key...'
											name='key'
											value={serialkey}
											onChange={handleChangeInput}
										/>
									</div>
								</div>
								<div className='col-md-6 mb-3'>
									<div>
										<label htmlFor='price'>Price</label>
										<input
											className='form-control'
											id='price'
											type='text'
											placeholder='Enter price...'
											name='price'
											value={price}
											onChange={handleChangeInput}
											required
										/>
									</div>
								</div>
							</div>
							<div className='row align-items-center'>
								<div className='col-md-6 mb-3'>
									<label htmlFor='expdate'>
										Expiration Date
									</label>
									<div className='input-group'>
										<span className='input-group-text'>
											<svg
												className='icon icon-xs'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													fillRule='evenodd'
													d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
													clipRule='evenodd'
												></path>
											</svg>
										</span>
										<input
											data-datepicker=''
											className='form-control'
											id='expdate'
											type='date'
											placeholder='dd/mm/yyyy'
											name='expired'
											value={expired}
											onChange={handleChangeInput}
											required
										/>
									</div>
								</div>
								<div className='col-md-6 mb-3'>
									<label htmlFor='forever'>Forever</label>
									<select
										className='form-select mb-0'
										id='forever'
										aria-label='forever select example'
										name='forever'
										value={forever}
										onChange={handleChangeInput}
									>
										<option value='true'>Yes</option>
										<option value='false'>No</option>
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
											value={note}
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

export default KeyForm
