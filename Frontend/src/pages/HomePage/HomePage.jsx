import React, { useContext, useEffect, useState } from 'react'
import About from '../../components/BeforeLogin/About/About'
import Contact from '../../components/BeforeLogin/Contact/Contact'
import Features from '../../components/BeforeLogin/Features/Features'
import Hero from '../../components/BeforeLogin/Hero/Hero'
import Navbar from '../../components/BeforeLogin/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import AuthPage from '../../components/Authentication/AuthPage'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {

  const [showLogin, setShowLogin] = useState(false)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()


  useEffect(() => {
    if (token) {
      console.log("navigating.............")
      navigate('/dashboard')
    }
  }, [])

  return (
    <>

      {showLogin ? <AuthPage setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Hero setShowLogin={setShowLogin} />
        <About />
        <Features />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default HomePage