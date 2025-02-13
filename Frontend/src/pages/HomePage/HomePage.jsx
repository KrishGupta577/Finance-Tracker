import React from 'react'
import About from '../../components/BeforeLogin/About/About'
import Contact from '../../components/BeforeLogin/Contact/Contact'
import Features from '../../components/BeforeLogin/Features/Features'
import Hero from '../../components/BeforeLogin/Hero/Hero'
import Navbar from '../../components/BeforeLogin/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Contact />
      <Footer />
    </>
  )
}

export default HomePage