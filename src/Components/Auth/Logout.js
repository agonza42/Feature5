import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Common/Services/AuthService';

// Function for user log-out functionality
const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser().then(() => {
      // After logging out, redirect the user to the login page
      alert('You have successfully logged out')
      navigate('/auth/login');
    });
  };

  // Call handleLogout function
  return (
    handleLogout()
  );
};

export default Logout;