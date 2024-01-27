import React from 'react'
import styles from './auth.module.scss'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <h1>Login to MaxOut</h1>
                    <form>
                        <input
                            type='email'
                            placeholder='Email'
                            required
                            name='email'
                        />
                        <input
                            type='text'
                            placeholder='Password'
                            required
                            name='password'
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
