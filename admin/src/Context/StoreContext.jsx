import { createContext, useEffect, useState } from "react";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

  let users = []
  const url = ' http://localhost:5000'
  const [token, setToken] = useState('')

  const contextValue = {
    url,
    token,
    setToken
  }

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    }
  }, [token])

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;