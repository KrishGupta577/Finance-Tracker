import React, { useState } from 'react';
import {
    Home,
    ArrowRightLeft,
    LineChart as ChartIcon,
    Wallet,
    FileText,
    Smartphone,
    Settings,
    LogOut,
    BellIcon,
} from 'lucide-react';
import './Dashboard.css'; 
import { useNavigate } from 'react-router-dom';
import Overview from '../../components/AfterLogin/Overview/Overview';
import Transaction from '../../components/AfterLogin/Transaction/Transaction';
import Insights from '../../components/AfterLogin/Insights/Insights';
import Reports from '../../components/AfterLogin/Reports/Reports';
import Setting from '../../components/AfterLogin/SettingPage/Setting';
import MobileApp from '../../components/AfterLogin/MobileApp/MobileApp';

const Dashboard = () => {
    const [selectedMenu, setSelectedMenu] = useState('Overview');
  const navigate = useNavigate()
    const sidebarMenus = [
        { name: 'Overview', icon: <Home className={"menu-icon"} /> },
        { name: 'Transactions', icon: <ArrowRightLeft className={"menu-icon"} /> },
        { name: 'Insights', icon: <ChartIcon className={"menu-icon"} /> },
        { name: 'Budget Planner', icon: <Wallet className={"menu-icon"} /> },
        { name: 'Reports', icon: <FileText className={"menu-icon"} /> },
        { name: 'Mobile App', icon: <Smartphone className={"menu-icon"} /> },
        { name: 'Settings', icon: <Settings className={"menu-icon"} /> },
        { name: 'Logout', icon: <LogOut className={"menu-icon"} /> }
    ];



    const handleMenuClick = (name) => {
        setSelectedMenu(name);
    };

    return (
        <div className="app-container">
            {/* Sidebar */}
            <div className={`sidebar`}>
                <div className="sidebar-header">
                    <img src='/logo.svg' alt='logo' />
                    <h1>Finance Tracker</h1>
                </div>
                <nav className="sidebar-nav">
                    {sidebarMenus.map((menu) => (
                        <button
                            key={menu.name}
                            onClick={() => handleMenuClick(menu.name)}
                            className={`menu-item ${selectedMenu === menu.name ? 'active' : ''}`}
                        >
                            {menu.icon}
                            <span>{menu.name}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Header */}
                <header className="header">
                    <div className="header-left">
                        <h2 className="header-title">{selectedMenu}</h2>
                    </div>
                    <div className="header-right">
                        <button className="notification-btn">
                            <span><BellIcon /></span>
                            <span className="notification-indicator"></span>
                        </button>
                        <div className="profile-info">
                            <img
                                src="https://public.readdy.ai/ai/img_res/ab01949d95a26d0527301b340a8d5b0f.jpg"
                                alt="Profile"
                                className="profile-image"
                            />
                            <div>
                                <h3 className="profile-name">Alexander Mitchell</h3>
                            </div>
                        </div>
                    </div>
                </header>

                {/* main content */}

                {selectedMenu === 'Overview' && <Overview />}
                {selectedMenu === 'Transactions' && <Transaction />}
                {selectedMenu === 'Insights' && <Insights />}
                {selectedMenu === 'Reports' && <Reports />}
                {selectedMenu === 'Settings' && <Setting />}
                {selectedMenu === 'Mobile App' && <MobileApp />}

            </div>
        </div>
    );
};

export default Dashboard;
