import { configureStore } from '@reduxjs/toolkit'

import authSlice from '~/redux/toolkits/authSlice'
import topupHistorySlice from '~/redux/toolkits/topupHistorySlice'
import historyTransactionSlice from '~/redux/toolkits/historyTransactionSlice'
import historyMomoSlice from '~/redux/toolkits/historyMomoSlice'
import historyBankSlice from '~/redux/toolkits/historyBankSlice'

export const store = configureStore({
	reducer: {
		auth: authSlice,
		topupHistory: topupHistorySlice,
		historyTransaction: historyTransactionSlice,
		historyMomo: historyMomoSlice,
		historyBank: historyBankSlice,
	},
})
