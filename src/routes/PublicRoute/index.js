import { Navigate, useLocation } from 'react-router-dom'

const PublicRoute = ({ children }) => {
	let location = useLocation()
	const isLogin = !!localStorage.getItem('token')

	if (isLogin) {
		return <Navigate to='/' state={location} replace />
	}

	return children
}

export default PublicRoute
