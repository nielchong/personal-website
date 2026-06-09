import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const AuthRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    return <div><p>Loading...</p></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default AuthRoute;