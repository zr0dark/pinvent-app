import React from 'react'
import styles from './auth.module.scss'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { registerUser, validateEmail } from '../../services/authService'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'

const initialState = {
    name: '',
    email: '',
    password: '',
    password2: '',
}

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setformData] = useState(initialState)
    const { name, email, password, password2 } = formData

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setformData({ ...formData, [name]: value })
    }

    const register = async (e) => {
        e.preventDefault()
        if (!name || !email || !password) {
            return toast.error(
                'All fields are required for the registration form.'
            )
        }
        if (password !== password2) {
            return toast.error('Passwords do not match.')
        }
        if (password.length < 8) {
            return toast.error(
                'Passwords must be at least 8 characters in length.'
            )
        }
        if (!validateEmail(email)) {
            return toast.error('Please enter a valid email address.')
        }

        const userData = {
            name,
            email,
            password,
        }
        setIsLoading(true)
        try {
            const data = await registerUser(userData)
            // console.log(data)
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
                    <h1>MaxOut Registration</h1>
                    <form onSubmit={register}>
                        <input
                            type='text'
                            placeholder='Name'
                            required
                            name='name'
                            value={name}
                            onChange={handleInputChange}
                        />
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
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            required
                            name='password2'
                            value={password2}
                            onChange={handleInputChange}
                        />
                        <button
                            type='submit'
                            className='--btn --btn-primary --btn-block'
                        >
                            Register
                        </button>
                    </form>
                    <Link to='/login'>Already have an account? Login</Link>

                    <span className={styles.register}>
                        <Link to='/'>Click to return to the Home Page.</Link>
                    </span>
                </div>
            </Card>
        </div>
    )
}

export default Register
