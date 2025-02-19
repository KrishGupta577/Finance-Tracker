import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [token, setToken] = useState('')
    const [transactions, setTransactions] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const url = 'http://localhost:5000'

    const transactionList = async (token) => {
        try {
            const response = await axios.get(url + "/api/transaction/get", { headers: { token } })
            setTransactions(response)
        } catch (error) {
            console.log(error)
        }
    }

    const userInfoFunction = async (token) => {
        try {
            const response = await axios.get(url + "/api/user/info", { headers: { token } })
            if (response.data.userInfo) {
                setUserInfo(response.data.userInfo)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setToken(localStorage.getItem("token"))
        if (localStorage.getItem("token")) {
            transactionList(localStorage.getItem("token"))
            userInfoFunction(localStorage.getItem("token"))
        }
    },[])
    
    const contextValue = {
        url,
        token,
        setToken,
        transactions,
        userInfo
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
