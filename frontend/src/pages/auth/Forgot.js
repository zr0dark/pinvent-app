import React from 'react'
import styles from './auth.module.scss'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'

const Forgot = () => {
    return (
        <div className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <h1>Forgot Password?</h1>
                    <form>
                        <input
                            type='email'
                            placeholder='Email'
                            required
                            name='email'
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
