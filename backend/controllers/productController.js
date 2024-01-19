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

module.exports = {
    createProduct,
}
