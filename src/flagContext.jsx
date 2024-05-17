import React, { createContext, useState } from 'react';

export const FlagContext = createContext();

export const FlagProvider = ({ children }) => {
  const [flagBtn, setFlagBtn] = useState(false);

  return (
    <FlagContext.Provider value={{ flagBtn, setFlagBtn }}>
      {children}
    </FlagContext.Provider>
  );
};