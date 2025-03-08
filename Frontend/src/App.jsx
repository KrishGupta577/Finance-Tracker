import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';
import { ToastContainer } from 'react-toastify'
import { useContext, useEffect } from 'react';
import { StoreContext } from './context/StoreContext';
import ExpenseForm from './components/AfterLogin/ExpenseForm/ExpenseForm';

function App() {

  const {colorTheme} = useContext(StoreContext)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorTheme);
  }, [colorTheme]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />:
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/userInfoForm" element={<ExpenseForm />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
