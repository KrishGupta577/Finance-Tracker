import { motion, AnimatePresence } from 'framer-motion';
import { User, ChevronUp, ChevronDown, IndianRupee, AlertTriangle } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../../context/StoreContext';
import { useForm } from 'react-hook-form';
import './ProfileSetting.css';
import { toast } from 'react-toastify'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileSetting = ({ activeSection, toggleSection }) => {
    const { userInfo, url, token, refreshUserInfo,setColorTheme } = useContext(StoreContext);
    const [image, setImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [uploadError, setUploadError] = useState('');
      const navigate = useNavigate()

    const {
        register: registerProfile,
        handleSubmit: handleSubmitProfile,
        reset: resetProfile,
        formState: { errors: errorsProfile }
    } = useForm({
        defaultValues: {
            name: userInfo?.name || '',
            monthly_income: userInfo?.monthly_income || ''
        }
    });

    // Reset profile form when userInfo changes
    useEffect(() => {
        resetProfile({
            name: userInfo?.name || '',
            monthly_income: userInfo?.monthly_income || ''
        });
    }, [userInfo, resetProfile]);

    const onUpload = async (e) => {
        e.preventDefault();

        if (!image) {
            toast.error("Please select an image to upload");
            return;
        }

        // Check file size (2MB limit)
        if (image.size > 2 * 1024 * 1024) {
            setUploadError("File size exceeds the 2MB limit.");
            return;
        }

        // Check file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(image.type)) {
            setUploadError("Only .jpg, .jpeg, and .png files are allowed!");
            return;
        }

        const formData = new FormData();
        formData.append("profile_picture", image);

        try {
            setIsUploading(true);
            setUploadError('');

            const response = await axios.post(url + '/api/upload/profile-photo', formData, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                refreshUserInfo()
                setImage(null);
            }
            else{
                toast.error(response.data.message)
                setUploadError(response.data.message || "Error uploading image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setUploadError(error.response?.data?.error || "Failed to upload image");
        } finally {
            setIsUploading(false);
        }
    };

    const onProfileUpdate = async (data) => {
        try {
            const response = await axios.post(url + '/api/user/profile-update', data, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
        }
    };

    const onProfileError = (errors) => {
        console.error('Profile form errors:', errors);
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirmText !== userInfo?.email) {
            toast.error("Please type your email correctly to confirm deletion");
            return;
        }
        try {
            setIsDeleting(true);
            const response = await axios.post(url + '/api/user/delete',{},{ headers: { token } });

            if (response.data.success) {
                toast.success("Your account has been deleted successfully");
                sessionStorage.clear()
                localStorage.clear()
                setColorTheme('light')
                navigate("/")
            } else {
                toast.error(response.data.message || "Failed to delete account");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            toast.error("Failed to delete account");
        } finally {
            setIsDeleting(false);
        }
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
                            <form>
                                <div className="profile-image-container">
                                    <label htmlFor="image" className='profile-picture-upload-label'>
                                        <img
                                            src={image ? URL.createObjectURL(image) : (userInfo?.profile_picture_url)}
                                            alt="Profile"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                            }}
                                        />
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setUploadError('');
                                            setImage(e.target.files[0]);
                                        }}
                                        type="file"
                                        id='image'
                                        hidden
                                        accept="image/jpeg,image/png,image/jpg"
                                    />
                                    <label htmlFor="image" className='profile-picture-upload-label'>Click Here</label>
                                </div>

                                {/* Display upload error if any */}
                                {uploadError && (
                                    <div className="upload-error-message">
                                        {uploadError}
                                    </div>
                                )}

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
                                        placeholder="monthly_income"
                                        min="0"
                                        step="1000"
                                        {...registerProfile('monthly_income', { required: 'Income is required' })}
                                    />
                                </div>
                                {errorsProfile.monthly_income &&
                                    <p className="error-text">{errorsProfile.monthly_income.message}</p>
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

                        {/* Delete Account Section */}
                        <div className="delete-account-section">
                            <h3 className="delete-account-title">Delete Account</h3>
                            <p className="delete-account-warning">
                                <AlertTriangle className="warning-icon" />
                                Warning: Deleting your account is permanent and cannot be undone. All your data will be permanently removed.
                            </p>

                            {!showDeleteConfirm ? (
                                <motion.button
                                    type="button"
                                    className="delete-account-btn"
                                    onClick={() => setShowDeleteConfirm(true)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Delete Account
                                </motion.button>
                            ) : (
                                <div className="delete-confirmation">
                                    <p>To confirm deletion, please type your email: <strong>{userInfo?.email}</strong></p>
                                    <input
                                        type="text"
                                        className="delete-confirm-input"
                                        value={deleteConfirmText}
                                        onChange={(e) => setDeleteConfirmText(e.target.value)}
                                        placeholder="Enter your email"
                                    />
                                    <div className="delete-confirm-buttons">
                                        <motion.button
                                            type="button"
                                            className="cancel-delete-btn"
                                            onClick={() => {
                                                setShowDeleteConfirm(false);
                                                setDeleteConfirmText('');
                                            }}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            Cancel
                                        </motion.button>
                                        <motion.button
                                            type="button"
                                            className="confirm-delete-btn"
                                            onClick={handleDeleteAccount}
                                            disabled={isDeleting || deleteConfirmText !== userInfo?.email}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            {isDeleting ? 'Deleting...' : 'Permanently Delete Account'}
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileSetting;