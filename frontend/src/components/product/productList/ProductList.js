import React, { useState } from 'react'
import './productList.scss'
import Loader from '../../loader/Loader'
import { AiOutlineEye } from 'react-icons/ai'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Search from '../../search/Search'

const ProductList = ({ products, isLoading }) => {
    const [search, setSearch] = useState('')
    const shortenText = (text, n) => {
        if (text.length > n) {
            const shortenedText = text.substring(0, n).concat('...')
            return shortenedText
        }
        return text
    }
    return (
        <div className='product-list'>
            <hr />
            <div className='table'>
                <div className='--flex-between --flex-dir-column'>
                    <span>
                        <h2>Inventory Items</h2>
                    </span>
                    <span>
                        <Search
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </span>
                </div>
                {isLoading && <Loader />}

                <div className='table'>
                    {!isLoading && products.length === 0 ? (
                        <p>No Prodcuts Found - Please Add Products</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Location</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Vendor</th>
                                    <th>Schwarz SKU</th>
                                    <th>Uline Model #</th>
                                    <th>MaxOut Qty</th>
                                    <th>Qty in Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => {
                                    const {
                                        _id,
                                        productLocation,
                                        name,
                                        category,
                                        vendor,
                                        skuBunzl,
                                        modelUline,
                                        maxOutQuantity,
                                        quantityInStock,
                                    } = product
                                    return (
                                        <tr key={_id}>
                                            <td>{index + 1}</td>
                                            <td>{productLocation}</td>
                                            <td>{shortenText(name, 16)}</td>
                                            <td>{category}</td>
                                            <td>{vendor}</td>
                                            <td>{skuBunzl}</td>
                                            <td>{modelUline}</td>
                                            <td>{maxOutQuantity}</td>
                                            <td>{quantityInStock}</td>
                                            <td className='icons'>
                                                <span>
                                                    <AiOutlineEye size={20} />
                                                </span>
                                                <span>
                                                    <FaEdit size={18} />
                                                </span>
                                                <span>
                                                    <FaTrashAlt size={15} />
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductList
