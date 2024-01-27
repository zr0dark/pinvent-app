import React from 'react'
import styles from './auth.module.scss'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <div className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <h1>MaxOut Registration</h1>
                    <form>
                        <input
                            type='text'
                            placeholder='Name'
                            required
                            name='name'
                        />
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
                        <input
                            type='text'
                            placeholder='Confirm Password'
                            required
                            name='password'
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
