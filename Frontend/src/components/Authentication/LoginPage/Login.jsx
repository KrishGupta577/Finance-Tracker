import React, { useState } from 'react';
import "./Login.css";
import "./Signup.css"
import { DollarSign, User, Lock, Shield, ChevronRight, Mail } from 'lucide-react';

const Login = ({ setShowLogin }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currState, setCurrState] = useState('login');

    return (
        <>
            {/* LOGIN PAGE */}
            {currState === 'login' ? (
                <div className="login">
                    <div className="form-section">
                        <p onClick={() => setShowLogin(false)} className='login-cancel'>X</p>
                        <div className='login-heading'>
                            <h1>Welcome to Finance Tracker</h1>
                            <p>Please log in to manage your finances</p>
                        </div>
                        <form>
                            <div className="input-group">
                                <div className='input-group-title'>
                                    <User size={20} color='green' />
                                    <label htmlFor="username">Username or Email</label>
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Enter your username or Email"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <div className='input-group-title'>
                                    <Lock size={20} color='green' />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <div className="forgot-password">
                                <a href="">Forgot password?</a>
                            </div>

                            <div className="btn-login">
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <div className="loading-spinner">
                                            <DollarSign size={24} />
                                        </div>
                                    ) : (
                                        <>Login to Dashboard</>
                                    )}
                                </button>
                            </div>
                        </form>

                        <p className="signup-link">
                            Don't have an account? <a onClick={() => setCurrState('signup')}>Sign Up</a>
                        </p>
                    </div>
                </div>
            ) : (

                // SIGNUP PAGE

                <div className="signup-page">
                    <div className="signup-container">
                        <p onClick={() => setShowLogin(false)} className='signup-cancel'>X</p>
                        <div className="signup-form-section">
                            <h2>Create Your Account</h2>
                            <form>
                                <div className="input-group">
                                    <div className='input-group-title'>
                                        <Mail size={20} color='green' />
                                        <label htmlFor="email">Email Address</label>
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <div className='input-group-title'>
                                        <Lock size={20} color='green' />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Create a strong password"
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <div className='input-group-title'>
                                        <Lock size={20} color='green' />
                                        <label htmlFor="confirm-password">Confirm Password</label>
                                    </div>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        required
                                    />
                                </div>

                                <div className="signup-popup-condition">
                                    <input type="checkbox" required name="" />
                                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                                </div>

                                <div className='btn-signup'>
                                    <button type="submit" disabled={isLoading}>
                                        {isLoading ? (
                                            <div className="loading-spinner">
                                                <Shield size={24} />
                                            </div>
                                        ) : (
                                            <>
                                                Create Account
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <p className="login-link">
                            Don't have an account? <a onClick={() => setCurrState('login')}>Login</a>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
