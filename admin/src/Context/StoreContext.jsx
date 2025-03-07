import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

  const [users, setUsers] = useState([])
  const [transactions, setTransactions] = useState([])
  const url = 'http://localhost:5000'
  const [token, setToken] = useState('')
  const tokenKey = localStorage.getItem('token')

  const usersList = async (token) => {
    try {
      const response = await axios.post(url + "/api/admin/usersList", {}, { headers: { token } })

      if (response.data.success) {
        setUsers(response.data.usersList)
      }
      else {
        console.log(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const transactionsList = async (token) => {
    try {
      const response = await axios.post(url + "/api/admin/transactionsList", {}, { headers: { token } })
      if (response.data.success) {
        setTransactions(response.data.transactionsList)
      }
      else {
        console.log(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    }
  }, [token])

  useEffect(() => {
    if(token){
      transactionsList(token)
    }
  },[])

  const contextValue = {
    url,
    token,
    setToken,
    usersList,
    transactionsList,
    users,
    transactions,
    refreshUsers : () => {usersList(tokenKey)}
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;