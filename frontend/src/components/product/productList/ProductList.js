import React, { useEffect, useState } from 'react'
import './productList.scss'
import Loader from '../../loader/Loader'
import { AiOutlineEye } from 'react-icons/ai'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Search from '../../search/Search'
import { useDispatch, useSelector } from 'react-redux'
import {
    FILTER_PRODUCTS,
    selectFilteredProucts,
} from '../../../redux/features/product/filterSlice'
import ReactPaginate from 'react-paginate'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import {
    deleteProduct,
    getProducts,
} from '../../../redux/features/product/productSlice'

const ProductList = ({ products, isLoading }) => {
    const [search, setSearch] = useState('')
    const filteredProducts = useSelector(selectFilteredProucts)
    const dispatch = useDispatch()
    const shortenText = (text, n) => {
        if (text.length > n) {
            const shortenedText = text.substring(0, n).concat('...')
            return shortenedText
        }
        return text
    }

    const delProduct = async (id) => {
        await dispatch(deleteProduct(id))
        await dispatch(getProducts(id))
    }

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Delete Product?',
            message: 'Are you sure you want to delete this product?',
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => delProduct(id),
                },
                {
                    label: 'Cancel',
                    // onClick: () => alert('Click No')
                },
            ],
        })
    }

    // Begin pagination

    const [currentItems, setCurrentItems] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)
    const itemsPerPage = 10

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage

        setCurrentItems(filteredProducts.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(filteredProducts.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, filteredProducts])

    const handlePageClick = (event) => {
        const newOffset =
            (event.selected * itemsPerPage) % filteredProducts.length
        setItemOffset(newOffset)
    }

    // End pagination

    useEffect(() => {
        dispatch(FILTER_PRODUCTS({ products, search }))
    }, [products, search, dispatch])

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
                                {currentItems.map((product, index) => {
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
                                                    <FaTrashAlt
                                                        size={15}
                                                        onClick={() =>
                                                            confirmDelete(_id)
                                                        }
                                                    />
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
                <ReactPaginate
                    breakLabel='...'
                    nextLabel='Next'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={10}
                    pageCount={pageCount}
                    previousLabel='Prev'
                    renderOnZeroPageCount={null}
                    containerClassName='pagination'
                    pageLinkClassName='page-num'
                    previousLinkClassName='page-num'
                    nextLinkClassName='page-num'
                    activeLinkClassName='activePage'
                />
            </div>
        </div>
    )
}

export default ProductList
