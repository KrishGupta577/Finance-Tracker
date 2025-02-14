import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Login from './components/Authentication/LoginPage/Login';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginPage" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
