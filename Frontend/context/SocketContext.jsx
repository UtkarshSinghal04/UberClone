import React, { useContext, useState, useEffect } from "react";
import {io} from 'socket.io-client'

const SocketContext = React.createContext()

const socket = io(`${import.meta.env.VITE_BASE_URL}`)

const SocketProvider = ({children}) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected to server')
        })
    , []})

    return (
        <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
    )
}

const useGlobalSocketContext = () => {
    return useContext(SocketContext)
}

export {useGlobalSocketContext, SocketContext, SocketProvider}
