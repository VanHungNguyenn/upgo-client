import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMessage, showSuccessMessage } from '~/components/Notification'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import KeyForm from '~/components/KeyForm'

const initialState = {
	key: '',
	price: '',
	expired: '',
	note: '',
	forever: false,
}

const AddKey = () => {
	const [inforForm, setInforForm] = useState(initialState)
	const { key, price, expired, note, forever } = inforForm
	const { username } = useSelector((state) => state.auth)

	const navigate = useNavigate()

	const handleChangeInput = (e) => {
		const { name, value } = e.target
		setInforForm({ ...inforForm, [name]: value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const res = await axios.post(
				'/key/add',
				{
					key,
					price,
					expired,
					note,
					forever,
					seller: username,
				},
				{ headers: { Authorization: localStorage.getItem('token') } }
			)

			if (res.status === 200) {
				showSuccessMessage('Add key success')
				navigate('/keys')
			}
		} catch (error) {
			error.response.data.message &&
				showErrorMessage(error.response.data.message)
		}
	}

	return (
		<KeyForm
			serialkey={key}
			price={price}
			expired={expired}
			note={note}
			forever={forever}
			handleChangeInput={handleChangeInput}
			handleSubmit={handleSubmit}
		/>
	)
}

export default AddKey
