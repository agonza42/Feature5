import React, { useEffect, useState } from "react";
import { checkUser, loginUser } from "../../Common/Services/AuthService";
import AuthForm from "./AuthForm";
import { useNavigate, Link  } from "react-router-dom";

// Import CSS stylesheet
import '../../Style/Log.css'; 

// Function for log-in functionality for users
const AuthLogin = () => {
  const navigate = useNavigate();

  // Redirect already authenticated users back to home
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: ""
  });

  // Flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);

  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      navigate("/");
    }
  }, [navigate]);

  // useEffect that run when changes are made to the state variable flags
  useEffect(() => {
    if (currentUser && add) {
      loginUser(currentUser).then((userLoggedIn) => {
        if (userLoggedIn) {
          alert(
            `${userLoggedIn.get("firstName")}, you successfully logged in!`
          );
          navigate("/");
        }
        
        setAdd(false);
      });
    }
  }, [navigate, currentUser, add]);

  // Function to handle changes in the values
  const onChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    const { name, value: newValue } = e.target;
    console.log(newValue);

    setCurrentUser({
      ...currentUser,
      [name]: newValue
    });
  };

  // Function to handle form submission
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted: ", e.target);
    setAdd(true);
  };

  return (
    <div>
      <AuthForm
        user={currentUser}
        isLogin={true}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
      <Link to="/auth/register" className="signup">Don't have an account? Sign Up</Link>
      
    </div>
  );
};

export default AuthLogin;
