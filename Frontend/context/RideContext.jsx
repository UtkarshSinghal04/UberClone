import React, { createContext, useState, useContext } from 'react';

const RideContext = createContext();

const RideProvider = ({ children }) => {
  const [rideCancelled, setRideCancelled] = useState(false);

  return (
    <RideContext.Provider value={{ rideCancelled, setRideCancelled }}>
      {children}
    </RideContext.Provider>
  );
};

const useRideGlobalContext = () => {
    return useContext(RideContext)
}

export { RideContext, RideProvider, useRideGlobalContext }  
