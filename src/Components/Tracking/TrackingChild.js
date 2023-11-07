import React from 'react';

// Import the CSS file
import '../../Style/Tracking.css'; 

// Child function for tracking component
function TrackingChild({ formData, onChange }) {
  return (
    <div>
      <div>
        <br />
        {/* Form for users to track their calorie intake and what they burned*/}
        <div className="form-group">
          <label htmlFor="todaysDate"><b>Current date: </b></label>
          <input
            type="date"
            placeholder="Today's date"
            name="todaysDate"
            id="todaysDate"
            onChange={onChange}
            required
          />
        </div>
        <br />

        <h4>Calories eaten</h4>

        <h5>Breakfast</h5>

        <div className="form-group">
          <label htmlFor="breakfastCals"><b>Calories: </b></label>
          <input
            type="number"
            placeholder="Breakfast calories"
            name="breakfastCals"
            id="breakfastCals"
            onChange={onChange}
            required
          /><br />
        </div>

        <h5>Lunch</h5>
        <div className="form-group">
          <label htmlFor="lunchCals"><b>Calories: </b></label>
          <input
            type="number"
            placeholder="Lunch calories"
            name="lunchCals"
            id="lunchCals"
            onChange={onChange}
            required
          /><br />
        </div>

        <h5>Dinner</h5>
        <div className="form-group">
          <label htmlFor="dinnerCals"><b>Calories: </b></label>
          <input
            type="number"
            placeholder="Dinner calories"
            name="dinnerCals"
            id="dinnerCals"
            onChange={onChange}
            required
          /><br />
        </div>

        <h5>Snacks</h5>
        <div className="form-group">
          <label htmlFor="snacksCals"><b>Calories: </b></label>
          <input
            type="number"
            placeholder="Snacks calories"
            name="snacksCals"
            id="snacksCals"
            onChange={onChange}
            required
          /><br />
        </div>

        <br />
        <h4>Calories burned</h4>

        <h5>Exercise</h5>
        <div className="form-group">
          <label htmlFor="exerciseCals"><b>Calories: </b></label>
          <input
            type="number"
            placeholder="Exercise calories"
            name="exerciseCals"
            id="exerciseCals"
            onChange={onChange}
            required
          /><br />
        </div>
      </div>
      <br />
    </div>
  );
}

export default TrackingChild;