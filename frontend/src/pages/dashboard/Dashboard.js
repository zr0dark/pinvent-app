import React from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'

const Dashboard = () => {
    useRedirectLoggedOutUser('/login')
    return (
        <div>
            <h1>MaxOut Dashboard</h1>
        </div>
    )
}

export default Dashboard
