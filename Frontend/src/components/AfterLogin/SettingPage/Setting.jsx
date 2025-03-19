import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Lock, User, CreditCard, HelpCircle, Moon, Sun, ChevronDown, ChevronUp, Settings as SettingsIcon } from 'lucide-react';
import axios from 'axios';
import { StoreContext } from '../../../context/StoreContext';
import './Setting.css';
import ProfileSetting from '../../Setting Components/ProfileSetting/ProfileSetting';
import SecuritySetting from '../../Setting Components/SecuritySetting/SecuritySetting';
import NotificationSetting from '../../Setting Components/NotificationSetting/NotificationSetting';

function Setting() {
  const { colorTheme, setColorTheme, url } = useContext(StoreContext);
  const [activeSection, setActiveSection] = useState(null);
  const token = localStorage.getItem('token');

  const toggleTheme = async () => {
    const newTheme = colorTheme === 'light' ? 'dark' : 'light';
    setColorTheme(newTheme);

    await axios.post(url + '/api/user/preferences', {theme: newTheme }, {
      headers: { token }
    });
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="settings-page">
      <motion.div
        className="settings-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="settings-title">
          <SettingsIcon className="settings-icon pulse" />
          <h1>Settings</h1>
        </div>
        <button
          className="theme-toggle-btn"
          onClick={() => toggleTheme()}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: colorTheme === 'light' ? 0 : 180 }}
            transition={{ duration: 0.5 }}
            className="theme-icon-container"
          >
            {colorTheme === 'light' ? <Moon className="moon-icon" /> : <Sun className="sun-icon" />}
          </motion.div>
          {colorTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </motion.div>

      <motion.div
        className="settings-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="settings-card"
          variants={itemVariants}
        >
          <ProfileSetting activeSection={activeSection} toggleSection={toggleSection} />

        </motion.div>

        <motion.div
          className="settings-card"
          variants={itemVariants}
        >
          <NotificationSetting activeSection={activeSection} toggleSection={toggleSection}/>
        </motion.div>

        <motion.div
          className="settings-card"
          variants={itemVariants}
        >
          <SecuritySetting activeSection={activeSection} toggleSection={toggleSection} />
        </motion.div>

        <motion.div
          className="settings-card"
          variants={itemVariants}
        >
          <div
            className="card-section-header clickable"
            onClick={() => toggleSection('payment')}
          >
            <CreditCard className="section-icon" />
            <h2 className="section-title">Payment Methods</h2>
            {activeSection === 'payment' ? <ChevronUp /> : <ChevronDown />}
          </div>
          <AnimatePresence>
            {activeSection === 'payment' && (
              <motion.div
                className="payment-options"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="payment-info">You have no payment methods saved.</p>
                <motion.button
                  className="primary-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add Payment Method
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="settings-card"
          variants={itemVariants}
        >
          <div
            className="card-section-header clickable"
            onClick={() => toggleSection('support')}
          >
            <HelpCircle className="section-icon" />
            <h2 className="section-title">Help & Support</h2>
            {activeSection === 'support' ? <ChevronUp /> : <ChevronDown />}
          </div>
          <AnimatePresence>
            {activeSection === 'support' && (
              <motion.div
                className="support-options"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  className="link-button"
                  whileHover={{ x: 5 }}
                >
                  FAQs
                </motion.button>
                <motion.button
                  className="link-button"
                  whileHover={{ x: 5 }}
                >
                  Contact Support
                </motion.button>
                <motion.button
                  className="link-button"
                  whileHover={{ x: 5 }}
                >
                  Report an Issue
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Setting;