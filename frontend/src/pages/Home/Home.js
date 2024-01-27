import React from 'react'
import { MdShelves } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './Home.scss'
import heroImg from '../../assets/inv-img.png'

const Home = () => {
    return (
        <div className='home'>
            <nav className='container --flex-between'>
                <div className='logo'>
                    <MdShelves size={45} />
                </div>
                <ul className='home-links'>
                    <li>
                        <Link to='/register'>Register</Link>
                    </li>
                    <li>
                        <button className='--btn --btn-primary'>
                            <Link to='/login'>Login</Link>
                        </button>
                    </li>
                    <li>
                        <button className='--btn --btn-primary'>
                            <Link to='/dashboard'>Dashboard</Link>
                        </button>
                    </li>
                </ul>
            </nav>
            {/* HERO SECTION */}
            <section className='container hero'>
                <div className='hero-text'>
                    <h1>MaxOut</h1>
                    <h2>Inventory & Stock Management Solution</h2>
                    <p>
                        The inventory system to control and manage product
                        levels between our The UPS Store locations and our
                        warehouse.
                    </p>
                </div>
                <div className='hero-image'>
                    <img
                        src={heroImg}
                        alt='MaxOut Inventory & Stock Management Solution screenshot'
                    />
                </div>
            </section>
        </div>
    )
}

export default Home
