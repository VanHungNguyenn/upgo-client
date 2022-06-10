import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		getProducts: (state, action) => {
			return action.payload
		},
	},
})

export const { getProducts } = productSlice.actions
export default productSlice.reducer
