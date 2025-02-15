import { useContext, useState } from 'react';
import "./Login.css";
import "./Signup.css"
import { User, Lock, Mail } from 'lucide-react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
// import StoreContext from "../../../context/StoreContext"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Login = ({ setShowLogin }) => {

    // const { url } = useContext(StoreContext)
    const [isLoading, setIsLoading] = useState(false);
    const [currState, setCurrState] = useState('login');
    const [token, setToken] = useState()
    const navigate = useNavigate()

    // Separate form handlers for login and signup
    const loginForm = useForm();
    const signupForm = useForm();

    const loginValidation = {
        username: {
            required: "Username or Email is required",
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
        }
    };

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

    const onHandleLoginSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/user/login',data)
            if(response.data.success){
                toast.success("Welcome")
                setToken(response.data.token)
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            
        }
        setTimeout(() => {
            navigate('/dashboard')
            setIsLoading(false)
            loginForm.reset()
        }, 1000);

    };

    const onHandleSignupSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/user/register', data)

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
            {currState === 'login' ? (
                <div className="login">
                    <div className="form-section">
                        <p onClick={() => setShowLogin(false)} className='login-cancel'>X</p>
                        <div className='login-heading'>
                            <h1>Welcome to Finance Tracker</h1>
                            <p>Please log in to manage your finances</p>
                        </div>

                        <form onSubmit={loginForm.handleSubmit(onHandleLoginSubmit)}>
                            <div className="input-group">
                                <div className='input-group-title'>
                                    <User size={20} color='green' />
                                    <label htmlFor="username">Username or Email</label>
                                </div>
                                <input
                                    type="email"
                                    id="username"
                                    {...loginForm.register('username', loginValidation.username)}
                                    placeholder="Enter your username or Email"
                                />
                                {loginForm.formState.errors.username && (
                                    <p className="error-message">{loginForm.formState.errors.username.message}</p>
                                )}
                            </div>

                            <div className="input-group">
                                <div className='input-group-title'>
                                    <Lock size={20} color='green' />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    {...loginForm.register('password', loginValidation.password)}
                                    placeholder="Enter your password"
                                />
                                {loginForm.formState.errors.password && (
                                    <p className="error-message">{loginForm.formState.errors.password.message}</p>
                                )}
                            </div>

                            <div className="forgot-password">
                                <a href="">Forgot password?</a>
                            </div>

                            <div className="btn-login">
                                <button type="submit" disabled={isLoading || loginForm.formState.isSubmitting}>
                                    {isLoading ? (
                                        <div className="loading-spinner">
                                            <>Please Wait... </>
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
                <div className="signup-page">
                    <div className="signup-container">
                        <p onClick={() => setShowLogin(false)} className='signup-cancel'>X</p>
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
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
