import React, { useState } from 'react';
import { createGoalForm, updateGoalForm, fetchUserGoal } from '../../Common/Services/GoalsService';
import { useNavigate } from 'react-router-dom';
import Parse from "parse";


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

    // Current user info
    const currentUser = Parse.User.current();
    
    if (!currentUser) {
      alert('No user is authenticated.');
      return;
    }

    // Create Data object to be sent
    const goalData = {
      height: heightValue,
      weight: weightValue,
      age: ageValue,
      goal: goal, 
      user: currentUser
    };

    try {
      const existingGoalData = await fetchUserGoal(currentUser);
      if (existingGoalData) {
        // If existing goal, update it
        await updateGoalForm(existingGoalData, goalData);
        alert('Goal updated successfully!');
      } else {
        // If no existing goal, create new
        await createGoalForm(goalData);
        alert('Goal created successfully!');
      }
      navigate(0);
    } catch (error) {
      console.error('Error in goal operation:', error);
      alert('Error in goal operation.');
    }
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card bg-glass">
              <div className="card-body p-5">
                <h3 className="text-center">Personalized Fitness Goal-Setting</h3>
                <p className="text-center">
                  Please enter your information and goals for us to provide personalized
                  milestones and goals!
                </p>
                <form onSubmit={handleSubmit} className="text-center">
                  <GoalsChild
                    formData={formData}
                    onChange={handleInputChange}
                  />
                  <button type="submit" className="btn btn-primary mt-4">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Goals;