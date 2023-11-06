import React, { useEffect, useState } from "react";
import { checkUser, createUser } from "../../Common/Services/AuthService";
import AuthForm from "./AuthForm";
import { useNavigate, Link } from "react-router-dom";

// Function for registering a new user
const AuthRegister = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  // Flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);

  // Redirect already authenticated users back to home
  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      navigate("/");
    }
  }, [navigate]);

  // useEffect that run when changes are made to the state variable flags
  useEffect(() => {
    // checkUser() ? history.push("/home"): null;
    if (newUser && add) {
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          alert(
            `${userCreated.get("firstName")}, you successfully registered!`
          );
          navigate("/");
        }
        
        setAdd(false);
      });
    }
  }, [navigate, newUser, add]);

  // Function to handle changes in values
  const onChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    const { name, value: newValue } = e.target;
    console.log(newValue);

    setNewUser({
      ...newUser,
      [name]: newValue
    });
  };

  // Function to handle form submissions
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted: ", e.target);
    setAdd(true);
  };

  return (
    <div>
      <AuthForm
        user={newUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
      <br></br>
      <br></br>
      <a href="/auth/login" className="signup">Already have an account? Log In</a>
    </div>
  );
};

export default AuthRegister;
