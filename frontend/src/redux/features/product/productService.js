import axios from 'axios'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const API_URL = `${BACKEND_URL}/api/products/`

// Create new product
const createProduct = async (formData) => {
    const response = await axios.post(API_URL, formData)
    return response.data
}

// Get all products
const getProducts = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

// Delete a product
const deleteProduct = async (id) => {
    const response = await axios.delete(API_URL + id)
    return response.data
}

const productService = {
    createProduct,
    getProducts,
    deleteProduct,
}

export default productService
