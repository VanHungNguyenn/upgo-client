import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const historyRecharge = createSlice({
	name: 'historyRecharge',
	initialState,
	reducers: {
		getHistoryRecharge: (state, action) => {
			return action.payload
		},
	},
})

export const { getHistoryRecharge } = historyRecharge.actions
export default historyRecharge.reducer
