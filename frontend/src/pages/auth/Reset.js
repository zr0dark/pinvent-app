import React from 'react'
import styles from './auth.module.scss'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'

const Reset = () => {
    return (
        <div className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <h1>Reset Password</h1>
                    <form>
                        <input
                            type='password'
                            placeholder='New Password'
                            required
                            name='password'
                        />
                        <input
                            type='password'
                            placeholder='Confirm New Password'
                            required
                            name='password'
                        />
                        <button
                            type='submit'
                            className='--btn --btn-primary --btn-block'
                        >
                            Reset Password
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

export default Reset
