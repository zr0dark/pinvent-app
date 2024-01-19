const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

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
    })

    res.status(201).json(product)
})

module.exports = {
    createProduct,
}
