import "./MobileApp.css"
import { motion } from 'framer-motion';
import { Smartphone, Apple, Cuboid as Android, Download } from 'lucide-react';

function MobileApp() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
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
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mobile-app-container"
        >
            <motion.div variants={itemVariants} className="mobile-app-header">
                <Smartphone size={48} />
                <h1>Get Finance Tracker on Mobile</h1>
                <p>Track your finances on the go with our mobile app</p>
            </motion.div>

            <div className="mobile-app-features">
                <div className="feature-card-container">
                    <motion.div variants={itemVariants} className="feature-card">
                        <div className="feature-icon">
                            <Download />
                        </div>
                        <h3>Easy Sync</h3>
                        <p>Seamlessly sync your data across all devices</p>
                    </motion.div>
                </div>

                <div className="feature-card-container">
                    <motion.div variants={itemVariants} className="feature-card">
                        <div className="feature-icon">
                            <Smartphone />
                        </div>
                        <h3>Mobile First</h3>
                        <p>Optimized for the best mobile experience</p>
                    </motion.div>
                </div>
            </div>

            <motion.div variants={itemVariants} className="download-section">
                <a href="#" className="download-button ios">
                    <Apple size={24} />
                    <div className="button-text">
                        <span>Download on the</span>
                        <strong>App Store</strong>
                    </div>
                </a>

                <a href="#" className="download-button android">
                    <Android size={24} />
                    <div className="button-text">
                        <span>Get it on</span>
                        <strong>Google Play</strong>
                    </div>
                </a>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="mobile-preview"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1024&q=80')`
                }}
            />
        </motion.div>
    );
}

export default MobileApp;