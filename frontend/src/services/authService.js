import axios from 'axios'
import { toast } from 'react-toastify'

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

// Register a new user

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/users/register`,
            userData,
            { withCredentials: true }
            // { withCredentials: false } // You changed from true to false because of cors error.
        )
        if (response.statusText === 'OK') {
            toast.success('User registered successfully.')
        }
        return response.data
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        toast.error(message)
    }
}

// Login a user

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/users/login`,
            userData
        )
        if (response.statusText === 'OK') {
            toast.success('Login successful.')
        }
        return response.data
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        toast.error(message)
    }
}

// Logout a user

export const logoutUser = async () => {
    try {
        await axios.get(`${BACKEND_URL}/api/users/logout`)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        toast.error(message)
    }
}

// Forgot password

export const forgotPassword = async (userData) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/users/forgotpassword`,
            userData
        )
        toast.success(response.data.message)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        toast.error(message)
    }
}

// Reset password
export const resetPassword = async (userData, resetToken) => {
    try {
        const response = await axios.put(
            `${BACKEND_URL}/api/users/resetpassword/${resetToken}`,
            userData
        )
        return response.data
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        toast.error(message)
    }
}

// Get login status
export const getLoginStatus = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`)
        return response.data
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        toast.error(message)
    }
}
