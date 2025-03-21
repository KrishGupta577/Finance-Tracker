import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Lock } from 'lucide-react';
import './SecuritySetting.css';
import ChangePassword from './ChangePassword/ChangePassword';

const SecuritySetting = ({ activeSection, toggleSection }) => {
  const [activeSecurityOption, setActiveSecurityOption] = useState(null);

  const handleOptionClick = (option) => {
    setActiveSecurityOption(option);
  };

  const handleGoBack = () => {
    setActiveSecurityOption(null);
  };

  return (
    <div className="security-setting-container">
      <div
        className="card-section-header clickable"
        onClick={() => toggleSection('security')}
      >
        <Lock className="section-icon" />
        <h2 className="section-title">Security</h2>
        {activeSection === 'security' ? <ChevronUp /> : <ChevronDown />}
      </div>
      <AnimatePresence>
        {activeSection === 'security' && (
          <motion.div
            className="security-options"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {!activeSecurityOption ? (
              // Security menu options
              <>
                <motion.button
                  className="link-button"
                  whileHover={{ x: 5 }}
                  onClick={() => handleOptionClick('change-password')}
                >
                  Change Password
                </motion.button>
                <motion.button
                  className="link-button"
                  whileHover={{ x: 5 }}
                  onClick={() => handleOptionClick('two-factor')}
                >
                  Two-Factor Authentication
                </motion.button>
                <motion.button
                  className="link-button"
                  whileHover={{ x: 5 }}
                  onClick={() => handleOptionClick('login-history')}
                >
                  Login History
                </motion.button>
              </>
            ) : (
              // Active security option content
              <AnimatePresence mode="wait">
                {activeSecurityOption === 'change-password' && (
                  <ChangePassword 
                    goBack={handleGoBack} 
                  />
                )}
                {activeSecurityOption === 'two-factor' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Two-factor authentication content would go here */}
                    <p>Two-factor authentication content</p>
                    <button onClick={handleGoBack}>Back</button>
                  </motion.div>
                )}
                {activeSecurityOption === 'login-history' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Login history content would go here */}
                    <p>Login history content</p>
                    <button onClick={handleGoBack}>Back</button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecuritySetting;