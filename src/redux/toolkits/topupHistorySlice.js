import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const topupHistorySlice = createSlice({
	name: 'topupHistory',
	initialState,
	reducers: {
		getTopupHistory: (state, action) => {
			return action.payload
		},
	},
})

export const { getTopupHistory } = topupHistorySlice.actions
export default topupHistorySlice.reducer
