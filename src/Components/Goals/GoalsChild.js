import React from 'react';

// Child function for the Goals component
function GoalChild({ formData, onChange }) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 offset-md-3">

          {/* Form for users to enter their personal information and health goals */}
          <div className="form-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Height (cm)"
              name="height"
              id="height"
              value={formData.height || ''}
              onChange={onChange}
              required
            />
          </div>
          
          <div className="form-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Weight (kg)"
              name="weight"
              id="weight"
              value={formData.weight || ''}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Age"
              name="age"
              id="age"
              value={formData.age || ''}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <select
              className="form-select"
              name="goal"
              id="goal"
              value={formData.goal || ''}
              onChange={onChange}
              required
            >
              <option value="">-- select an option --</option>
              <option value="lose">Lose weight</option>
              <option value="gain">Gain weight</option>
              <option value="maintain">Maintain weight</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalChild;