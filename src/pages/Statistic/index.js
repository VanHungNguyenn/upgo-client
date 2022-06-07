import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { currencyComma } from '~/utils'

const Statistic = () => {
	const [totalKey, setTotalKey] = useState(0)
	const [totalPrice, setTotalPrice] = useState(0)

	const fetchAllInfor = async () => {
		const res = await axios.get('/key/all', {
			headers: { Authorization: localStorage.getItem('token') },
		})

		const { totalKey, totalPrice } = res.data

		setTotalKey(totalKey)
		setTotalPrice(totalPrice)
	}

	useEffect(() => {
		fetchAllInfor()
	}, [])

	return (
		<>
			<div className='row'>
				<div className='col-12 col-sm-6 col-xl-6 mb-3'>
					<div className='card border-0 shadow'>
						<div className='card-body'>
							<div className='row d-block d-xl-flex align-items-center'>
								<div className='col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center'>
									<div className='icon-shape icon-shape-primary rounded me-4 me-sm-0'>
										<svg
											className='icon'
											fill='currentColor'
											viewBox='0 0 20 20'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z'></path>
										</svg>
									</div>
									<div className='d-sm-none'>
										<h2 className='h5'>Total Key</h2>
										<h3 className='fw-extrabold mb-1'>
											{totalKey}
										</h3>
									</div>
								</div>
								<div className='col-12 col-xl-7 px-xl-0'>
									<div className='d-none d-sm-block'>
										<h2 className='h6 text-gray-400 mb-0'>
											Total Key
										</h2>
										<h3 className='fw-extrabold mb-2'>
											{totalKey}
										</h3>
									</div>
									{/* <small className='d-flex align-items-center text-gray-500'>
										
										<svg
											className='icon icon-xxs text-gray-500 ms-2 me-1'
											fill='currentColor'
											viewBox='0 0 20 20'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												fillRule='evenodd'
												d='M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z'
												clipRule='evenodd'
											></path>
										</svg>
										USA
									</small> */}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='col-12 col-sm-6 col-xl-6 mb-3'>
					<div className='card border-0 shadow'>
						<div className='card-body'>
							<div className='row d-block d-xl-flex align-items-center'>
								<div className='col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center'>
									<div className='icon-shape icon-shape-secondary rounded me-4 me-sm-0'>
										<svg
											className='icon'
											fill='currentColor'
											viewBox='0 0 20 20'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												fillRule='evenodd'
												d='M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z'
												clipRule='evenodd'
											></path>
										</svg>
									</div>
									<div className='d-sm-none'>
										<h2 className='fw-extrabold h5'>
											Total Price
										</h2>
										<h3 className='mb-1'>
											{currencyComma(totalPrice)} VND
										</h3>
									</div>
								</div>
								<div className='col-12 col-xl-7 px-xl-0'>
									<div className='d-none d-sm-block'>
										<h2 className='h6 text-gray-400 mb-0'>
											Total Price
										</h2>
										<h3 className='fw-extrabold mb-2'>
											{currencyComma(totalPrice)} VND
										</h3>
									</div>
									{/* <small className='d-flex align-items-center text-gray-500'>
										Feb 1 - Apr 1,
										<svg
											className='icon icon-xxs text-gray-500 ms-2 me-1'
											fill='currentColor'
											viewBox='0 0 20 20'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												fillRule='evenodd'
												d='M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z'
												clipRule='evenodd'
											></path>
										</svg>
										GER
									</small> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Statistic
