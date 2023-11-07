import React from 'react';

// Child function for premium signup component
function PremiumChild({ formData, onChange }) {
  return (
    <div>
      <h4>Payment Information</h4>

      {/* Form for users to subscribe to the premium service */}
      <div className="form-group">
        <label htmlFor="name"><b>Name on card: </b></label>
        <input
          type="text"
          placeholder="Name on card"
          name="name"
          id="name"
          onChange={onChange}
          required
        /><br />
      </div>
      <div className="form-group">
        <label htmlFor="card-number"><b>Card number: </b></label>
        <input
          type="number"
          placeholder="Card number"
          name="cardNumber"
          id="card-number"
          onChange={onChange}
          required
        /><br />
      </div>
      <div className="form-group">
        <label htmlFor="expiration-date"><b>Expiration date: </b></label>
        <input
          type="date"
          placeholder="Expiration date"
          name="expirationDate"
          id="expiration-date"
          onChange={onChange}
          required
        /><br />
      </div>
      <div className="form-group">
        <label htmlFor="security-code"><b>Security code: </b></label>
        <input
          type="number"
          placeholder="Security code"
          name="securityCode"
          id="security-code"
          onChange={onChange}
          required
        /><br />
      </div>
      <br />
    </div>
  );
}

export default PremiumChild;