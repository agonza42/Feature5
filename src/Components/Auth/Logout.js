import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './AuthService';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser().then(() => {
      // After logging out, redirect the user to the login page
      navigate('/auth/login');
    });
  };

  return (
    handleLogout()
  );
};

export default Logout;