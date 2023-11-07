import React, { useState } from 'react';
import { createGoalForm } from '../../Common/Services/GoalsService';
import { useNavigate } from 'react-router-dom';

// Import the child component
import GoalsChild from './GoalsChild';

// Import the CSS file
import '../../Style/Goals.css';

function Goals() {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    goal: '',
  });

  // Initialize navigate
  const navigate = useNavigate();

  // Function to handle events that change the input
  const handleInputChange = (event) => {

    // Initializing name and value
    const { name, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'age' || name === 'height' || name === 'weight' ? parseFloat(value) : value,
    }));
  };

  // Function to handle asynchronous data when a submit event occurs
  const handleSubmit = async (event) => {

    event.preventDefault();
    
    // Get the formData and ensure proper variable types
    const { height, weight, age, goal } = formData;
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);
    const ageValue = parseInt(age);

    // Validate the values
    if (isNaN(heightValue) || isNaN(weightValue) || isNaN(ageValue) || !goal) {
      alert('Please provide valid input values.');
      return;
    }

    // Now create the data object to be sent
    const goalData = {
      height: heightValue,
      weight: weightValue,
      age: ageValue,
      goal
    };

    try {
      await createGoalForm(goalData);
      alert('Goal created successfully!');
      // Navigate with 0 to reload the page and empty the form
      navigate(0);
    } catch (error) {
      console.error('Error creating the goal:', error);
      alert('Error creating the goal.');
    }
  };

  return (
    <div>
      <hr />
      <h3>Personalized Fitness Goal-Setting</h3>
      <p>
        Please enter your information and goals for us to provide personalized
        milestones and goals!
      </p>

      <form id="form" method="post" onSubmit={handleSubmit}>
        <GoalsChild
          formData={formData}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Goals;