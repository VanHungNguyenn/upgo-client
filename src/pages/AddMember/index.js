import React, { useState } from 'react'
import {
	showErrorMessage,
	showSuccessMessage,
} from '../../components/Notification'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import MemberForm from '../../components/MemberForm'

const initialState = {
	name: '',
	fullname: '',
	password: '',
	note: '',
	role: 1,
}

const AddMember = () => {
	const [inforForm, setInforForm] = useState(initialState)
	const { name, fullname, password, note, role } = inforForm

	const navigate = useNavigate()

	const handleChangeInput = (e) => {
		const { name, value } = e.target
		setInforForm({ ...inforForm, [name]: value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const res = await axios.post(
				'/user/create',
				{
					name,
					fullname,
					password,
					note,
					role,
				},
				{ headers: { Authorization: localStorage.getItem('token') } }
			)

			if (res.status === 200) {
				showSuccessMessage('Add member success')
				navigate('/list-members')
			}
		} catch (error) {
			error.response.data.message &&
				showErrorMessage(error.response.data.message)
		}
	}

	return (
		<MemberForm
			name={name}
			fullname={fullname}
			password={password}
			note={note}
			role={role}
			handleChangeInput={handleChangeInput}
			handleSubmit={handleSubmit}
		/>
	)
}

export default AddMember
