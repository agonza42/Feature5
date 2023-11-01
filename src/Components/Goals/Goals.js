import React, { Component } from 'react';
import { createGoalForm } from '../../Common/Services/GoalsService.js';

// Import the child component
import GoalsChild from './GoalsChild';

// Import the CSS file
import '../../Style/Goals.css'; 

class Goals extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        height: '',
        weight: '',
        age: '',
        goal: '',
      },
    };

    // Binding event handlers to maintain the correct 'this' context
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Function to handle events that change the input
  handleInputChange(event) {
    // Logging into the console to make sure the form is getting the correct values
    console.log('Event Target:', event.target);
    console.log('Name:', event.target.name);
    console.log('Value:', event.target.value);

    const { name, value } = event.target;

    this.setState(prevState => ({
        formData: {
            ...prevState.formData,
            [name]: name === 'age' || name === 'height' || name === 'weight' ? parseFloat(value) : value
        }
    }), () => {
        console.log('Updated state:', this.state.formData);
    });
}

  // Function to handle asynchronous data when a submit event occurs
  async handleSubmit(event) {
    event.preventDefault();
    console.log("Submitting form data:", this.state.formData);
    
    // Parse the values
    const heightValue = parseFloat(this.state.formData.height);
    const weightValue = parseFloat(this.state.formData.weight);
    const ageValue = parseInt(this.state.formData.age);
    const goalValue = this.state.formData.goal;

    // Validate the values
    if (isNaN(heightValue) || isNaN(weightValue) || isNaN(ageValue) || !goalValue) {
      alert('Please provide valid input values.');
      return;
    }

    // Now create the data object to be sent
    const goalData = {
      height: heightValue,
      weight: weightValue,
      age: ageValue,
      goal: goalValue
    };

    try {
      // Create the goal using your service function
      const response = await createGoalForm(goalData);
      console.log('Goal created successfully:', response);

    } catch (error) {
      console.error('Error creating the goal:', error);
    }
  }

  // Using render for the component's HTML including form and button for user interaction
  render() {
    return (
      <div>
        <hr />
        <h3>Personalized Fitness Goal-Setting</h3>
        <p>
          Please enter your information and goals for us to provide personalized
          milestones and goals!
        </p>

        <form id="form" method="post" onSubmit={this.handleSubmit}>
          <GoalsChild
            formData={this.state.formData}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Goals;