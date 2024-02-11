import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'
import { toast } from 'react-toastify'

const initialState = {
    product: null,
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new product
export const createProduct = createAsyncThunk(
    'products/create',
    async (formData, thunkAPI) => {
        try {
            return await productService.createProduct(formData)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get all products
export const getProducts = createAsyncThunk(
    'products/getAll',
    async (_, thunkAPI) => {
        try {
            return await productService.getProducts()
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Delete a product
export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (id, thunkAPI) => {
        try {
            return await productService.deleteProduct(id)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get a product
export const getProduct = createAsyncThunk(
    'products/getProduct',
    async (id, thunkAPI) => {
        try {
            return await productService.getProduct(id)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Update a product
export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, formData }, thunkAPI) => {
        try {
            return await productService.updateProduct(id, formData)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        CALC_STORE_VALUE(state, action) {
            console.log('store value')
        },
    },
    extraReducers: (builder) => {
        builder

            // Create / add a new product
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                console.log(action.payload)
                state.products.push(action.payload)
                toast.success('Product added successfully.')
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.message = action.payload
                toast.error(action.payload)
            })

            // Get / view all products
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                console.log(action.payload)
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            })

            // Delete a product
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                toast.success('Product deleted successfully.')
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            })

            // Get / view a single product
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.product = action.payload
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            })

            // Update / edit product details
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                toast.success('Product updated successfully')
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            })
    },
})

export const selectIsLoading = (state) => state.product.isLoading
export const selectProduct = (state) => state.product.product

export default productSlice.reducer
