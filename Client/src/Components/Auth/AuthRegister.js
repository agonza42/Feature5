import React, { useEffect, useState } from "react";
import { checkUser, createUser } from "../../Common/Services/AuthService";
import AuthForm from "./AuthForm";
import { useNavigate, Link } from "react-router-dom";

// Import CSS stylesheet
import '../../Style/Log.css'; 

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

  // Return the authorization form using Bootstrap to improve the styling and appearance
  return (
    <section className="background-radial-gradient overflow-hidden">
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          
          {/* Left Column for Registration Form */}
          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">

            {/* Decorative shapes */}
            <div id="radius-shape-3" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-4" className="position-absolute shadow-5-strong"></div>

            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                <p className="text-primary mb-5">Please enter your details to sign-up!</p>

                <AuthForm
                  user={newUser}
                  isLogin={false}
                  onChange={onChangeHandler}
                  onSubmit={onSubmitHandler}
                />

                <div className="text-center">
                  <p className="mb-0">
                    Already have an account?{' '}
                    <Link to="/auth/login" className="text-primary fw-bold">Log In</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column for Content */}
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
              Get ready to embark <br />
              <span style={{ color: 'hsl(218, 81%, 75%)' }}>on your fitness journey!</span>
            </h1>
            <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
              FitSnap is here to help you reach your fitness goals, keep track of your daily
              activities, and obtain a healthier lifestyle, all while having an experience
              that's completely tailored to you! With next-generation technology, we 
              provide a user-centric experience that adjusts to your preferences and will
              help you be fit in a snap!
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AuthRegister;
