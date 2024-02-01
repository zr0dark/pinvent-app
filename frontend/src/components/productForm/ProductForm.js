import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Card from '../card/Card'

import './ProductForm.scss'

const ProductForm = ({
    product,
    productImage,
    imagePreview,
    description,
    setDescription,
    handleInputChange,
    handleImageChange,
    saveProduct,
}) => {
    return (
        <div className='add-product'>
            <Card cardClass={'card'}>
                <form onSubmit={saveProduct}>
                    <Card cardClass={'group'}>
                        <label>Product Image</label>
                        <p className='smallText'>
                            <em>Supported Formats: jpg, jpeg, png</em>
                        </p>
                        <input
                            type='file'
                            name='image'
                            onChange={(e) => handleImageChange(e)}
                        />

                        {imagePreview != null ? (
                            <div className='image-preview'>
                                <img src={imagePreview} alt='product' />
                            </div>
                        ) : (
                            <p>No image set for this poduct.</p>
                        )}
                    </Card>
                    <label>Product Location:</label>
                    <p className='smallText'>
                        <em>Locations: 4747, 5119, Warehouse</em>
                    </p>
                    <input
                        type='text'
                        placeholder='Enter one: 4747, 5119 or Warehouse'
                        name='productLocation'
                        value={product?.productLocation}
                        onChange={handleInputChange}
                    />

                    <label>Product Name:</label>
                    <input
                        type='text'
                        placeholder='Product Name'
                        name='name'
                        value={product?.name}
                        onChange={handleInputChange}
                    />

                    <label>Product Vendor:</label>
                    <input
                        type='text'
                        placeholder='Product Vendor: Bunzl/Schwarz, Uline, etc.'
                        name='vendor'
                        value={product?.vendor}
                        onChange={handleInputChange}
                    />

                    <label>Bunzl/Schwarz SKU:</label>
                    <input
                        type='text'
                        placeholder='Bunzl/Schwarz SKU'
                        name='skuBunzl'
                        value={product?.skuBunzl}
                        onChange={handleInputChange}
                    />

                    <label>Uline Model Number:</label>
                    <input
                        type='text'
                        placeholder='Uline Model Number'
                        name='modelUline'
                        value={product?.modelUline}
                        onChange={handleInputChange}
                    />

                    <label>Product Category:</label>
                    <input
                        type='text'
                        placeholder='Product Category'
                        name='category'
                        value={product?.category}
                        onChange={handleInputChange}
                    />

                    {/* <label>Product Category:</label>
                    <select id='category' name='category'>
                        <option value='product?.bagsAmazonSmall'>
                            Bags, Amazon, Small
                        </option>
                        <option value='product?.bagsAmazonMedium'>
                            Bags, Amazon, Medium
                        </option>
                        <option value='product?.box'>Box, Cardboard</option>
                        <option value='product?.bubbleWrapRollLarge'>
                            Bubble Wrap, Roll, Large Bubble
                        </option>
                        <option value='product?.bubbleWrapRollSmall'>
                            Bubble Wrap, Roll, Small Bubble
                        </option>
                        <option value='product?.bubbleMailerSmall'>
                            Bubble Mailers, Small
                        </option>
                        <option value='product?.bubbleMailerMedium'>
                            Bubble Mailers, Medium
                        </option>
                        <option value='product?.bubbleMailerLarge'>
                            Bubble Mailers, Large
                        </option>
                        <option value='product?.cardboardSheets'>
                            Cardboard Sheets
                        </option>
                        <option value='product?.coolerSmall'>
                            Cooler, Small
                        </option>
                        <option value='product?.coolerLarge'>
                            Cooler, Large
                        </option>
                        <option value='product?.foamPlank'>Foam Plank</option>
                        <option value='product?.gelPack'>Gel Pack</option>
                        <option value='product?.glassMask'>Glass Mask</option>
                        <option value='product?.looseFill'>
                            Loose Fill, Peanuts
                        </option>

                        <option value='product?.miniPakrDoubleCushion'>
                            Mini Pakr Double Cushion
                        </option>
                        <option value='product?.miniPakrSmallQuilt'>
                            Mini Pakr Small Quilt
                        </option>
                        <option value='product?.miniPakrMediumQuilt'>
                            Mini Pakr Medium Quilt
                        </option>
                        <option value='product?.miniPakrLargeQuilt'>
                            Mini Pakr Large Quilt
                        </option>
                        <option value='product?.miniPakrSuperTubes'>
                            Mini Pakr Super Tube
                        </option>

                        <option value='product?.caseOfTape'>
                            Tape, Case, 48 Rolls
                        </option>
                        <option value='product?.tyvekMailerSmall'>
                            Tyvek Mailers, Small
                        </option>
                        <option value='product?.tyvekMailerMedium'>
                            Tyvek Mailers, Medium
                        </option>
                        <option value='product?.tyvekMailerLarge'>
                            Tyvek Mailers, Large
                        </option>
                        <option value='product?.waxPaper'>
                            Wax Paper Roll
                        </option>
                    </select> */}

                    <label>Bundle Quantity:</label>
                    <input
                        type='text'
                        placeholder='How many items per bundle?'
                        name='bundleQuantity'
                        value={product?.bundleQuantity}
                        onChange={handleInputChange}
                    />

                    <label>MaxOut Quantity:</label>
                    <input
                        type='text'
                        placeholder='MaxOut Quantity - How many to "max out" the space allowed?'
                        name='maxOutQuantity'
                        value={product?.maxOutQuantity}
                        onChange={handleInputChange}
                    />
                    <label>Quantity in Stock:</label>
                    <input
                        type='text'
                        placeholder='Quantity Currently in Stock'
                        name='quantityInStock'
                        value={product?.quantityInStock}
                        onChange={handleInputChange}
                    />
                    <label>Product Cost:</label>
                    <input
                        type='text'
                        placeholder='What is our cost for the product?'
                        name='cost'
                        value={product?.cost}
                        onChange={handleInputChange}
                    />
                    <label>Product Description:</label>
                    <ReactQuill
                        theme='snow'
                        value={description}
                        onChange={setDescription}
                        modules={ProductForm.modules}
                        formats={ProductForm.formats}
                    />

                    <div className='--my'>
                        <button type='submit' className='--btn --btn-primary'>
                            Save Product
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

ProductForm.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['clean'],
    ],
}
ProductForm.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'color',
    'background',
    'list',
    'bullet',
    'indent',
    'link',
    'video',
    'image',
    'code-block',
    'align',
]

export default ProductForm
