import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RequireAuth = ({ allowed }) => {
	// if role is not allowed, redirect to login page
	const { role } = useSelector((state) => state.auth)

	const location = useLocation()

	console.log({ role })

	return (
		<>
			{allowed?.includes(role) ? (
				<>
					<Outlet />
				</>
			) : (
				<Navigate
					to='/login'
					state={{
						from: location.pathname,
					}}
					replace
				/>
			)}
		</>
	)
}

export default RequireAuth
