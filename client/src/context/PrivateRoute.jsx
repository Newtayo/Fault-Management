import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


const PrivateRoute = () => {
  const { currentUser } = useAuth()
  console.log(currentUser)
  return (
    currentUser ? <Outlet /> : <Navigate to="/" />
  );
};

export default PrivateRoute;