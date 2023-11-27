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

      {/* IN PROGRESS: IMAGE CAROUSEL */}
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="/Images/running.jpg" alt="First slide"/>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/Images/gym.jpg" alt="Second slide"/>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/Images/pilates.jpg" alt="Third slide"/>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/Images/weights.jpg" alt="Third slide"/>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/Images/barbell.jpg" alt="Third slide"/>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>

      </div>
    </div>
  );
};

export default Main;