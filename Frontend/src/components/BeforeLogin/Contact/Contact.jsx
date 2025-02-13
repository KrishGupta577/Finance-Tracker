import React from 'react'
import "./Contact.css"

const Contact = () => {
    return (
        <div className='contact' id='contact'>
            <div className='contact-left'>
                <h3>CONTACT US</h3>
                <h1>Let's Work Together</h1>
                <p className='contact-left-address'>500 Terry Francine St. San Francisco, CA 94158</p>
                <a href='mailto:financetracker555@gmail.com' className='contact-left-email'>financetracker555@gmail.com</a>
                <p className='contact-left-phone'>Tel: 123-456-7890</p>
                <div className='contact-left-icons'>
                    <a href=""><img src="/linkdin-icon.svg" alt="linkdin" /></a>
                    <a href=""><img src="/instagram-icon.svg" alt="instagram" /></a>
                    <a href=""><img src="/x-icon.svg" alt="X" /></a>
                </div>
            </div>
            <div className='contact-center'>
                <h3>Quick Links</h3>
                <div className='contact-center-links'>
                    <a href="">Terms & Conditions</a>
                    <a href="">Privacy Policy</a>
                </div>
            </div>
            <div className='contact-right'>
                <h3>Give Us a Feedback</h3>
                <div className='contact-right-feedback'>
                    <input className='contact-right-feedback-email' type="email" name="" id="" placeholder='Email'/>
                    <input className='contact-right-feedback-input' type="text" name="" id="" placeholder='Write a review'/>
                    <button type='submit'>SEND</button>
                </div>
            </div>
        </div>
    )
}

export default Contact