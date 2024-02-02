import React, { useState } from 'react'
import { UseSelector, useDispatch, useSelector } from 'react-redux'
import ProductForm from '../../components/product/productForm/ProductForm'

import {
    createProduct,
    selectIsLoading,
} from '../../redux/features/product/productSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'

const initialState = {
    productLocation: '',
    name: '',
    vendor: '',
    skuBunzl: '',
    modelUline: '',
    category: '',
    bundleQuantity: '',
    maxOutQuantity: '',
    quantityInStock: '',
    quantityNeeded: '',
    cost: '',
    description: '',
}

const AddProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [product, setProduct] = useState(initialState)
    const [productImage, setProductImage] = useState('')
    const [imagePreview, setImagePreview] = useState(null)
    const [description, setDescription] = useState('')

    const isLoading = useSelector(selectIsLoading)

    const {
        productLocation,
        name,
        vendor,
        skuBunzl,
        modelUline,
        category,
        bundleQuantity,
        maxOutQuantity,
        quantityInStock,
        quantityNeeded,
        cost,
    } = product

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    const saveProduct = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('productLocation', productLocation)
        formData.append('name', name)
        formData.append('vendor', vendor)
        formData.append('skuBunzl', skuBunzl)
        formData.append('modelUline', modelUline)
        formData.append('category', category)
        formData.append('maxOutQuantity', maxOutQuantity)
        formData.append('bundleQuantity', bundleQuantity)
        formData.append('quantityInStock', quantityInStock)
        formData.append('quantityNeeded', quantityNeeded)
        formData.append('cost', cost)
        formData.append('description', description)
        formData.append('image', productImage)

        console.log(...formData)

        await dispatch(createProduct(formData))

        navigate('/dashboard')
    }

    return (
        <div>
            {isLoading && <Loader />}
            <h1 className='--mt'>Add New Product</h1>
            <ProductForm
                product={product}
                productImage={productImage}
                imagePreview={imagePreview}
                description={description}
                setDescription={setDescription}
                handleInputChange={handleInputChange}
                handleImageChange={handleImageChange}
                saveProduct={saveProduct}
            />
        </div>
    )
}

export default AddProduct
