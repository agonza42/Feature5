import React, { useState, useEffect } from 'react';

// Import the CSS file
import '../../Style/Overview.css';

/* OVERVIEW MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const Overview = () => {

  // State to hold the personalized recommendations
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {

    const sessionToken = localStorage.getItem('sessionToken');
    console.log("Session Token in React:", sessionToken);

    // Check if session token is available
    if (!sessionToken) {
      console.error('Session token is not available');
      setError('Please log in to view recommendations.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/personalized-recommendations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-parse-session-token': sessionToken,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Received non-JSON response from server');
      }
  
      const data = await response.json();
      setRecommendations(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  // Render the recommendations or a fallback message
  const renderRecommendations = () => {
    if (error) {
      return <p>Error loading recommendations: {error}</p>;
    }

    if (!recommendations || recommendations.length === 0) {
      return <p>Loading recommendations...</p>;
    }

    if (recommendations.message) {
      return <p>{recommendations.message}</p>;
    }

    // *** This is a placeholder, adjust based on actual data structure!!! ***
    /*return (
      <ul>
        {recommendations.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );*/
  };

  return (
    <div className="background-radial-gradient">
      <h2 id="subtitle">Recent Summary</h2>

      <br></br>
      {/* List Section */}
      <div className="section-container list-section">
        <h3 className="text-center">Weekly Checklist</h3>
        <br></br>
        <ul className="list-group">
          <li className="list-group-item rounded">
            <input className="form-check-input me-1" type="checkbox" id="calories" name="calories" value="calories"/>
            <label htmlFor="calories"> Met daily calorie goal every day</label>
          </li>
          <li className="list-group-item rounded">
            <input className="form-check-input me-1" type="checkbox" id="exercise" name="exercise" value="exercise"/>
            <label htmlFor="exercise"> 45 minutes of daily exercise every day</label>
          </li>
          <li className="list-group-item rounded">
            <input className="form-check-input me-1" type="checkbox" id="outside" name="outside" value="outside" />
            <label htmlFor="outside"> 3 workouts done outside in the week</label>
          </li>
        </ul>
      </div>
      <br></br>

      {/* Progress Bars Section */}
      <div className="section-container progress-section">
        <h3 className="text-center">Recent Results</h3>
          <br></br>
          <div className="progress">
            <div className="progress-bar bg-success" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div className="progress">
            <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div className="progress">
            <div className="progress-bar bg-warning" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div className="progress">
            <div className="progress-bar bg-danger" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
      </div>
      <br></br>

      {/* Cards Section */}
      <div className="section-container cards-section">
        <h3 className="text-center">Recommended Plans/Milestones</h3>
        <br></br>
        {/*<div className="container">
          <div className="row">
            <div className="col-lg-4 mb-2">
              <div className="card bg-light mb-3" style={{width: "18rem"}}>
                <img src="../images/pilates.jpg" className="card-img-top" alt="HIIT Workout"/>
                <div className="card-body">
                  <h5 className="card-title">15-minute HIIT</h5>
                  <p className="card-text">HIIT routines are a great way to get rid of body fat and also provides a quick option!</p>
                  <a href="https://www.mensjournal.com/health-fitness/best-hiit-workouts" className="btn btn-primary">Examples</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-2">
              <div className="card bg-light mb-3" style={{width: "18rem"}}>
                <img src="../images/running.jpg" className="card-img-top" alt="Running"/>
                <div className="card-body">
                  <h5 className="card-title">10 km run</h5>
                  <p className="card-text">Getting into running on a daily basis is a great habit to be active and lose weight!</p>
                  <a href="https://www.runnersworld.com/uk/training/beginners/a40088632/running-tips-for-beginners/" className="btn btn-primary">Tips</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-2">
              <div className="card bg-light mb-3" style={{width: "18rem"}}>
                <img src="../images/weights.jpg" className="card-img-top" alt="Weightlifting"/>
                <div className="card-body">
                  <h5 className="card-title">Weightlifting</h5>
                  <p className="card-text">Strength training is an excellent way to gain muscle and build a healthier lifestyle!</p>
                  <a href="https://www.muscleandfitness.com/workout-plan/workouts/workout-routines/complete-mf-beginners-training-guide-plan/" className="btn btn-primary">Workouts/Routines</a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {renderRecommendations()}
      </div>

      <br></br>

    </div>
  );
};

export default Overview;