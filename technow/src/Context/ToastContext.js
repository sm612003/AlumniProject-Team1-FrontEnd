import { createContext , useContext , useState } from "react";

const GlobalToastContext = createContext();

export const useGlobalToast = () => {
    return useContext(GlobalToastContext)
}

export const GlobalToastProvider = ({children}) => {
    const [globalToast , setGlobalToast ] = useState(null)

    const showGlobalToast = (title , text) => {
        setGlobalToast({title , text})
        setTimeout(()=> setGlobalToast(null) , 24 * 3600 * 1000)
    }

    const hideGlobalToast = () => {
        setGlobalToast(null);
    }

    return (
        <GlobalToastContext.Provider value={{ globalToast, showGlobalToast, hideGlobalToast }}>
          {children}
        </GlobalToastContext.Provider>
    )
}