import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPremiumSignUp } from '../../Common/Services/PremiumService';
import PremiumChild from "./PremiumChild";


/* Premium MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
function Premium() {
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {

    // Initialize name and value
    const { name, value } = event.target;
    let updatedValue = value;

    if (name === 'cardNumber' || name === 'securityCode') {
      // Remove non-digit characters
      updatedValue = value.replace(/\D/g, '');
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: updatedValue
    }));
  };

  // Function to handle asynchronous data when a submit event occurs
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Parse the values
    const { name, cardNumber, expirationDate, securityCode } = formData;
    const cardNumberValue = parseInt(cardNumber);
    const securityCodeValue = parseInt(securityCode);

    // Validate the values
    if (!name || !cardNumberValue || cardNumberValue <= 0 || !securityCodeValue || securityCodeValue <= 0 || !/^(\d{4}-\d{2}-\d{2})$/.test(expirationDate)) {
      alert('Please provide valid input values.');
      return;
    }

    const expirationDateObj = new Date(expirationDate);

    // Now create the data object to be sent
    const signupData = {
      name,
      cardNumber: cardNumberValue,
      expirationDate: expirationDateObj,
      securityCode: securityCodeValue
    };

    try {

      // Create the signup using service function
      const response = await createPremiumSignUp(signupData);
      console.log('Premium SignUp created successfully:', response);
      alert('Premium SignUp created successfully!');
      // Use navigate with 0 to reload page and empty form
      navigate(0);
    } catch (error) {
      console.error('Error creating the premium signup:', error);
      alert('Error creating premium signup');
    }
  };

  return (
    <div>
      <br />
      <hr />
      <h3>Subscribe to FitSnap+ Premium</h3>
      <p>
        Please fill in this form to join the monthly subscription for our
        premium service!
      </p>

      <form id="form" onSubmit={handleSubmit}>
        <PremiumChild
          formData={formData}
          onChange={handleInputChange}
        />
        <button type="submit">
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default Premium;