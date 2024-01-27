import React from 'react'

const Header = () => {
    return (
        <div className='--pad header'>
            <div className='--flex-between'>
                <h1>
                    <span className='--fw-thin'>Welcome, </span>
                    <span className='--color-danger'>Jason</span>
                </h1>
                <button className='--btn --btn-danger'>Logout</button>
            </div>
        </div>
    )
}

export default Header
