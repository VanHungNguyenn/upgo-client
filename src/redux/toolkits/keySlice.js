import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const keySlice = createSlice({
	name: 'key',
	initialState,
	reducers: {
		getKeys: (state, action) => {
			return action.payload
		},
	},
})

export const { getKeys } = keySlice.actions
export default keySlice.reducer
