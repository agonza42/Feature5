import Parse from "parse";

// Authentication service used in AuthRegister component
export const createUser = (newUser) => {
  const user = new Parse.User();

  // Set all the necessary user information fields
  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  console.log("User: ", user);
  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// Function to log-in users, used in AuthLogin component
export const loginUser = (currUser) => {
  const user = new Parse.User();

  user.set("password", currUser.password);
  user.set("username", currUser.email);

  // Log in the user
  console.log("User: ", user);
  console.log();
  return user
    .logIn(user.email, user.password)
    .then((currUserSaved) => {
      return currUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// Function to check if a user has been authenticated
export const checkUser = () => {
  return Parse.User.current()?.authenticated;
};

// Function to log users out
export const logoutUser = () => {
  return Parse.User.logOut()
    .then(() => {
      // Successfully logged out
    })
    .catch((error) => {
      // Show an error alert if something goes wrong during the logout process
      alert(`Error: ${error.message}`);
    });
};
