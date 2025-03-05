import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');

    return !!token; // Returns true if token exists, false otherwise
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;