import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	username: '',
	token: '',
	isLogged: false,
	role: null, // 0: admin, 1: seller, 2: user
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLogged = true
			state.token = action.payload
		},
		getToken: (state, action) => {
			state.token = action.payload
			state.isLogged = true
		},
		getUser: (state, action) => {
			state.username = action.payload.name
			state.role = action.payload.role
		},
		logout: (state) => {
			state.isLogged = false
			state.username = ''
			state.role = null
			state.token = ''
		},
	},
})

export const { login, getUser, logout, getToken } = authSlice.actions
export default authSlice.reducer
