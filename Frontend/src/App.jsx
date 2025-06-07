import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';
import { toast, ToastContainer } from 'react-toastify'
import { useContext, useEffect } from 'react';
import { StoreContext } from './context/StoreContext';
import ExpenseForm from './components/AfterLogin/ExpenseForm/ExpenseForm';

function App() {

    const {colorTheme} = useContext(StoreContext)

    useEffect(() => {
      toast.success("Note: The server may take up to 20 seconds to respond due to free hosting limitations. Thank you for your patience!")
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
