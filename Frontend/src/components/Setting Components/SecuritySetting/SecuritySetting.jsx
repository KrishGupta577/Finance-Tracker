import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Lock } from 'lucide-react';
import './SecuritySetting.css'

const SecuritySetting = ({ activeSection, toggleSection }) => {
  return (
    <div className = ''>
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
                <motion.button
                  className="link-button"
                  whileHover={{ x: 5 }}
                >
                  Change Password
                </motion.button>
                <motion.button
                  className="link-button"
                  whileHover={{ x: 5 }}
                >
                  Two-Factor Authentication
                </motion.button>
                <motion.button
                  className="link-button"
                  whileHover={{ x: 5 }}
                >
                  Login History
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
    </div>
  );
};

export default SecuritySetting;