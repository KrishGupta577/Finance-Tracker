import React, { useContext, useEffect, useState } from 'react';
import {
    User,
    Mail,
    Phone,
    Coins,
    Calendar,
    Briefcase,
    IndianRupee
} from 'lucide-react';
import './ExpenseForm.css'
import { useForm } from "react-hook-form"
import { StoreContext } from '../../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ExpenseForm = () => {

    const { url, token, userInfo } = useContext(StoreContext)
    const { register, handleSubmit,reset, formState: { errors } } = useForm({
        defaultValues: {
            name: userInfo?.name || '',
        }
    })

    useEffect(() => {
        reset({
            name: userInfo?.name || '',
        });
    }, [userInfo, reset]);


    const navigate = useNavigate()
    const getFirstError = () => {
        if (errors) {
            const firstError = Object.keys(errors)[0];
            return errors[firstError]?.message;
        }
        return null;
    }

    const ErrorMessage = () => {
        const error = getFirstError();
        return error ? (
            <div className="expense-form-error-container">
                <p className="expense-form-error-message">{error}</p>
            </div>
        ) : null;
    };

    const formValidation = {
        name: {
            required: "Please enter your full name",
        },
        username: {
            required: "Please enter a username",
        },
        email: {},
        phone: {
            required: "Please enter your phone number",
            pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit phone number"
            }
        },
        monthlyIncome: {
            required: "Please enter your monthly income",
            min: {
                value: 0,
                message: "Monthly income cannot be negative"
            },
        },
        currency: {
            required: "Please select your currency"
        },
        dob: {
            required: "Please enter your date of birth",
            pattern: {
                value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/,
                message: "Please enter date in DD/MM/YYYY format"
            },
        },
        occupation: {
            required: "Please enter your occupation",
        }
    };

    const onHandleSUbmit = async (data) => {
        try {
            const response = await axios.post(url + "/api/user/getInfo", data, { headers: { token } })
            console.log(response)
            if (response.data.success) {
                navigate("/dashboard")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="expense-form">
                <div className="expense-form-wrapper">
                    <div className="expense-form-image">
                        <img
                            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80"
                            alt="Finance"
                            className="expense-form-illustration"
                        />
                        <div className="expense-form-overlay">
                            <div className="expense-form-overlay-heading">
                                <h2>Track Your Expenses</h2>
                                <p>Manage your financial journey with ease</p>
                            </div>
                        </div>
                    </div>
                    <div className="expense-form-content">
                        <div className="expense-form-content-heading">
                            <h2>User Information</h2>
                            <ErrorMessage />
                        </div>
                        <form onSubmit={handleSubmit(onHandleSUbmit)}>
                            <div className="expense-form-grid">
                                <div className="expense-form-input-group">
                                    <User color='green' />
                                    <input
                                        type="text"
                                        name="name" {...register("name", formValidation.name)}
                                        placeholder="Full Name"
                                        required
                                        className="expense-form-input-field"
                                    />
                                </div>
                                <div className="expense-form-input-group">
                                    <User color='green' className="expense-form-input-icon" />
                                    <input
                                        type="text"
                                        name="username" {...register("username", formValidation.username)}
                                        placeholder='Username'
                                        required
                                        className="expense-form-input-field"
                                    />
                                </div>
                                <div className="expense-form-input-group">
                                    <Mail color='green' />
                                    <input
                                        type="email"
                                        name="email" {...register("email", formValidation.email)}
                                        placeholder="Email"
                                        value={userInfo.email === undefined ? "" : userInfo.email}
                                        readOnly
                                        required
                                        className="expense-form-input-field expense-form-input-field-readonly"
                                    />
                                </div>
                                <div className="expense-form-input-group">
                                    <Phone color='green' />
                                    <input
                                        type="tel"
                                        name="phone" {...register("phone", formValidation.phone)}
                                        placeholder="Phone Number"
                                        required
                                        className="expense-form-input-field"
                                    />
                                </div>
                                <div className="expense-form-input-group">
                                    <IndianRupee color='green' />
                                    <input
                                        type="number"
                                        name="monthlyIncome" {...register("monthlyIncome", formValidation.monthlyIncome)}
                                        placeholder="Enter Your Monthly Income"
                                        required
                                        className="expense-form-input-field"
                                    />
                                </div>
                                <div className="expense-form-input-group">
                                    <Coins color='green' className="expense-form-input-icon" />
                                    <select
                                        name="currency" {...register("currency", formValidation.currency)}
                                        required
                                        className="expense-form-input-field"
                                    >
                                        <option value="">Select Currency</option>
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                        <option value="GBP">GBP (£)</option>
                                        <option value="INR">INR (₹)</option>
                                    </select>
                                </div>
                                <div className="expense-form-input-group">
                                    <Calendar color='green' className="expense-form-input-icon" />
                                    <input
                                        type="text"
                                        name="dob" {...register("dob", formValidation.DOB)}
                                        placeholder='Enter Your DOB'
                                        required
                                        className="expense-form-input-field"
                                    />
                                </div>
                                <div className="expense-form-input-group">
                                    <Briefcase color='green' className="expense-form-input-icon" />
                                    <input
                                        type="text"
                                        name="occupation" {...register("occupation", formValidation.occupation)}
                                        placeholder="Occupation"
                                        required
                                        className="expense-form-input-field"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="expense-form-submit-button">
                                Submit
                            </button>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default ExpenseForm