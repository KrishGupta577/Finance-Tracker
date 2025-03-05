import React, { useContext, useEffect } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import {
    Home,
    ArrowRightLeft,
    FileText,
    Smartphone,
    Settings,
    LogOut,
    BellIcon,
    User,
} from 'lucide-react';
import './Dashboard.css';
// import Overview from '../../components/AfterLogin/Overview/Overview';
// import Transaction from '../../components/AfterLogin/Transaction/Transaction';
// import Insights from '../../components/AfterLogin/Insights/Insights';
// import Reports from '../../components/AfterLogin/Reports/Reports';
// import Setting from '../../components/AfterLogin/SettingPage/Setting';
// import MobileApp from '../../components/AfterLogin/MobileApp/MobileApp';
// import LogoutPage from '../../components/AfterLogin/LogoutPage/LogoutPage';
// import { StoreContext } from '../../context/StoreContext';

const Dashboard = () => {
    // const { userInfo } = useContext(StoreContext);
    const location = useLocation();

    const sidebarMenus = [
        { name: 'Overview', path: '/dashboard', icon: <Home className="menu-icon" /> },
        { name: 'Transactions', path: '/dashboard/transactions', icon: <ArrowRightLeft className="menu-icon" /> },
        { name: 'Users', path: '/dashboard/insights', icon: <User className="menu-icon" /> },
        { name: 'Reports', path: '/dashboard/reports', icon: <FileText className="menu-icon" /> },
        { name: 'Settings', path: '/dashboard/settings', icon: <Settings className="menu-icon" /> },
        { name: 'Logout', path: '/dashboard/logout', icon: <LogOut className="menu-icon" /> }
    ];

    const pathname = location.pathname.split('/').pop();
    const currentPage = pathname.charAt(0).toUpperCase() + pathname.slice(1);

    useEffect(() => {
        document.title = `Finance Tracker - ${currentPage}`;
    }, [pathname]);

    return (
        <div className="app-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <img src='/logo.svg' alt='logo' />
                    <h1>Finance Tracker</h1>
                </div>
                <nav className="sidebar-nav">
                    {sidebarMenus.map((menu) => (
                        <NavLink
                            key={menu.name}
                            to={menu.path}
                            className={({ isActive }) =>
                                `menu-item ${isActive ? 'active' : ''}`
                            }
                            end={menu.path === '/dashboard'} // Add end prop for exact matching on overview
                        >
                            {menu.icon}
                            <span>{menu.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Header */}
                <header className="header">
                    <div className="header-left">
                        <h2 className="header-title">{currentPage}</h2>
                    </div>
                    <div className="header-right">
                        <button className="notification-btn">
                            <span><BellIcon /></span>
                            <span className="notification-indicator"></span>
                        </button>
                        <div className="profile-info">
                            <img
                                src='/profile_photo.png'
                                alt="Profile"
                                className="profile-image"
                                referrerPolicy="no-referrer"
                            />
                            <div>
                                <h3 className="profile-name">John Doe</h3>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Routes */}
                {/* <Routes>
                    <Route index element={<Overview />} />
                    <Route path="transactions" element={<Transaction />} />
                    <Route path="insights" element={<Insights />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="mobile-app" element={<MobileApp />} />
                    <Route path="settings" element={<Setting />} />
                    <Route path="logout" element={<LogoutPage />} />
                </Routes> */}
            </div>
        </div>
    );
};

export default Dashboard;