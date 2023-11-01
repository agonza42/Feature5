import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

// Import the CSS file
import '../../Style/Home.css'; 

/* Header for all pages */
const Header = () => {
  return (
    <div>
        <h1 id="title">FitSnap</h1>

        {/* List of references to navigate between website pages */}
        <ul id="list">
          <li><Link to="/">Home Page</Link></li>
          <li><Link to="/overview">Overview</Link></li>
          <li><Link to="/tracking">Enter Your Daily Meals and Activity</Link></li>
          <li><Link to="/goals">Goals</Link></li>
          <li><Link to="/premium">Get a Premium Subscription</Link></li>
          <li><Link to="/auth">Log-in/Register</Link></li>
        </ul>
    </div>
  );
};

export default Header;
