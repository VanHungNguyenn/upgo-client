import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const historyBankSlice = createSlice({
	name: 'historyBank',
	initialState,
	reducers: {
		getAllHistoryBank: (state, action) => {
			return action.payload
		},
	},
})

export const { getAllHistoryBank } = historyBankSlice.actions
export default historyBankSlice.reducer
