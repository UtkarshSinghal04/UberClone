import React, { useContext, useState } from "react";

const AppContext = React.createContext()

const AppUserProvider = ({ children }) => {
    const [user, setUser] = useState({
        fullname: {
            firstname: '',
            lastname: '',
        },
        email: '',
    })

    const [vehicleImageUrl, setVehicleImageUrl] = useState('')

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                vehicleImageUrl,
                setVehicleImageUrl,
            }}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppUserProvider, useGlobalContext }  