import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import LoginPage from './pages/LoginPage/LoginPage';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import { StoreContext } from './Context/StoreContext';
import { useEffect } from 'react';

function App() {

  const { colorTheme } = useContext(StoreContext)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorTheme);
  }, [colorTheme]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/admin-login" replace />} />
        <Route path="/admin-login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/admin/dashboard/*' element={<Dashboard />} ></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
