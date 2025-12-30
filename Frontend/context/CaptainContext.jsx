import React, { useContext, useState } from "react";

const AppContext = React.createContext()

const AppCaptainProvider = ({children}) => {
    const [captain, setCaptain] = useState({
        fullname:{
            firstname: '',
            lastname: ''
        },
        email: '',
        vehicle:{
            color: '',
            plate: '',
            capacity: 0,
            vehicleType: ''
        }
    })

   return (
    <AppContext.Provider 
    value={{
        captain, 
        setCaptain
    }}>
        {children}
    </AppContext.Provider>
   )
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppCaptainProvider, useGlobalContext}