import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, Check, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {StoreContext} from '../../../../context/StoreContext'
import {toast} from 'react-toastify'
import './ChangePassword.css';
import axios from 'axios';

const ChangePassword = ({ goBack }) => {
    const {userInfo, url ,token} = useContext(StoreContext)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isValid }, 
        watch, 
        getValues,
        reset 
    } = useForm();

    const onFormSubmit = async (data) => {
        try {
            const response = await axios.post(url + '/api/user/change-password',data,{headers:{token}})
     
            if(response.data.success){
             toast.success(response.data.message)
             reset()
            }
            else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error('error')
        }
    };

    const onError = (errors) => {
        console.log(errors);
    };

    return (
        <motion.div
            className="simple-change-password-container"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
        >
            <div className="change-password-header">
                <button className="back-button" onClick={goBack}>
                    <ArrowLeft size={16} />
                    <span>Back</span>
                </button>
                <h2 className="change-password-title">Change Password</h2>
            </div>

            <form onSubmit={handleSubmit(onFormSubmit, onError)} className="change-password-form">
                <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <div className="password-input-wrapper">
                        <input
                            id="currentPassword"
                            {...register('currentPassword', { 
                                required: "Current password is required" 
                            })}
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Enter your current password"
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                            {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {errors.currentPassword && <p className="error-message">{errors.currentPassword.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <div className="password-input-wrapper">
                        <input
                            id="newPassword"
                            {...register('newPassword', {
                                required: "New password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter your new password"
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {errors.newPassword && <p className="error-message">{errors.newPassword.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <div className="password-input-wrapper">
                        <input
                            id="confirmPassword"
                            {...register('confirmPassword', {
                                required: "Confirm password is required",
                                validate: value => value === watch('newPassword') || "Passwords do not match"
                            })}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your new password"
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
                </div>

                <div className="form-actions">
                    <button type="button" className="cancel-button" onClick={goBack}>
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="submit-button" 
                        disabled={!isValid || !getValues('currentPassword')}
                    >
                        Change Password
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default ChangePassword;