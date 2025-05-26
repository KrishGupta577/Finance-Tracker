import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

  const [users, setUsers] = useState([])
  const [transactions, setTransactions] = useState([])
  const url = 'https://finance-tracker-server-jqmgwf9gv.vercel.app'
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [colorTheme, setColorTheme] = useState('light')
  const [adminInfo, setAdminInfo] = useState({})

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

  const adminInfoFunction = async (token) => {

    try {
      const response = await axios.get(url + "/api/admin/admin-info", { headers: { token } })
      if (response.data.success) {
        setAdminInfo(response.data.adminInfo)
        setColorTheme(response.data.adminInfo.preferences.theme)
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
    if (token) {
      adminInfoFunction(token);
    }
  }, [token]);


  useEffect(() => {
    if (token) {
      transactionsList(token)
    }
  }, [token])

  const contextValue = {
    url,
    token,
    setToken,
    usersList,
    transactionsList,
    users,
    transactions,
    colorTheme,
    setColorTheme,
    adminInfo,
    setAdminInfo,
    refreshUsers: () => { usersList(token) }
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;