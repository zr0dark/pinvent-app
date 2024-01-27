import React, { useState } from 'react'

const Footer = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    return (
        <div className='--flex-center --py2'>
            <p>
                StarSouth Enterprises, LLC - All Rights Reserved. &copy;{' '}
                {currentYear}
            </p>
        </div>
    )
}

export default Footer
