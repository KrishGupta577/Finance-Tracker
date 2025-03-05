import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [token, setToken] = useState('')
    const [transactions, setTransactions] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const url = 'http://localhost:5000'

    const data = []

    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].category === 'expense') {
            data.push({ name: transactions[i].expense_category, value: transactions[i].amount })
        }
    }

    const expenseCategories = [
        "Entertainment",
        "Food",
        "Transportation",
        "Shopping",
        "Bills",
        "Healthcare",
        "Education",
        "Other"
    ];

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
            console.log(token)
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
        expenseCategories,
        data,
        refreshTransactions: () => transactionList(token), 
        refreshUserInfo: () => userInfoFunction(token)  
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
