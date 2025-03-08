import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, User, CreditCard, HelpCircle, Moon, Sun } from 'lucide-react';
import './Setting.css';
import { StoreContext } from '../../../context/StoreContext';
import axios from 'axios';

function Setting() {

  const { colorTheme, setColorTheme, userInfo, url } = useContext(StoreContext)
  const token = localStorage.getItem('token')
  let theme = 'light'

  const toggleTheme = async (userId) => {
    setColorTheme(colorTheme === 'light' ? 'dark' : 'light');
    const theme = colorTheme === 'light' ? 'dark' : 'light';

    await axios.post(url + '/api/user/preferences', { userId, theme }, { headers: { token } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="settings-container"
    >
      <div className='setting-heading'>
        <button className="theme-toggle-btn" onClick={() => toggleTheme(userInfo._id)}>
          {colorTheme === 'light' ? <Moon /> : <Sun />} {colorTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
      <div className="settings-grid">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="profile-card"
        >
          <div className="card-header">
            <h2 className="section-title">Profile Settings</h2>
          </div>
          <div className="card-content">
            <div className="profile-picture-container">
              <div className="profile-picture-placeholder">
                <User className="profile-icon" />
              </div>
              <div className="profile-picture-info">
                <h3 className="profile-picture-title">Profile Picture</h3>
                <p className="profile-picture-description">Update your profile picture</p>
                <button className="upload-button">
                  Upload New Picture
                </button>
              </div>
            </div>

            <div className="profile-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="two-column-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="settings-card"
          >
            <div className="card-section-header">
              <Bell className="section-icon" />
              <h2 className="section-title">Notifications</h2>
            </div>
            <div className="notification-options">
              <div className="toggle-option">
                <span>Email Notifications</span>
                <label className="toggle-switch">
                  <input type="checkbox" className="toggle-input" />
                  <div className="toggle-slider"></div>
                </label>
              </div>
              <div className="toggle-option">
                <span>Push Notifications</span>
                <label className="toggle-switch">
                  <input type="checkbox" className="toggle-input" defaultChecked />
                  <div className="toggle-slider"></div>
                </label>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="settings-card"
          >
            <div className="card-section-header">
              <Lock className="section-icon" />
              <h2 className="section-title">Security</h2>
            </div>
            <div className="security-options">
              <button className="link-button">
                Change Password
              </button>
              <button className="link-button">
                Two-Factor Authentication
              </button>
              <button className="link-button">
                Login History
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="two-column-grid"
        >
          <div className="settings-card">
            <div className="card-section-header">
              <CreditCard className="section-icon" />
              <h2 className="section-title">Payment Methods</h2>
            </div>
            <button className="primary-button">
              Add Payment Method
            </button>
          </div>

          <div className="settings-card">
            <div className="card-section-header">
              <HelpCircle className="section-icon" />
              <h2 className="section-title">Help & Support</h2>
            </div>
            <div className="support-options">
              <button className="link-button">
                FAQs
              </button>
              <button className="link-button">
                Contact Support
              </button>
              <button className="link-button">
                Report an Issue
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Setting;