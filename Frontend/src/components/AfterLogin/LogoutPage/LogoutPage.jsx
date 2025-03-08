import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, AlertCircle, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./LogoutPage.css"
import {StoreContext} from '../../../context/StoreContext'

function LogoutPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutComplete, setLogoutComplete] = useState(false);
  const {setColorTheme} = useContext(StoreContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLoggingOut(true);
    sessionStorage.clear()
    localStorage.clear()
    
    setTimeout(() => {
      setIsLoggingOut(false);
      setLogoutComplete(true);
      
      setTimeout(() => {
        setColorTheme('light')
        navigate("/")
      }, 2000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="logout-page-container">
      <motion.div
        className="logout-card"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {!logoutComplete ? (
          <>
            <motion.div variants={itemVariants} className="logout-icon">
              <div className="icon-circle">
                <LogOut size={36} />
              </div>
            </motion.div>

            <motion.h2 variants={itemVariants}>Ready to Log Out?</motion.h2>

            <motion.p variants={itemVariants} className="logout-message">
              Your financial data is safely stored. You can return anytime by logging back in.
            </motion.p>

            <motion.div variants={itemVariants} className="logout-actions">
              <button
                className="logout-button"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <span className="loading-spinner"></span>
                    <span className="logout-text">Logging Out...</span>
                  </>
                ) : (
                  <>
                    <LogOut size={18} />
                    <span className="logout-text">Log Out</span>
                  </>
                )}
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="logout-notice">
              <AlertCircle size={16} />
              <span>You'll need to sign in again to access your account</span>
            </motion.div>
          </>
        ) : (
          <motion.div
            className="logout-success"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="success-icon">
              <Check size={36} />
            </div>
            <h2>Successfully Logged Out</h2>
            <p>Thank you for using Finance Tracker</p>
            <div className="redirect-container">
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
              <p className="redirect-message">Redirecting to login page...</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default LogoutPage;