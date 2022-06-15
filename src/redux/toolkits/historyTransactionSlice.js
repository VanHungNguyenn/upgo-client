import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const historyTransactionSlice = createSlice({
	name: 'historyTransaction',
	initialState,
	reducers: {
		getAllHistoryTransaction: (state, action) => {
			return action.payload
		},
	},
})

export const { getAllHistoryTransaction } = historyTransactionSlice.actions
export default historyTransactionSlice.reducer
