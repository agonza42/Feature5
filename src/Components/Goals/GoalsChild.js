import React from 'react';

// Child function for the Goals component
function GoalChild({ formData, onChange }) {
  return (
    <div>
      {/* Form for users to enter their personal information and goals */}
      <div>
        <h4>Personal Information</h4>

        <div className="form-group">
          <label htmlFor="height"><b>Height: </b></label>
          <input
            type="number"
            placeholder="Height"
            name="height"
            id="height"
            onChange={onChange}
            required
          /><br />
        </div>

        <div className="form-group">
          <label htmlFor="weight"><b>Weight: </b></label>
          <input
            type="number"
            placeholder="Weight"
            name="weight"
            id="weight"
            onChange={onChange}
            required
          /><br />
        </div>

        <div className="form-group">
          <label htmlFor="age"><b>Age: </b></label>
          <input
            type="number"
            placeholder="Age"
            name="age"
            id="age"
            onChange={onChange}
            required
          /><br />
        </div>

        <div className="form-group">
          <label htmlFor="goal"><b>Goal: </b></label>
          <select
            type="text"
            placeholder="Goal"
            name="goal"
            id="goal"
            onChange={onChange}
            value={formData.goal || ''}
            required
          >
            <option value> -- select an option -- </option>
            <option value="lose">Lose weight</option>
            <option value="gain">Gain weight</option>
            <option value="maintain">Maintain weight</option>
          </select>
        </div>
      </div>
      <br />
    </div>
  );
}

export default GoalChild;