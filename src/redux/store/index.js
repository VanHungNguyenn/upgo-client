import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../toolkits/authSlice'

import keySlice from '../toolkits/keySlice'
import memberSlice from '../toolkits/memberSlice'

export const store = configureStore({
	reducer: {
		auth: authSlice,
		key: keySlice,
		member: memberSlice,
	},
})
