import { motion, AnimatePresence } from 'framer-motion';
import { User, ChevronUp, ChevronDown, IndianRupee } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../../context/StoreContext';
import { useForm } from 'react-hook-form';
import './ProfileSetting.css';
import axios from 'axios';

const ProfileSetting = ({ activeSection, toggleSection }) => {
    const { userInfo, url, token, setUserInfo } = useContext(StoreContext);
    const [image, setImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const {
        register: registerUpload,
        handleSubmit: handleSubmitUpload,
        formState: { errors: errorsUpload }
    } = useForm();

    const {
        register: registerProfile,
        handleSubmit: handleSubmitProfile,
        reset: resetProfile,
        formState: { errors: errorsProfile }
    } = useForm({
        defaultValues: {
            name: userInfo?.name || '',
            income: userInfo?.monthly_income || ''
        }
    });

    // Reset profile form when userInfo changes
    useEffect(() => {
        resetProfile({
            name: userInfo?.name || '',
            income: userInfo?.monthly_income || ''
        });
    }, [userInfo, resetProfile]);

    const onUpload = async () => {
        console.log()
    };

    const onProfileUpdate = async (data) => {
        console.log(data)
    };

    // Error handlers
    const onUploadError = (errors) => {
        console.error('Upload form errors:', errors);
    };

    const onProfileError = (errors) => {
        console.error('Profile form errors:', errors);
    };

    return (
        <div>
            <div
                className="card-section-header clickable"
                onClick={() => toggleSection('profile')}
                role="button"
                aria-expanded={activeSection === 'profile'}
            >
                <User className="section-icon" />
                <h2 className="section-title">Profile Settings</h2>
                {activeSection === 'profile' ? <ChevronUp /> : <ChevronDown />}
            </div>

            <AnimatePresence>
                {activeSection === 'profile' && (
                    <motion.div
                        className="profile-content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="profile-picture-info">
                            <h3 className="profile-picture-title">Profile Picture</h3>
                            <p className="profile-picture-description">Update your profile picture</p>

                            {/* Profile picture upload form */}
                            <form onSubmit={handleSubmitUpload(onUpload, onUploadError)}>
                                <div className="profile-image-container">
                                    <label htmlFor="image" className='profile-picture-upload-label'>
                                        <img
                                            src={image ? URL.createObjectURL(image) : (userInfo?.profile_picture_url)}
                                            alt="Profile"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = defaultProfileImage;
                                            }}
                                        />
                                    </label>
                                    <input
                                        onChange={(e) => setImage(e.target.files[0])}
                                        type="file"
                                        id='image'
                                        hidden
                                        accept="image/jpeg,image/png,image/jpg"
                                    />
                                    <label htmlFor="image" className='profile-picture-upload-label'>Click Here</label>
                                </div>


                                {image && (
                                    <motion.button
                                        type="button"
                                        onClick={onUpload}
                                        className="profile-picture-upload-btn"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        disabled={isUploading}
                                    >
                                        {isUploading ? 'Uploading...' : 'Save Picture'}
                                    </motion.button>
                                )}

                            </form>

                        </div>

                        {/* Profile information form */}
                        <form className="profile-form" onSubmit={handleSubmitProfile(onProfileUpdate, onProfileError)}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="profile-form-input"
                                    placeholder="John Doe"
                                    {...registerProfile('name', { required: 'Name is required' })}
                                />
                                {errorsProfile.name &&
                                    <p className="error-text">{errorsProfile.name.message}</p>
                                }
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="profile-form-input"
                                    placeholder="john@example.com"
                                    value={userInfo?.email || ''}
                                    readOnly
                                />
                                <p className="input-hint">Email cannot be changed</p>
                            </div>

                            <div className="form-group income-group">
                                <label className="form-label">Annual Income</label>
                                <div className="income-input-container">
                                    <IndianRupee className="income-icon" />
                                    <input
                                        type="number"
                                        className="profile-form-input income-input"
                                        placeholder="Income"
                                        min="0"
                                        step="1000"
                                        {...registerProfile('income', { required: 'Income is required' })}
                                    />
                                </div>
                                {errorsProfile.income &&
                                    <p className="error-text">{errorsProfile.income.message}</p>
                                }
                                <p className="input-hint">Your income information is private and secure</p>
                            </div>

                            <motion.button
                                type="submit"
                                className="save-profile-btn"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                aria-label="Save profile changes"
                            >
                                Save Changes
                            </motion.button>
                        </form>
                    </motion.div >
                )}
            </AnimatePresence >
        </div >
    );
};

export default ProfileSetting;