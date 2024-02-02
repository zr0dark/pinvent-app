import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProducts: [],
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        FILTER_PRODUCTS(state, action) {},
    },
})

export const { FILTER_PRODUCTS } = filterSlice.actions

export const selectFilteredProucts = (state) => state.filteredProducts

export default filterSlice.reducer
