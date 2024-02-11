import React, { useEffect } from 'react'
import './ProductDetails.scss'
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice'
import { getProduct } from '../../../redux/features/product/productSlice'
import Card from '../../card/Card'
import Loader from '../../loader/Loader'
import DOMPurify from 'dompurify'

const ProductDetails = () => {
    useRedirectLoggedOutUser('/login')
    const dispatch = useDispatch()
    const { id } = useParams()

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const { product, isLoading, isError, message } = useSelector(
        (state) => state.product
    )

    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getProduct(id))
        }

        if (isError) {
            console.log(message)
        }
    }, [isLoggedIn, isError, message, dispatch])

    return (
        <div className='product-detail'>
            <h2 className='--mt'>Product Details</h2>
            <Card cardClass='card'>
                {isLoading && <Loader />}
                {product && (
                    <div className='detail'>
                        <Card cardClass='group'>
                            {product?.image ? (
                                <img
                                    src={product.image.filePath}
                                    alt={product.image.fileName}
                                />
                            ) : (
                                <p>No image set for this product</p>
                            )}
                        </Card>

                        <h3>
                            <strong>Product Name:</strong> {product.name}
                        </h3>
                        <p>
                            <b>Location: </b> {product.productLocation}
                        </p>
                        <p>
                            <b>Vendor: </b> {product.vendor}
                        </p>
                        <p>
                            <b>Bunzl/Schwarz SKU: </b> {product.skuBunzl}
                        </p>
                        <p>
                            <b>Uline Model #: </b> {product.modelUline}
                        </p>
                        <p>
                            <b>Category: </b> {product.category}
                        </p>
                        <p>
                            <b>MaxOut Quantity: </b> {product.maxOutQuantity}
                        </p>
                        <p>
                            <b>Quantity in stock : </b>{' '}
                            {product.quantityInStock}
                        </p>
                        <hr />
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(product.description),
                            }}
                        ></div>
                        <hr />
                        <code className='--color-dark'>
                            Created on:{' '}
                            {product.createdAt.toLocaleString('en-US')}
                        </code>
                        <br />
                        <code className='--color-dark'>
                            Last Updated:{' '}
                            {product.updatedAt.toLocaleString('en-US')}
                        </code>
                    </div>
                )}
            </Card>
        </div>
    )
}

export default ProductDetails
