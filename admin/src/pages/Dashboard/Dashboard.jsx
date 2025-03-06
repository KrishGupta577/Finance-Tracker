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
// import Reports from '../../components/AfterLogin/Reports/Reports';
// import Setting from '../../components/AfterLogin/SettingPage/Setting';
// import UsersList from '../../Components/UsersList/UsersList';
import LogoutPage from '../../Components/LogoutPage/Logout';
import SettingPage from '../../Components/SettingPage/SettingPage';
// import { StoreContext } from '../../context/StoreContext';

const Dashboard = () => {
    const location = useLocation();

    const sidebarMenus = [
        { name: 'Overview', path: '/admin/dashboard', icon: <Home className="menu-icon" /> },
        { name: 'Transactions', path: '/admin/dashboard/transactions', icon: <ArrowRightLeft className="menu-icon" /> },
        { name: 'Users', path: '/admin/dashboard/users', icon: <User className="menu-icon" /> },
        { name: 'Reports', path: '/admin/dashboard/reports', icon: <FileText className="menu-icon" /> },
        { name: 'Settings', path: '/admin/dashboard/settings', icon: <Settings className="menu-icon" /> },
        { name: 'Logout', path: '/admin/dashboard/logout', icon: <LogOut className="menu-icon" /> }
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

                {/* <Route index element={<Overview />} />
                <Route path="transactions" element={<Transaction />} />
                <Route path="reports" element={<Reports />} />
                <Route path="mobile-app" element={<MobileApp />} /> 
                */}

                <Routes>
                    {/* <Route path="users" element={<UsersList />} /> */}
                    <Route path="logout" element={<LogoutPage />} />
                    <Route path="settings" element={<SettingPage />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;