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
      editCell.classList.add('px-2');
      editCell.classList.add('edit-cell'); 
      const editButton = document.createElement('button');
      editButton.classList.add('btn', 'btn-info', 'btn-sm');
      editButton.textContent = 'Edit';
      editButton.onclick = () => handleEdit(entry, index);
      editCell.appendChild(editButton);

      // Add a cell for the delete button
      const deleteCell = row.insertCell(-1);
      editCell.classList.add('px-2');
      deleteCell.classList.add('delete-cell');
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
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
      return <p>Error loading recommendations: {error}. Make sure the server is running.</p>;
    }
  
    if (!recommendations.case) {
      // If case is null, undefined, or '', show a default message or perform an action
      return <p>Recommendations not found, make sure to fill out your goals and tracking forms.</p>;
    }
  
    // Render based on the case determined in the NodeJS server to determine the HTML output
    switch (recommendations.case) {
      case 'loseWeightUnderBMR':
        return (
          <div className="container">
            <div className="row">
              <h6 className="message">Your recent calorie tracking indicates that you are being successful with your caloric deficit, which means you're losing weight! Great job, keep doing your thing! Here are some personalized recommendations to keep you on track!</h6>
              <br></br>
              <div className="col-lg-4 mb-2">
                <div className="card bg-light mb-3" style={{width: "18rem"}}>
                  <img src="../images/pilates.jpg" className="card-img-top" alt="HIIT Workout"/>
                  <div className="card-body">
                    <h5 className="card-title">15-minute HIIT</h5>
                    <p className="card-text">HIIT routines are a great way to get rid of stubborn body fat and also provides a quick option!</p>
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
          </div>
        );
      case 'loseWeightOverBMR':
        return (
          <div className="container">
            <div className="row">
              <h6 className="message">Your recent calorie tracking indicates that you are not sticking to your caloric deficit, which means you're not meeting your weight goals. Here are some personalized recommendations to get you back on track!</h6>
              <br></br>
              <div className="col-lg-4 mb-2">
                <div className="card bg-light mb-3" style={{width: "18rem"}}>
                  <img src="../images/hiit.jpg" className="card-img-top" alt="HIIT Workout"/>
                  <div className="card-body">
                    <h5 className="card-title">30-minute HIIT</h5>
                    <p className="card-text">HIIT routines are a great way to start getting rid of stubborn body fat and have tons of different options to choose from, making them a cardio staple!</p>
                    <a href="https://www.bodybuilding.com/content/high-intensity-interval-training-the-ultimate-guide.html" className="btn btn-primary">HIIT Guide</a>
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
                  <img src="../images/barbell.jpg" className="card-img-top" alt="Weightlifting"/>
                  <div className="card-body">
                    <h5 className="card-title">Weightlifting</h5>
                    <p className="card-text">Strength training is an excellent way to build muscle and keep it as you lose weight!</p>
                    <a href="https://www.muscleandfitness.com/workout-plan/workouts/workout-routines/complete-mf-beginners-training-guide-plan/" className="btn btn-primary">Workouts/Routines</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'gainWeightUnderBMR':
        return (
          <div className="container">
            <div className="row">
              <h6 className="message">Your recent calorie tracking indicates that you are not sticking to your caloric surplus, which means you're not meeting your weight goals. Here are some personalized recommendations to get you back on track!</h6>
              <br></br>
              <div className="col-lg-4 mb-2">
                <div className="card bg-light mb-3" style={{width: "18rem"}}>
                  <img src="../images/smoothie.jpg" className="card-img-top" alt="Smoothie"/>
                  <div className="card-body">
                    <h5 className="card-title">Nutrient-dense & high-calorie foods</h5>
                    <p className="card-text">Gaining weight doesn't have to mean eating all day! There are some great nutrient-dense and high-calorie food options to help you gain weight cleanly!</p>
                    <a href="https://www.predatornutrition.com/articlesdetail?cid=high-calorie-foods-for-bulking" className="btn btn-primary">High-Cal Healthy Foods</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-2">
                <div className="card bg-light mb-3" style={{width: "18rem"}}>
                  <img src="../images/time.jpg" className="card-img-top" alt="Time"/>
                  <div className="card-body">
                    <h5 className="card-title">Meal scheduling</h5>
                    <p className="card-text">Scheduling your meals throughout the day is a great way to plan your eating and build a healthy relationship with food!</p>
                    <a href="https://www.health.state.mn.us/docs/people/wic/nutrition/english/genweightgain.pdf" className="btn btn-primary">Tips</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-2">
                <div className="card bg-light mb-3" style={{width: "18rem"}}>
                  <img src="../images/barbell.jpg" className="card-img-top" alt="Weightlifting"/>
                  <div className="card-body">
                    <h5 className="card-title">Weightlifting</h5>
                    <p className="card-text">Strength training is an excellent way to build muscle and take advantage of the extra calories you're eating in the long-term!</p>
                    <a href="https://www.muscleandfitness.com/workout-plan/workouts/workout-routines/complete-mf-beginners-training-guide-plan/" className="btn btn-primary">Workouts/Routines</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'gainWeightOverBMR':
        return (
          <div className="container">
            <div className="row">
              <h6 className="message">Your recent calorie tracking indicates that you are successfully sticking to your caloric surplus, which means you're gaining weight and meeting your weight goals! Great job, keep doing your thing! Here are some personalized recommendations to keep you on track!</h6>
              <br></br>
              <div className="col-lg-4 mb-2">
                <div className="card bg-light mb-3" style={{width: "18rem"}}>
                  <img src="../images/smoothie.jpg" className="card-img-top" alt="Smoothie"/>
                  <div className="card-body">
                    <h5 className="card-title">Nutrient-dense & high-calorie foods</h5>
                    <p className="card-text">Dirty eating isn't the only way to gain weight! Here are some great high-calorie and nutrient-dense options to keep you on track!</p>
                    <a href="https://www.predatornutrition.com/articlesdetail?cid=high-calorie-foods-for-bulking" className="btn btn-primary">High-Cal Healthy Foods</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-2">
                <div className="card bg-light mb-3" style={{width: "18rem"}}>
                  <img src="../images/time.jpg" className="card-img-top" alt="Time"/>
                  <div className="card-body">
                    <h5 className="card-title">Meal scheduling</h5>
                    <p className="card-text">Scheduling your meals throughout the day is a great way to stay on track and keep building your healthier relationship with food!</p>
                    <a href="https://www.health.state.mn.us/docs/people/wic/nutrition/english/genweightgain.pdf" className="btn btn-primary">Tips</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-2">
                <div className="card bg-light mb-3" style={{width: "18rem"}}>
                  <img src="../images/gym.jpg" className="card-img-top" alt="Weightlifting"/>
                  <div className="card-body">
                    <h5 className="card-title">Weightlifting</h5>
                    <p className="card-text">Strength training is an excellent way to keep building muscle and use all the extra energy from the food you're eating!</p>
                    <a href="https://www.puregym.com/blog/the-best-gym-workout-plan-for-gaining-muscle/" className="btn btn-primary">Gain Muscle Fast</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'maintainWeight':
        return (
          <div className="container">
            <div className="row">
              <h6 className="message">Your recent calorie tracking indicates that you're staying on track with your weight goals! Just remember to keep track of your calories and weight! Here are some personalized recommendations to help keep you on track!</h6>
              <br></br>
              <div className="col-lg-4 mb-2">
                <div className="card bg-light mb-3" style={{width: "18rem"}}>
                  <img src="../images/hiit.jpg" className="card-img-top" alt="HIIT Workout"/>
                  <div className="card-body">
                    <h5 className="card-title">15-minute HIIT</h5>
                    <p className="card-text">HIIT routines are a great way to get toned and delete body fat! Also, it provides tons of quick options that can be done anywhere!</p>
                    <a href="https://www.mensjournal.com/health-fitness/best-hiit-workouts" className="btn btn-primary">Examples</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-2">
                <div className="card bg-light mb-3" style={{width: "18rem"}}>
                  <img src="../images/running.jpg" className="card-img-top" alt="Running"/>
                  <div className="card-body">
                    <h5 className="card-title">Marathon Training</h5>
                    <p className="card-text">Getting into running on a daily basis is a great habit to be active and lose weight, and training for a marathon is an excellent long-term health goal!</p>
                    <a href="https://www.runnersworld.com/uk/training/marathon/a36969929/successful-marathon-training-rules/" className="btn btn-primary">Training Tips</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-2">
                <div className="card bg-light mb-3" style={{width: "18rem"}}>
                  <img src="../images/gym.jpg" className="card-img-top" alt="Weightlifting"/>
                  <div className="card-body">
                    <h5 className="card-title">Weightlifting</h5>
                    <p className="card-text">Strength training is an excellent way to build muscle and build a healthier lifestyle, even staying at the same body weight! Don't be afraid to lift some weight!</p>
                    <a href="https://www.muscleandfitness.com/workout-plan/workouts/workout-routines/complete-mf-beginners-training-guide-plan/" className="btn btn-primary">Workouts/Routines</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'missing':
        return <h4>Please fill in your goals and track your calories to get personalized recommendations, and make sure the server is running.</h4>;
      default:
        return <h4>Please fill in your goals and track your calories to get personalized recommendations, and make sure the server is running.</h4>;
    }
  };

  return (
    <div className="background-radial-gradient">
      <h2 id="subtitle">Health Overview</h2>
      <br></br>

      {/* Graph/Chart Section */}
      <div className="section-container progress-section">
        <h3 className="text-center">Recent Caloric Results</h3>
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

      {/* Activity and Meals Section */}
      <div className="section-container meals-section">
        <h3 className="text-center">Meal and Activity Overview</h3>
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
      </div>
      <br></br>

      {/* Cards Section */}
      <div className="section-container cards-section">
        <h3 className="text-center">Personalized Recommendations</h3>
        <br></br>
        {/* Call the render recommendations function to determine what to display */}
        {renderRecommendations()}
      </div>
      <br></br>

    </div>
  );
};

export default Overview;