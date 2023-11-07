import React, { Component } from 'react';
import { createTrackingEntry } from '../../Common/Services/TrackingService.js';
import TrackingChild from "./TrackingChild";

// Import the CSS file
import '../../Style/Tracking.css'; 

/* Tracking MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
class Tracking extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        todaysDate: '',
        breakfastCals: '',
        lunchCals: '',
        dinnerCals: '',
        snacksCals: '',
        exerciseCals: '',
      },
    };
    
    // Binding event handlers to maintain correct 'this' context
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

    let processedValue = value;

    if (name === 'breakfastCals' || name === 'lunchCals' || name === 'dinnerCals' || name === 'snacksCals' || name === 'exerciseCals') {
        processedValue = parseFloat(value);
    }

    this.setState(prevState => ({
        formData: {
            ...prevState.formData,
            [name]: processedValue
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
    const todaysDateValue = this.state.formData.todaysDate;
    const breakfastCalsValue = parseFloat(this.state.formData.breakfastCals);
    const lunchCalsValue = parseFloat(this.state.formData.lunchCals);
    const dinnerCalsValue = parseFloat(this.state.formData.dinnerCals);
    const snacksCalsValue = parseFloat(this.state.formData.snacksCals);
    const exerciseCalsValue = parseFloat(this.state.formData.exerciseCals);
    
    const todaysDateObj = new Date(todaysDateValue);

    // Simple validation for all values
    if (!/^(\d{4}-\d{2}-\d{2})$/.test(todaysDateValue) || isNaN(breakfastCalsValue) || isNaN(lunchCalsValue) || isNaN(dinnerCalsValue) || isNaN(snacksCalsValue) || isNaN(exerciseCalsValue)) {
      alert('Please provide values for all fields.');
      return;
    }

    const trackingEntryData = {
      todaysDate: todaysDateObj,
      breakfastCals: breakfastCalsValue,
      lunchCals: lunchCalsValue,
      dinnerCals: dinnerCalsValue,
      snacksCals: snacksCalsValue,
      exerciseCals: exerciseCalsValue
    };

    try {
      const response = await createTrackingEntry(trackingEntryData);
      console.log('Tracking entry created successfully:', response);
      alert('Tracking entry created successfully!')
    } catch (error) {
      console.error('Error creating the tracking entry:', error);
      alert('Error creating the tracking entry')
    }
  }

  // Using render for the component's HTML including form and button for user interaction
  render() {
    return (
      <div>
        <br />
        <hr />
        <h3>Daily Fitness Tracker</h3>
        <p>
          Please enter the calorie intake from your meals throughout the day, as
          well as the calories that you burned.
        </p>

        <form id="form" method="post" onSubmit={this.handleSubmit}>
          <TrackingChild
            formData={this.state.formData}
            onChange={this.handleInputChange}
          />
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Tracking;