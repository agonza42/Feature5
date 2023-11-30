// This will be the child component of the Overview component, which will take in data from the other components

import React from 'react';

// Child function for the Overview component
function OverviewChild({ formData, onChange }) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 offset-md-3">

          {/* Form for users to enter their personal information and health goals */}
          <div className="form-group mb-3">
            <table id="entriesTable">
            <thead>
                <tr>
                <th>Date</th>
                <th>Breakfast Calories</th>
                <th>Lunch Calories</th>
                <th>Dinner Calories</th>
                <th>Snacks Calories</th>
                <th>Exercise Calories</th>
                </tr>
            </thead>
            <tbody>
                {/* <!-- Data rows will be inserted here --> */}
            </tbody>
        </table>
        
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewChild;