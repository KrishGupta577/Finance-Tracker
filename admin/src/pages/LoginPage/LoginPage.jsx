import React, { useContext, useState } from 'react';
import { LockOpen, Mail, ArrowRight } from 'lucide-react';
import './LoginPage.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {url,setToken,token} = useContext(StoreContext)

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const adminValidation = {
        email: {
            required: 'Email is required.'
        },
        password: {
            required: "Password is required.",
            minLength: {
                value: 8,
                message: "Password must be at least 8 characters."
            }
        }
    };

    const onSubmitHandle = async (data) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(url + "/api/admin/login", data);

            if (response.data.success) {
                setToken(response.data.token)
                toast.success(response.data.message)
                navigate('/admin/dashboard')
            } else {
                toast.error(response.data.message)
            }
        } catch (err) {
           console.log(err)
        } finally {
            setIsLoading(false);
        }
    };

    const handleError = (errors) => {
        console.log(errors)
    }

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

                    <form onSubmit={handleSubmit(onSubmitHandle,handleError)} className="login-form">
                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                       

                        <div className="input-wrapper">
                            <Mail className="input-icon" size={20} color='green' />
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="login-input"
                                {...register('email', adminValidation.email)}
                            />

                        </div>

                        <div className="input-wrapper">
                            <LockOpen className="input-icon" size={20} color='green' />
                            <input
                                type="password"
                                placeholder="Enter password"
                                className="login-input"
                                {...register('password', adminValidation.password)}
                            />

                        </div>

                        {errors.email && (
                            <p className="input-error">{errors.email.message}</p>
                        )}

                        {errors.password && (
                            <p className="input-error">{errors.password.message}</p>
                        )}

                        <div className="forgot-password">
                            <a href="#" className="forgot-link">Forgot Password?</a>
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                            disabled={isLoading}
                        >
                            {isLoading ?
                                <div className="loading-spinner" />
                                :
                                <span >Sign In  <ArrowRight className="button-icon" size={20} color='white' /></span>
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;