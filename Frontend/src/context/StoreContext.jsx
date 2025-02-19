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
            console.log(response)
            if (response.data.success) {
                setTransactions(response.data.transactions)
            }

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
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
        }
      }, []);
    
      useEffect(() => {
        if (token) {
          transactionList(token);
          userInfoFunction(token);
        }
      }, [token]);

    const contextValue = {
        url,
        token,
        setToken,
        transactions,
        userInfo,
        refreshTransactions: () => transactionList(token), // Add refresh function
        refreshUserInfo: () => userInfoFunction(token)     // Add refresh function
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
