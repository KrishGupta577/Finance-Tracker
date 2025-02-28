import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';
import { ToastContainer } from 'react-toastify'
import { useContext } from 'react';
import { StoreContext } from './context/StoreContext';
import ExpenseForm from './components/AfterLogin/ExpenseForm/ExpenseForm';

function App() {

  const {url} = useContext(StoreContext)

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/userInfoForm" element={<ExpenseForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/userInfoForm" element={<ExpenseForm />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
