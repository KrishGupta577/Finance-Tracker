import { createContext } from "react";

export const StoreContext = createContext({
    url: null,
})

const StoreContextProvider = (props) => {

    const url = 'http://localhost:5000'

    const contextValue = {
        url
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
