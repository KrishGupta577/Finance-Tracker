import React from 'react'
import "./Navbar.css"
import {useNavigate} from "react-router-dom"

const Navbar = () => {

    const navigate = useNavigate()

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-left'>   
                        <img onClick={() => navigate('/')} src='/logo.png' alt="Logo" />
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
                    <a className='navbar-right-getStarted' href='/LoginPage'>Get Started</a>
                </div>
            </nav>
        </>
    )
}

export default Navbar