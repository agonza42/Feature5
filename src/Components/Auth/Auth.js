import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import { checkUser } from "../../Common/Services/AuthService";

// Import CSS stylesheet
import '../../Style/Log.css'; 

// Function to redirect users based on whether they're authenticated or not
const AuthModule = () => {
  const navigate = useNavigate();

  // Redirect already authenticated users back to home
  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      navigate("/");
    }
  }, [navigate]);

  // Links to register or login for unauthenticated users
  return <Navigate to="/auth/login" replace />;
};

export default AuthModule;
