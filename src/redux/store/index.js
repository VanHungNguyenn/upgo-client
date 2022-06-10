import { configureStore } from '@reduxjs/toolkit'

import authSlice from '../toolkits/authSlice'
import keySlice from '../toolkits/keySlice'
import memberSlice from '../toolkits/memberSlice'
import historyRechargeSlice from '../toolkits/historyRechargeSlice'
import productSlice from '../toolkits/productSlice'
import softwareUserSlice from '../toolkits/softwareUserSlice'

export const store = configureStore({
	reducer: {
		auth: authSlice,
		key: keySlice,
		member: memberSlice,
		historyRecharge: historyRechargeSlice,
		products: productSlice,
		softwareUser: softwareUserSlice,
	},
})
