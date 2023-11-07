import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTrackingEntry } from '../../Common/Services/TrackingService';
import TrackingChild from "./TrackingChild";

// Import the CSS file
import '../../Style/Tracking.css'; 

/* Tracking MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
function Tracking() {
  const [formData, setFormData] = useState({
    todaysDate: '',
    breakfastCals: '',
    lunchCals: '',
    dinnerCals: '',
    snacksCals: '',
    exerciseCals: '',
  });

  // Initialize navigate for routing
  const navigate = useNavigate();

  // Function to handle inputs in the form
  const handleInputChange = (event) => {

    // Initialize name and value
    const { name, value } = event.target;
    let processedValue = value;

    // Convert calorie inputs to floats for processing
    if (['breakfastCals', 'lunchCals', 'dinnerCals', 'snacksCals', 'exerciseCals'].includes(name)) {
      processedValue = value ? parseFloat(value) : '';
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: processedValue
    }));
  };

  // Function to handle asynchronous data when a submit event occurs
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Destructure values for convenience
    const {
      todaysDate,
      breakfastCals,
      lunchCals,
      dinnerCals,
      snacksCals,
      exerciseCals
    } = formData;

    const todaysDateObj = new Date(todaysDate);

    // Validation for all values
    if (!/^(\d{4}-\d{2}-\d{2})$/.test(todaysDate) || [breakfastCals, lunchCals, dinnerCals, snacksCals, exerciseCals].some(val => isNaN(val))) {
      alert('Please provide values for all fields.');
      return;
    }

    // Now create the data object to be sent
    const trackingEntryData = {
      todaysDate: todaysDateObj,
      breakfastCals,
      lunchCals,
      dinnerCals,
      snacksCals,
      exerciseCals
    };

    try {
      const response = await createTrackingEntry(trackingEntryData);
      console.log('Tracking entry created successfully:', response);
      alert('Tracking entry created successfully!');
      // Navigate with 0 to reload the page and empty the form
      navigate(0);
    } catch (error) {
      console.error('Error creating the tracking entry:', error);
      alert('Error creating the tracking entry');
    }
  };

  return (
    <div>
      <br />
      <hr />
      <h3>Daily Fitness Tracker</h3>
      <p>
        Please enter the calorie intake from your meals throughout the day, as
        well as the calories that you burned.
      </p>

      <form id="form" method="post" onSubmit={handleSubmit}>
        <TrackingChild
          formData={formData}
          onChange={handleInputChange}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Tracking;