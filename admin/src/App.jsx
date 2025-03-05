import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import LoginPage from './pages/LoginPage/LoginPage';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';


function App() {


  return (
    <>

      <Routes>
        <Route path="/" element={<Navigate to="/admin-login" replace />} />
        <Route path="/admin-login" element={<LoginPage />} />
        <Route path='/dashboard/*' element={<Dashboard />} ></Route>
        <Route element={<ProtectedRoute />}>
        </Route>
      </Routes>
    </>
  )
}

export default App
