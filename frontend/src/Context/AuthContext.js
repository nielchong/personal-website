import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [isRole, setIsRole] = useState(undefined);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('http://localhost:9001/user/session', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setIsRole(data.authorities[0].authority);
          setIsAuthenticated(data.authenticated);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    
      checkAuthentication();
  }, []);
  
  const login = (role) => {
    setIsAuthenticated(true);
    setIsRole(role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsRole(undefined);
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, isRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);