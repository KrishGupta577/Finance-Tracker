import React, { useState, useEffect } from 'react';
import { LockOpen, User, Mail, ArrowRight } from 'lucide-react';
import './LoginPage.css'

const LoginPage = () => {

    return (
        <div className="login-container">
            <div className='login-card'>
                <div className="login-content">
                    <div className="login-header">
                        <div className="login-icon">
                            <LockOpen size={48} strokeWidth={1.5} color='green' />
                        </div>

                        <h2 className="login-title">Welcome Admin</h2>

                        <p className="login-subtitle">Please enter your credentials</p>
                    </div>

                    <form className="login-form">

                        <div className="input-wrapper">
                            <Mail className="input-icon" size={20} color='green' />
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="login-input"
                                required
                            />
                        </div>

                        <div className="input-wrapper">
                            <LockOpen className="input-icon" size={20} color='green' />
                            <input
                                type="password"
                                placeholder="Enter password"
                                className="login-input"
                                required
                            />
                        </div>

                        <div className="forgot-password">
                            <a href="#" className="forgot-link">Forgot Password?</a>
                        </div>

                        <button type="submit" className="login-button">Sign In
                            <ArrowRight className="button-icon" size={20} color='white' />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;