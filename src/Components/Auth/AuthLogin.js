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

  // Return the authorization form using Bootstrap to improve the styling and appearance
  return (
    <section className="background-radial-gradient overflow-hidden">
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            {/* Left side content */}
            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
              Say hello to<br />
              <span style={{ color: 'hsl(218, 81%, 75%)' }}>a better you!</span>
            </h1>
            <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
            With FitSnap, empower your fitness journey with precision; track calories,
            monitor activities, and achieve health goals with tailored recommendations.
            Welcome to a smarter, healthier you - where every step counts and every
            calorie is smartly managed!
            </p>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            {/* Decorative shapes */}
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            {/* Login form */}
            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-primary mb-5">Please enter your login and password!</p>

                <AuthForm
                  user={currentUser}
                  isLogin={true}
                  onChange={onChangeHandler}
                  onSubmit={onSubmitHandler}
                />

                <div className="text-center">
                  <p className="mb-0">Don't have an account?{' '}
                    <Link to="/auth/register" className="text-primary fw-bold">Sign Up</Link>
                  </p>
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLogin;
