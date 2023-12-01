import React, { useState, useEffect } from 'react';
import { getAllTrackingEntries, getById, updateTrackingForm, deleteById} from '../../Common/Services/TrackingService';
import Parse from "parse";

// Import the child component
import OverviewChild from './OverviewChild';
import TrackingChildUpdate from './../Tracking/TrackingChildUpdate';

// Import the CSS file
import '../../Style/Overview.css';

/* OVERVIEW MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const Overview = () => {

  // State to hold the personalized recommendations
  const [recommendations, setRecommendations] = useState({ case: null, bmr: null, averageCalories: null });
  const [error, setError] = useState(null);

  // State to track if we want to display activities
  const [isSubmitted, setIsSubmitted] = useState(false);  

  // state to track editing activity info
  const [currentEntry, setCurrentEntry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchRecommendations = async () => {

    const sessionToken = localStorage.getItem('sessionToken');
    //console.log("Session Token in React:", sessionToken);

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

  const handleHide = () => {
    setIsSubmitted(false); // Hide the OverviewChild component
  };

  // ProcessTrackingEntries - takes an array of objects as an argument and populates a table with data.
  function processTrackingEntries(trackingEntries) {
    const tableBody = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing rows
  
    trackingEntries.forEach((entry, index) => {
      const row = tableBody.insertRow();
      row.insertCell(0).textContent = entry.get('todaysDate') ? entry.get('todaysDate').toLocaleDateString() : '';
      row.insertCell(1).textContent = entry.get('breakfastCals');
      row.insertCell(2).textContent = entry.get('lunchCals');
      row.insertCell(3).textContent = entry.get('dinnerCals');
      row.insertCell(4).textContent = entry.get('snacksCals');
      row.insertCell(5).textContent = entry.get('exerciseCals');

      // Add a cell for the edit button
      const editCell = row.insertCell(-1); 
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.onclick = () => handleEdit(entry, index);
      editCell.appendChild(editButton);

      // Add a cell for the delete button
      const deleteCell = row.insertCell(-1);
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => handleDelete(entry, index);
      deleteCell.appendChild(deleteButton);
    });
  }

  // handle delete entry
  const handleDelete = async (entry) => {
    try {
      // Confirm before deletion
      if (!confirm('Are you sure you want to delete this entry?')) {
        return; // If user cancels, exit the function
      }

      // Perform the deletion operation
      await deleteById(entry.id);
      console.log("Entry deleted:", entry.id);
      
      // Refresh the data
      const updatedEntries = await getAllTrackingEntries(); // Assuming this fetches all entries
      processTrackingEntries(updatedEntries); // Re-render the table with updated data
      
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  // handle editing activity of user
  const handleEdit = async(entry) => {
    try {
      const entryData = await getById(entry.id);
      console.log("Fetched Entry Data:", entryData);

      setCurrentEntry(entryData); // Set the current entry to be edited
      setIsEditing(true); // Open the TrackingChild as a modal
    } catch (error) {
      console.error('Error fetching entry data:', error);
    }
  };

  // handle submit of edits made to activity of user
  const handleSubmitEdit = async (updatedData) => {
    const TrackingEntry = Parse.Object.extend("TrackingEntry");
    const query = new Parse.Query(TrackingEntry);

    try {
      const entryToUpdate = await query.get(currentEntry.id); // Fetch the entry to update
      console.log(updatedData.todaysDate)
      // Update fields
      await updateTrackingForm(entryToUpdate, updatedData)
      
      setIsEditing(false); // Close the modal after saving

      // Refresh the data
      const updatedEntries = await getAllTrackingEntries(); // Assuming this fetches all entries
      processTrackingEntries(updatedEntries); // Re-render the table with updated data

      // Set update message
      alert('Data has been successfully updated.');
    
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  // Function to handle asynchronous data when a submit event occurs
  const handleSubmit = async (event) => {

    event.preventDefault();
    setIsSubmitted(true); // Set button submit as submitted

    // Get current user
    const user = Parse.User.current();
    if (!user) {
      alert('No user logged in');
      return;
    }

    getAllTrackingEntries(user).then((trackingEntries) => {
      processTrackingEntries(trackingEntries);
    }).catch((error) => {
      console.error('Error:', error);
    });
  };

  // Render the recommendations or a fallback message
  const renderRecommendations = () => {
    if (error) {
      return <p>Error loading recommendations: {error}</p>;
    }
  
    if (!recommendations.case) {
      // If case is null, undefined, or '', show a default message or perform an action
      return <p>Recommendations not found, make sure to fill out your goals and tracking forms.</p>;
    }
  
    // Render based on the case
    switch (recommendations.case) {
      case 'loseWeightUnderBMR':
        return <p>HTML for lose weight under BMR</p>;
      case 'loseWeightOverBMR':
        return <p>HTML for lose weight over BMR</p>;
      case 'gainWeightUnderBMR':
        return <p>HTML for gain weight under BMR</p>;
      case 'gainWeightOverBMR':
        return <p>HTML for gain weight over BMR</p>;
      case 'maintainWeight':
        return <p>HTML for maintain weight</p>;
      case 'missing':
        return <p>Something is missing. CASE MISSING</p>;
      default:
        return <p>Something is missing. DEFAULT</p>;
    }
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

      {/* Activity and Meals Section */}
      <div className="section-container cards-section">
        <h3 className="text-center">Activities and Meals</h3>
        <br></br>
          <form onSubmit={handleSubmit} className="text-center">
            <button type="submit" className="btn btn-primary mt-4">View Meals and Activities</button>
          </form>

          {isSubmitted && (
            <>
              <OverviewChild />
              <button onClick={handleHide} className="btn btn-secondary mt-4">Close</button>
            </>)
        }
        {isEditing && (
            <TrackingChildUpdate
              entry={currentEntry}
              onSave={handleSubmitEdit}
              onCancel={() => setIsEditing(false)}
            />
        )} 
       {/* <div className="modal"></div> */}
      </div>
      <br></br>

      

    </div>
  );
};

export default Overview;