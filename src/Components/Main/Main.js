import React, { useState, useEffect } from "react";
import MainList from "./MainList";

// Import the CSS file
import '../../Style/Home.css'; 

/* MAIN MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const Main = () => {

  return (
    <div>
      <h4 id="subtitle">
        Welcome to the one-stop location to track and embark on your
        personalized fitness journey!
      </h4>
    </div>
  );
};

export default Main;