import React, { useState } from 'react'
import styles from './auth.module.scss'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
import { forgotPassword, validateEmail } from '../../services/authService'
import { toast } from 'react-toastify'

const Forgot = () => {
    const [email, setEmail] = useState('')
    const forgot = async (e) => {
        e.preventDefault()
        if (!email) {
            return toast.error('Please enter a valid email address.')
        }
        if (!validateEmail(email)) {
            return toast.error('Please enter a valid email address.')
        }

        const userData = {
            email,
        }

        await forgotPassword(userData)
        setEmail('')
    }
    return (
        <div className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <h1>Forgot Password?</h1>
                    <form onSubmit={forgot}>
                        <input
                            type='email'
                            placeholder='Email'
                            required
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            type='submit'
                            className='--btn --btn-primary --btn-block'
                        >
                            Send Reset Email
                        </button>
                    </form>
                    <Link to='/login'>Login</Link>
                    <span className={styles.register}>
                        <Link to='/'>Click to return to the Home Page.</Link>
                    </span>
                </div>
            </Card>
        </div>
    )
}

export default Forgot
