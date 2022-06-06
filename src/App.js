import { useEffect, useCallback } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import { getUser } from '~/redux/toolkits/authSlice'
import { useDispatch } from 'react-redux'

import RequireAuth from '~/routes/RequireAuth' // 0: admin, 1: seller, 2: user
import DefaultLayout from '~/components/DefaultLayout'

import Login from '~/pages/Login'
import Register from '~/pages/Register'
import Dashboard from '~/pages/Dashboard'
// import ListKeys from '~/pages/ListKeys'
// import ListMembers from '~/pages/ListMembers'
// import AddKey from '~/pages/AddKey'
// import AddMember from '~/pages/AddMember'

import Page404 from '~/pages/Page404'

function App() {
	const dispatch = useDispatch()
	const isLogin = !!localStorage.getItem('token')

	const getInforUser = useCallback(async () => {
		try {
			const res = await axios.get('/user/profile', {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			})

			const token = localStorage.getItem('token')
			dispatch(getUser({ token, ...res.data }))
		} catch (error) {
			console.log(error.message)
		}
	}, [dispatch])

	useEffect(() => {
		if (isLogin) {
			getInforUser()
		}
	}, [isLogin, getInforUser])

	return (
		<div className='App'>
			<Routes>
				{/* public routes */}
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />

				{/* private routes */}
				<Route element={<RequireAuth allowed={[0, 1]} />}>
					<Route path='/' element={<DefaultLayout />}>
						<Route path='/' element={<Dashboard />} />
					</Route>
				</Route>

				{/* 404 */}
				<Route path='*' element={<Page404 />} />
			</Routes>
		</div>
	)
}

export default App
