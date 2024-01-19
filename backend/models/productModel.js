const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        location: {
            // Where is the product located? 4747, 5119, Warehouse?
            type: String,
            required: [false, 'Which location?'],
            trim: true,
        },
        name: {
            // Complete product name as listed on the vendor website to help with reordering.
            type: String,
            required: [true, 'Please add a product name.'],
            trim: true,
        },
        vendor: {
            // Either Bunzl/Schwarz or Uline
            type: String,
            required: [true, 'Please add a vendor name.'],
            trim: true,
        },
        skuBunzl: {
            // Bunzl or Schwarz uses SKU numbers to track their products.
            type: String,
            required: false,
            default: 'SKU Bunzl',
            trim: true,
        },
        modelUline: {
            // Uline uses model numbers to track their products.
            type: String,
            required: false,
            default: 'Model # Uline',
            trim: true,
        },
        category: {
            // The category of the item: box, roll of tape, bubblewrap, etc.
            type: String,
            required: [true, 'Please add a product category.'],
            trim: true,
        },
        maxOutQuantity: {
            // The quantity of items required to "Max Out" the storage area alotted for the product.
            type: String,
            required: false,
            trim: true,
        },
        bundleQuantity: {
            // The quantity of items in a bundle of say boxes or rolls of tape.
            type: String,
            required: false,
            trim: true,
        },
        quantityInStock: {
            // The current/last counted quantity in stock.
            type: String,
            required: false,
            trim: true,
        },
        quantityNeeded: {
            // How many items are needed to 'max out' the inventory.
            type: String,
            required: false,
            trim: true,
        },
        cost: {
            // Our cost for the item or bundle.
            type: String,
            required: [true, 'Please add our cost for the item or bundle.'],
            trim: true,
        },
        description: {
            // Provide a good quality description with measurements, etc.
            type: String,
            required: [true, 'Please add a product description.'],
            trim: true,
        },
        image: {
            type: Object,
            default: {},
        },
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product
