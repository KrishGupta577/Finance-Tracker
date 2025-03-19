import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Bell } from 'lucide-react';
import './NotificationSetting.css'

const NotificationSetting = ({ activeSection, toggleSection }) => {

    return (
        <>
            <div
                className="card-section-header clickable"
                onClick={() => toggleSection('notifications')}
            >
                <Bell className="section-icon" />
                <h2 className="section-title">Notifications</h2>
                {activeSection === 'notifications' ? <ChevronUp /> : <ChevronDown />}
            </div>
            <AnimatePresence>
                {activeSection === 'notifications' && (
                    <motion.div
                        className="notification-options"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
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
                        <div className="toggle-option">
                            <span>Marketing Updates</span>
                            <label className="toggle-switch">
                                <input type="checkbox" className="toggle-input" />
                                <div className="toggle-slider"></div>
                            </label>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default NotificationSetting;