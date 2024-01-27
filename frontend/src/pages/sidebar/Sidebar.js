import React, { Children } from 'react'
import './Sidebar.s/*css*'

const Sidebar = ({ children }) => {
    return (
        <div className='layout'>
            <div className='sidebar'>
                <h2>Sidebar</h2>
            </div>
            <main>{children}</main>
        </div>
    )
}

export default Sidebar
