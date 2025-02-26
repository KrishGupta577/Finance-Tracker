import "./AuthPage.css"
import SignupPopUp from '../SignupPopUp/SignupPopUp';
import LoginPopUp from "../LoginPopUp/LoginPopUp";
import { useContext, useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from "axios"
import { toast } from 'react-toastify';
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const AuthPage = ({ setShowLogin }) => {

    const [currState, setCurrState] = useState('login');
    const { url, setToken} = useContext(StoreContext)
    const navigate = useNavigate()

    return (
        <>
            <div className="auth">
                <div className="auth-container">
                    <p onClick={() => setShowLogin(false)} className='auth-cancel'> <X size={30} /> </p>
                    {currState === 'login' ? (
                        <LoginPopUp setCurrState={setCurrState} />
                    ) : (
                        <SignupPopUp setCurrState={setCurrState} />
                    )}
                    <div className='google-link'>
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                const decodedCredentials = jwtDecode(credentialResponse.credential);
                                try {
                                    const response = await axios.post(url + '/api/user/google-login', decodedCredentials);
                                    if (response.data.success) {
                                        toast.success("Welcome")
                                        setToken(response.data.token)
                                        localStorage.setItem("token", response.data.token)
                                        if(response.data.returnUser){
                                            navigate('/dashboard')
                                        }
                                        else{
                                            navigate('/userInfoForm')
                                        }
                                    }
                                    else {
                                        toast.error(response.data.message)
                                    }
                                } catch (error) {
                                    console.error('Error submitting form:', error);
                                }
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthPage