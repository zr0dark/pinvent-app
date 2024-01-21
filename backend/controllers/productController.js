const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const { fileSizeFormatter } = require('../utils/fileUpload')
const cloudinary = require('cloudinary').v2

const createProduct = asyncHandler(async (req, res) => {
    const {
        location,
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
        description,
    } = req.body

    // Validation
    if (
        !location ||
        !name ||
        !vendor ||
        !category ||
        !bundleQuantity ||
        !maxOutQuantity ||
        !quantityInStock ||
        !quantityNeeded ||
        !cost ||
        !description
    ) {
        res.status(400)
        throw new Error('Please fill in all required fields. Thanks!')
    }

    // Manage image upload.
    let fileData = {}
    if (req.file) {
        // Save image file to Cloudinary
        let uploadedFile
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: 'inventory_app',
                resource_type: 'image',
            })
        } catch (error) {
            res.status(500)
            throw new Error('Image could not be uploaded.')
        }

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        }
    }

    // Create product
    const product = await Product.create({
        user: req.user.id,
        location,
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
        description,
        image: fileData,
    })

    res.status(201).json(product)
})

// Get all Products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().sort('-createdAt')
    res.status(200).json(products)
})

// Get a single product
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    // If product does not exist
    if (!product) {
        res.status(404)
        throw new Error('Product not found.')
    }
    // The below code might restrict which user can view which items and may need to be altered or removed.
    if (product.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    res.status(200).json(product)
})

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    // If product does not exist
    if (!product) {
        res.status(404)
        throw new Error('Product not found')
    }
    // Match product to its user - this may need to be deleted or altered if it prevents users from viewing products.
    if (product.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    await product.deleteOne()
    res.status(200).json({ message: 'Product deleted.' })
})

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
    const { name, category, quantity, price, description } = req.body
    const { id } = req.params

    const product = await Product.findById(id)

    // If product does not exist
    if (!product) {
        res.status(404)
        throw new Error('Product not found')
    }
    // Match product to its user - this may need to be deleted or altered if it prevents users from viewing products.
    if (product.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    // Handle Image upload
    let fileData = {}
    if (req.file) {
        // Save image to cloudinary
        let uploadedFile
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: 'Pinvent App',
                resource_type: 'image',
            })
        } catch (error) {
            res.status(500)
            throw new Error('Image could not be uploaded')
        }

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        }
    }

    // Update Product
    const updatedProduct = await Product.findByIdAndUpdate(
        { _id: id },
        {
            location,
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
            description,
            image:
                Object.keys(fileData).length === 0 ? product?.image : fileData,
        },
        {
            new: true,
            runValidators: true,
        }
    )

    res.status(200).json(updatedProduct)
})

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
}
