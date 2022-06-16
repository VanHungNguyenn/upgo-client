import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const softwaresSlice = createSlice({
	name: 'softwares',
	initialState,
	reducers: {
		addSoftwares: (state, action) => {
			state.push(action.payload)
		},

		getAllSoftwares: (state, action) => {
			return action.payload
		},
	},
})

export const { addSoftwares, getAllSoftwares } = softwaresSlice.actions
export default softwaresSlice.reducer
