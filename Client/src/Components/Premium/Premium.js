import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPremiumSignUp } from '../../Common/Services/PremiumService';
import PremiumChild from "./PremiumChild";

// Import the CSS file
import '../../Style/Premium.css';

/* Premium MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
function Premium() {
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
  });

  // Initialize navigate for routing
  const navigate = useNavigate();

  // Function to handle inputs in the form
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
    <section className="background-radial-gradient overflow-hidden">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card bg-glass">
              <div className="card-body p-5">
                <h3 className="text-center">Subscribe to FitSnap+ Premium</h3>
                <p className="text-center">
                  Please fill in this form to join the monthly subscription for our premium service!
                </p>
                <form onSubmit={handleSubmit} className="text-center">
                  <PremiumChild
                    formData={formData}
                    onChange={handleInputChange}
                  />
                  <button type="submit" className="btn btn-primary mt-4">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Premium;