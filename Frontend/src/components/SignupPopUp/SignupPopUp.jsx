import './SignupPopUp.css'
import { User, Lock, Mail } from 'lucide-react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axios from "axios"
import { StoreContext } from '../../context/StoreContext';
import { useContext, useState } from 'react';

const SignupPopUp = ({setCurrState}) => {

    const { url } = useContext(StoreContext)
    const [isLoading, setIsLoading] = useState(false);
    const signupForm = useForm();

    const signupValidation = {
        name: {
            required: 'Name is required',
        },
        email: {
            required: "Email is required",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address"
            }
        },
        password: {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password must have at least 8 characters"
            }
        },
        confirmPassword: {
            required: "Please confirm your password",
            validate: (val, formValues) => val === formValues.password || "Passwords don't match"
        },
        terms: {
            required: "You must accept the terms and conditions"
        }
    };

    const onHandleSignupSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(url + '/api/user/register', data)

            if (response.data.success) {
                setCurrState('login')
                toast.success("User Registed.Please login")
            }
            else {
                toast.error(response.data.message)
            }

            setTimeout(() => {
                setIsLoading(false)
                signupForm.reset()
            }, 1000);
        }
        catch (error) {
            console.log("Error occured: ", error);
        }
    };

    return (
        <>
            <div className="signup-form-section">
                <h2>Create Your Account</h2>
                <form onSubmit={signupForm.handleSubmit(onHandleSignupSubmit)}>

                    <div className="input-group">
                        <div className='input-group-title'>
                            <User size={20} color='green' />
                            <label htmlFor="name">Name</label>
                        </div>
                        <input
                            type="text"
                            id="name"
                            {...signupForm.register('name', signupValidation.name)}
                            placeholder="Enter your full name"
                        />
                        {signupForm.formState.errors.name && (
                            <p className="error-message">{signupForm.formState.errors.name.message}</p>
                        )}
                    </div>

                    <div className="input-group">
                        <div className='input-group-title'>
                            <Mail size={20} color='green' />
                            <label htmlFor="email">Email Address</label>
                        </div>
                        <input
                            type="email"
                            id="email"
                            {...signupForm.register('email', signupValidation.email)}
                            placeholder="Enter your email"
                        />
                        {signupForm.formState.errors.email && (
                            <p className="error-message">{signupForm.formState.errors.email.message}</p>
                        )}
                    </div>

                    <div className="input-group">
                        <div className='input-group-title'>
                            <Lock size={20} color='green' />
                            <label htmlFor="signup-password">Password</label>
                        </div>
                        <input
                            type="password"
                            id="signup-password"
                            {...signupForm.register('password', signupValidation.password)}
                            placeholder="Create a strong password"
                        />
                        {signupForm.formState.errors.password && (
                            <p className="error-message">{signupForm.formState.errors.password.message}</p>
                        )}
                    </div>

                    <div className="input-group">
                        <div className='input-group-title'>
                            <Lock size={20} color='green' />
                            <label htmlFor="confirm-password">Confirm Password</label>
                        </div>
                        <input
                            type="password"
                            id="confirm-password"
                            {...signupForm.register('confirmPassword', signupValidation.confirmPassword)}
                            placeholder="Confirm your password"
                        />
                        {signupForm.formState.errors.confirmPassword && (
                            <p className="error-message">{signupForm.formState.errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <div className="signup-popup-condition">
                        <input
                            type="checkbox" id='terms'
                            {...signupForm.register('terms', signupValidation.terms)}
                        />
                        <label htmlFor='terms'>By continuing, I agree to the terms of use & privacy policy.</label>
                        {signupForm.formState.errors.terms && (
                            <p className="error-message">{signupForm.formState.errors.terms.message}</p>
                        )}
                    </div>

                    <div className='btn-signup'>
                        <button type="submit" disabled={isLoading || signupForm.formState.isSubmitting}>
                            {isLoading ? (
                                <div className="loading-spinner">
                                    <>Please wait...</>
                                </div>
                            ) : (
                                <>Create Account</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <p className="login-link">
                Already have an account? <a onClick={() => setCurrState('login')}>Login</a>
            </p>
            <p className='login-partition'>----------------------- or -----------------------</p>
        </>

    )
}

export default SignupPopUp