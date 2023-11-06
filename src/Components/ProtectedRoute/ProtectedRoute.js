import React from "react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../../Common/Services/AuthService";

// Function to ensure protected route functionality
const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate("/auth");
  };

  if (checkUser()) {
    return React.cloneElement(props.element);
  } else {
    return (
      <div>
        <p>Unauthorized!</p>
        <button onClick={goBackHandler}>Go Back.</button>
      </div>
    );
  }
};

export default ProtectedRoute;
