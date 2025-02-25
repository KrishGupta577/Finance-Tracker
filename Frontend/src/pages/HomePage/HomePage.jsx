import React, { useState } from 'react'
import About from '../../components/BeforeLogin/About/About'
import Contact from '../../components/BeforeLogin/Contact/Contact'
import Features from '../../components/BeforeLogin/Features/Features'
import Hero from '../../components/BeforeLogin/Hero/Hero'
import Navbar from '../../components/BeforeLogin/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import AuthPage from '../../components/Authentication/AuthPage'


const HomePage = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    
      {showLogin ? <AuthPage setShowLogin={setShowLogin}  />: <></>} 
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