import React, { useEffect } from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import ProductList from '../../components/product/productList/ProductList'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
import { getProducts } from '../../redux/features/product/productSlice'

const Dashboard = () => {
    useRedirectLoggedOutUser('/login')
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const { products, isLoading, isError, message } = useSelector(
        (state) => state.product
    )
    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getProducts())
        }
        if (isError) {
            console.log(message)
        }
    }, [isLoggedIn, isError, message, dispatch])
    return (
        <div>
            <h1>MaxOut Dashboard</h1>
            <ProductList products={products} isLoading={isLoading} />
        </div>
    )
}

export default Dashboard
