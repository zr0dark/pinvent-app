import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProducts: [],
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        FILTER_PRODUCTS(state, action) {
            const { products, search } = action.payload
            const tempProducts = products.filter(
                (product) =>
                    product.name.toLowerCase().includes(search.toLowerCase()) ||
                    product.category
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    product.vendor
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    product.productLocation
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    product.skuBunzl
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    product.modelUline
                        .toLowerCase()
                        .includes(search.toLowerCase())
            )

            state.filteredProducts = tempProducts
        },
    },
})

export const { FILTER_PRODUCTS } = filterSlice.actions

export const selectFilteredProucts = (state) => state.filter.filteredProducts

export default filterSlice.reducer
