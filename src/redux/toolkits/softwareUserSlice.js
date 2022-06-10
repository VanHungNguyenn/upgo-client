import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const softwareUser = createSlice({
	name: 'softwareUser',
	initialState,
	reducers: {
		getSoftwareUser: (state, action) => {
			return action.payload
		},
	},
})

export const { getSoftwareUser } = softwareUser.actions
export default softwareUser.reducer
