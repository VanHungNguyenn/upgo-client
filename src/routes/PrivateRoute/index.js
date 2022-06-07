import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Page404 from '~/pages/Page404'

const PrivateRoute = ({ children, roles = ['user'] }) => {
	let location = useLocation()
	const isLogin = !!localStorage.getItem('token')
	let { role } = useSelector((state) => state.auth)

	role = role === 0 ? 'admin' : role === 1 ? 'seller' : 'user'

	const userHasRequiredRole = role && roles.includes(role)

	if (!isLogin) {
		return <Navigate to='/login' state={location} replace />
	}

	if (!userHasRequiredRole && isLogin) {
		return <Page404 />
	}

	return children
}

export default PrivateRoute
