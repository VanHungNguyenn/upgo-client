import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const historyMomoSlice = createSlice({
	name: 'historyMomo',
	initialState,
	reducers: {
		getAllHistoryMomo: (state, action) => {
			return action.payload
		},
	},
})

export const { getAllHistoryMomo } = historyMomoSlice.actions
export default historyMomoSlice.reducer
