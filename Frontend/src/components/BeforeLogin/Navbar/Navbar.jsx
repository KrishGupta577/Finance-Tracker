import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'

const Navbar = ({setShowLogin}) => {
    return (
        <>
            <nav className='navbar'>
                <div className='navbar-left'>   
                        <img src='/logo.png' alt="Logo" />
                </div>
                <div className="navbar-centre">
                    <span className='navbar-centre-platform'>
                        <a href="#about">About</a>
                    </span>
                    <span className='navbar-centre-features'>
                        <a href="#features" >Features</a>
                    </span>
                    <span className='navbar-centre-contact'>
                        <a href="#contact" >Contact</a>
                    </span>
                </div>
                <div className='navbar-right'>
                    <div onClick={() => setShowLogin(true)} className='navbar-right-getStarted'>Get Started</div>
                </div>
            </nav>
        </>
    )
}

export default Navbar