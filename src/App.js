import { useEffect, useCallback } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import { getUser, getToken } from '~/redux/toolkits/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { privateRoutes } from '~/routes'

import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import DefaultLayout from '~/components/DefaultLayout'

import Login from '~/pages/Login'
import Register from '~/pages/Register'

import Page404 from '~/pages/Page404'

function App() {
	const dispatch = useDispatch()
	const isLogin = !!localStorage.getItem('token')
	const { isLogged, role } = useSelector((state) => state.auth)

	const getTokenUser = useCallback(() => {
		const token = localStorage.getItem('token')

		if (token) {
			dispatch(getToken(token))
		}
	}, [dispatch])

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
		if (isLogin) {
			getTokenUser()
		}
	}, [isLogin, getTokenUser])

	useEffect(() => {
		if (isLogged && !role) {
			getInforUser()
		}
	}, [isLogged, getInforUser, role])

	return (
		<div className='App'>
			<Routes>
				{/* private routes */}
				<Route path='/' element={<DefaultLayout />}>
					{privateRoutes.map((route, i) => (
						<Route
							key={i}
							path={route.path}
							element={
								<PrivateRoute
									roles={route.roles ? route.roles : []}
								>
									{route.main}
								</PrivateRoute>
							}
						/>
					))}
				</Route>

				{/* public routes */}
				<Route
					path='login'
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path='register'
					element={
						<PublicRoute>
							<Register />
						</PublicRoute>
					}
				/>

				{/* 404 */}
				<Route path='*' element={<Page404 />} />
			</Routes>
		</div>
	)
}

export default App
