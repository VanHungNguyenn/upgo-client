import Dashboard from '~/pages/Dashboard'
import Statistic from '~/pages/Statistic'
import ManageSoftware from '~/pages/ManageSoftware'
import TopupHistory from '~/pages/TopupHistory'
import SoftwareSubcription from '~/pages/SoftwareSubcription'
import ManageTopup from '~/pages/ManageTopup'

import Profile from '~/pages/Profile'
import Topup from '~/pages/Topup'
import Shop from '~/pages/Shop'
import Contact from '~/pages/Contact'
import ManageMember from '~/pages/ManageMember'

const privateRoutes = [
	{
		path: '/',
		main: <Dashboard />,
		roles: ['admin', 'user', 'seller'],
	},
	{
		path: '/shop',
		main: <Shop />,
		roles: ['admin', 'user', 'seller'],
	},

	{
		path: '/topup',
		main: <Topup />,
		roles: ['admin', 'user', 'seller'],
	},
	{
		path: '/topup-history',
		main: <TopupHistory />,
		roles: ['admin', 'user', 'seller'],
	},
	{
		path: '/software-subcription',
		main: <SoftwareSubcription />,
		roles: ['admin', 'user', 'seller'],
	},
	{
		path: '/profile',
		main: <Profile />,
		roles: ['admin', 'user', 'seller'],
	},
	{
		path: '/contact',
		main: <Contact />,
		roles: ['admin', 'user', 'seller'],
	},
	{
		path: '/softwares',
		main: <ManageSoftware />,
		roles: ['admin', 'seller'],
	},
	{
		path: '/members',
		main: <ManageMember />,
		roles: ['admin'],
	},
	{
		path: '/manage-topup',
		main: <ManageTopup />,
		roles: ['admin'],
	},
	{
		path: '/statistic',
		main: <Statistic />,
		roles: ['admin'],
	},
]

export { privateRoutes }
