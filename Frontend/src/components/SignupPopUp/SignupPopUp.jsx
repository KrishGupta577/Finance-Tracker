import './SignupPopUp.css'
import { User, Lock, Mail } from 'lucide-react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import axios from "axios"
import { StoreContext } from '../../context/StoreContext';
import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.1,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.1 }
        }
    };

    const buttonVariants = {
        idle: { scale: 1 },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
    };

    return (
        <AnimatePresence>
            <motion.div
                key="signup-form"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
            >
                <div className="signup-form-section">
                    <motion.h2 variants={itemVariants}>Create Your Account</motion.h2>
                    <form onSubmit={signupForm.handleSubmit(onHandleSignupSubmit)}>

                        <motion.div className="input-group" variants={itemVariants}>
                            <div className='input-group-title'>
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <User size={20} color='green' />
                                </motion.div>
                                <label htmlFor="name">Name</label>
                            </div>
                            <motion.input
                                whileFocus={{ scale: 1.01, boxShadow: "0 0 8px rgba(0,128,0,0.3)" }}
                                type="text"
                                id="name"
                                {...signupForm.register('name', signupValidation.name)}
                                placeholder="Enter your full name"
                            />
                            <AnimatePresence>
                                {signupForm.formState.errors.name && (
                                    <motion.p 
                                        className="error-message"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {signupForm.formState.errors.name.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div className="input-group" variants={itemVariants}>
                            <div className='input-group-title'>
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                >
                                    <Mail size={20} color='green' />
                                </motion.div>
                                <label htmlFor="email">Email Address</label>
                            </div>
                            <motion.input
                                whileFocus={{ scale: 1.01, boxShadow: "0 0 8px rgba(0,128,0,0.3)" }}
                                type="email"
                                id="email"
                                {...signupForm.register('email', signupValidation.email)}
                                placeholder="Enter your email"
                            />
                            <AnimatePresence>
                                {signupForm.formState.errors.email && (
                                    <motion.p 
                                        className="error-message"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {signupForm.formState.errors.email.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div className="input-group" variants={itemVariants}>
                            <div className='input-group-title'>
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <Lock size={20} color='green' />
                                </motion.div>
                                <label htmlFor="signup-password">Password</label>
                            </div>
                            <motion.input
                                whileFocus={{ scale: 1.01, boxShadow: "0 0 8px rgba(0,128,0,0.3)" }}
                                type="password"
                                id="signup-password"
                                {...signupForm.register('password', signupValidation.password)}
                                placeholder="Create a strong password"
                            />
                            <AnimatePresence>
                                {signupForm.formState.errors.password && (
                                    <motion.p 
                                        className="error-message"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {signupForm.formState.errors.password.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div className="input-group" variants={itemVariants}>
                            <div className='input-group-title'>
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <Lock size={20} color='green' />
                                </motion.div>
                                <label htmlFor="confirm-password">Confirm Password</label>
                            </div>
                            <motion.input
                                whileFocus={{ scale: 1.01, boxShadow: "0 0 8px rgba(0,128,0,0.3)" }}
                                type="password"
                                id="confirm-password"
                                {...signupForm.register('confirmPassword', signupValidation.confirmPassword)}
                                placeholder="Confirm your password"
                            />
                            <AnimatePresence>
                                {signupForm.formState.errors.confirmPassword && (
                                    <motion.p 
                                        className="error-message"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {signupForm.formState.errors.confirmPassword.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div className="signup-popup-condition" variants={itemVariants}>
                            <motion.input
                                whileHover={{ scale: 1.1 }}
                                type="checkbox" id='terms'
                                {...signupForm.register('terms', signupValidation.terms)}
                            />
                            <label htmlFor='terms'>By continuing, I agree to the terms of use & privacy policy.</label>
                            <AnimatePresence>
                                {signupForm.formState.errors.terms && (
                                    <motion.p 
                                        className="error-message"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {signupForm.formState.errors.terms.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div className='btn-signup' variants={itemVariants}>
                            <motion.button
                                type="submit"
                                variants={buttonVariants}
                                initial="idle"
                                whileHover="hover"
                                whileTap="tap"
                                disabled={isLoading || signupForm.formState.isSubmitting}
                            >
                                {isLoading ? (
                                    <motion.div 
                                        className="loading-spinner"
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    >
                                       
                                    </motion.div>
                                ) : (
                                    <>Create Account</>
                                )}
                            </motion.button>
                        </motion.div>
                    </form>
                </div>
                <motion.p 
                    className="login-link"
                    variants={itemVariants}
                >
                    Already have an account? <motion.a 
                        whileHover={{ scale: 1.05, color: '#00a000' }}
                        onClick={() => setCurrState('login')}
                    >Login</motion.a>
                </motion.p>
                <motion.p 
                    className='login-partition'
                    variants={itemVariants}
                    animate={{ 
                        opacity: [0, 1],
                        transition: { delay: 0.5 }
                    }}
                >
                    ----------------------- or -----------------------
                </motion.p>
            </motion.div>
        </AnimatePresence>
    )
}

export default SignupPopUp