import { createContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    return <AppContext.Provider value={"as"}>{children}</AppContext.Provider>
}

export { AppProvider, AppContext }