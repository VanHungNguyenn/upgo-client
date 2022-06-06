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
		getUser: (state, action) => {
			state.username = action.payload.user.name
			state.role = action.payload.user.role
			state.token = action.payload.token
			state.isLogged = true
		},
		logout: (state) => {
			state.isLogged = false
			state.username = ''
			state.role = null
			state.token = ''
		},
	},
})

export const { login, getUser, logout } = authSlice.actions
export default authSlice.reducer
