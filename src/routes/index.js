import Dashboard from '~/pages/Dashboard'
import Statistic from '~/pages/Statistic'
import ListKeys from '~/pages/ListKeys'
import ListMembers from '~/pages/ListMembers'
import AddKey from '~/pages/AddKey'
import AddMember from '~/pages/AddMember'

import Profile from '~/pages/Profile'
import Topup from '~/pages/Topup'
import Manage from '~/pages/Manage'
import History from '~/pages/History'
import Shop from '~/pages/Shop'
import Contact from '~/pages/Contact'

const privateRoutes = [
	{
		path: '/',
		main: <Dashboard />,
		roles: ['admin', 'user', 'seller'],
	},
	{
		path: '/profile',
		main: <Profile />,
		roles: ['admin', 'user', 'seller'],
	},
	{
		path: '/topup',
		main: <Topup />,
		roles: ['admin', 'user', 'seller'],
	},
	{
		path: '/manage',
		main: <Manage />,
		roles: ['admin', 'user', 'seller'],
	},
	{
		path: '/history',
		main: <History />,
		roles: ['admin', 'user', 'seller'],
	},
	{
		path: '/shop',
		main: <Shop />,
		roles: ['admin', 'user', 'seller'],
	},
	{
		path: '/contact',
		main: <Contact />,
		roles: ['admin', 'user', 'seller'],
	},
	{
		path: '/keys',
		main: <ListKeys />,
		roles: ['admin', 'seller'],
	},
	{
		path: '/add-key',
		main: <AddKey />,
		roles: ['admin', 'seller'],
	},
	{
		path: '/members',
		main: <ListMembers />,
		roles: ['admin'],
	},
	{
		path: '/add-member',
		main: <AddMember />,
		roles: ['admin'],
	},
	{
		path: '/statistic',
		main: <Statistic />,
		roles: ['admin'],
	},
]

export { privateRoutes }
