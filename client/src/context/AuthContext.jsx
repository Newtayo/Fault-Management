import React from 'react'
import { useContext, useState, useEffect } from 'react';

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    
    setCurrentUser(localStorage.getItem('user'))
  }, [currentUser]);
    const value = {
        currentUser,
        setCurrentUser,
      };
      return (
        <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>
      );
    };
    
