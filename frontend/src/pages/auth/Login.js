import React, { useState } from 'react'
import styles from './auth.module.scss'
import Card from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { loginUser, validateEmail } from '../../services/authService'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'

const initialState = {
    email: '',
    password: '',
}

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setformData] = useState(initialState)
    const { email, password } = formData

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setformData({ ...formData, [name]: value })
    }

    const login = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            return toast.error(
                'All fields are required for the registration form.'
            )
        }
        if (!validateEmail(email)) {
            return toast.error('Please enter a valid email address.')
        }

        const userData = {
            email,
            password,
        }
        setIsLoading(true)
        try {
            const data = await loginUser(userData)
            await dispatch(SET_LOGIN(true))
            await dispatch(SET_NAME(data.name))
            navigate('/dashboard')
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    return (
        <div className={`container ${styles.auth}`}>
            {isLoading && <Loader />}
            <Card>
                <div className={styles.form}>
                    <h1>Login to MaxOut</h1>
                    <form onSubmit={login}>
                        <input
                            type='email'
                            placeholder='Email'
                            required
                            name='email'
                            value={email}
                            onChange={handleInputChange}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            required
                            name='password'
                            value={password}
                            onChange={handleInputChange}
                        />
                        <button
                            type='submit'
                            className='--btn --btn-primary --btn-block'
                        >
                            Login
                        </button>
                    </form>
                    <Link to='/forgot'>Forgot Password</Link>
                    <span className={styles.register}>
                        <Link to='/register'>
                            Don't have an account? Register
                        </Link>
                    </span>
                    <span className={styles.register}>
                        <Link to='/'>Click to return to the Home Page.</Link>
                    </span>
                </div>
            </Card>
        </div>
    )
}

export default Login
