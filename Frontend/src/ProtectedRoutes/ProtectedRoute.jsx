import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

  // Check if user is authenticated
  // This could be a token in localStorage, a state in your auth context, etc.

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');

    return !!token; // Returns true if token exists, false otherwise
  };

  // If not authenticated, redirect to login
  // If authenticated, render the child components

  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;