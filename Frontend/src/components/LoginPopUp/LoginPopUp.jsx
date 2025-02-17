import { useContext, useState } from 'react';
import "./LoginPopUp.css";
import { User, Lock } from 'lucide-react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { StoreContext } from '../../context/StoreContext';



const LoginPopUp = ({ setCurrState }) => {

    const [isLoading, setIsLoading] = useState(false);

    const { url } = useContext(StoreContext)
    const { token, setToken } = useContext(StoreContext)
    const navigate = useNavigate()

    // Separate form handlers for login and signup
    const loginForm = useForm();


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



    const onHandleLoginSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(url + '/api/user/login', data)
            if (response.data.success) {
                toast.success("Welcome")
                setToken(response.data.token)
                localStorage.setItem("token", response.data.token)
                setTimeout(() => {
                    navigate('/dashboard')
                }, 1000);
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log("Error occured: ", error);
        }
        setTimeout(() => {
            setIsLoading(false)
            loginForm.reset()
        }, 1000);

    };




    return (

        <div className="form-section">

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
            <p className='login-partition'>----------------------- or -----------------------</p>
        </div>
    );
};

export default LoginPopUp;
