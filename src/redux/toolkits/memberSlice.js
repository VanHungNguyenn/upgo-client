import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const memberSlice = createSlice({
	name: 'member',
	initialState,
	reducers: {
		getMembers: (state, action) => {
			return action.payload
		},
	},
})

export const { getMembers } = memberSlice.actions
export default memberSlice.reducer
