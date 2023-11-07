import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { checkUser } from "../../Common/Services/AuthService";

// Function to ensure protected route functionality
const ProtectedRoute = (props) => {

  if (checkUser()) {
    return React.cloneElement(props.element);
  } else {
    return <Navigate to="/auth" replace />;
  }
};

export default ProtectedRoute;
