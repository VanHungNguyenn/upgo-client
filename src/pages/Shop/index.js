import React, { useState, useCallback, useEffect } from 'react'
import './Shop.css'
import { useDispatch } from 'react-redux'
import { getUser } from '~/redux/toolkits/authSlice'
import axios from 'axios'
import { currencyComma } from '~/utils'
import Swal from 'sweetalert2'
import { showSuccessMessage, showErrorMessage } from '~/utils/Notification'

const Shop = () => {
	const [softwares, setSoftwares] = useState([])
	const dispatch = useDispatch()

	const fetchSoftwareOffer = useCallback(async () => {
		try {
			const res = await axios.get('/softwareoffer/all', {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})

			setSoftwares(res.data.softwaresOfferWithNameProduct)
		} catch (error) {
			console.log(error)
		}
	}, [])

	const getInforUser = useCallback(async () => {
		try {
			const res = await axios.get('/user/profile', {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})

			dispatch(getUser(res.data.user))
		} catch (error) {
			console.log(error.message)
		}
	}, [dispatch])

	useEffect(() => {
		fetchSoftwareOffer()
	}, [fetchSoftwareOffer])

	const handleSubSoftware = async (software) => {
		const { type, title, value, price, softwareId } = software

		Swal.fire({
			// question for user
			title: `Are you sure purchase ${title}?`,
			text: `Please enter your key`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes',
			cancelButtonText: 'No, cancel!',
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off',
			},
			inputValidator: (value) => {
				return !value && 'You need to write something!'
			},
		}).then(async (result) => {
			if (result.value) {
				try {
					const res = await axios.post(
						`/softwaresub/buy/${softwareId}`,
						{
							type,
							title,
							value,
							price,
							key: result.value,
						},
						{
							headers: {
								Authorization: localStorage.getItem('token'),
							},
						}
					)

					showSuccessMessage(res.data.message)
					getInforUser()
				} catch (error) {
					error.response.data.message &&
						showErrorMessage(error.response.data.message)
				}
			}
		})
	}

	return (
		<>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4'>
				<div className='d-block mb-4 mb-md-0'>
					<h2 className='h4'>Shop</h2>
				</div>
			</div>
			<div className='custom__card'>
				<div className='custom__card-body'>
					<div className='shop'>
						<div className='shop__list'>
							{/* softwares */}
							{softwares.map((software, i) => (
								<div className='shop__list-item' key={i}>
									<div className='shop__list-item__image'>
										{/* random img */}
										<img src={software.imgUrl} alt='' />
									</div>
									<div className='shop__list-item__title'>
										{software.title}
									</div>
									<div className='shop__list-item__desc'>
										{software.note}
									</div>
									<div className='shop__list-item__price'>
										{currencyComma(software.price)}
									</div>
									<div className='shop__list-item__originalprice'>
										{software.originalPrice
											? currencyComma(
													software.originalPrice
											  )
											: ''}
									</div>
									<div className='btn-toolbar mb-2 mb-md-0 shop__list-item__button'>
										<div
											className='btn btn-sm btn-gray-800 d-inline-flex align-items-center'
											onClick={() =>
												handleSubSoftware(software)
											}
										>
											Buy Software
										</div>
									</div>
									{software.discountValue ? (
										<div className='shop__list-item__discount'>
											{software.discountValue}%
										</div>
									) : (
										''
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Shop
