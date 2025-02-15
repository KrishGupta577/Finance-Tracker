import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
