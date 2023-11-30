import Parse from "parse";

// Create operation - new premium signup entry
export const createPremiumSignUp = (formData) => {

  // Destructure the values
  const { name, cardNumber, expirationDate, securityCode } = formData;
  
  console.log("Creating Premium SignUp:", PremiumSignUp);
  const PremiumSignUp = Parse.Object.extend("PremiumSignUp");
  const premiumsignup = new PremiumSignUp();
  
  // Using setter to UPDATE the object
  premiumsignup.set("name", name);
  premiumsignup.set("cardNumber", cardNumber);
  premiumsignup.set("expirationDate", expirationDate);
  premiumsignup.set("securityCode", securityCode);

  console.log("Saving form data to Parse:", formData);

  return premiumsignup.save().then((result) => {
    // Returns new PremiumSignUp object
    return result;
  });

};

// READ operation - get premium signup by ID
export const getById = (id) => {
  const PremiumSignUp = Parse.Object.extend("PremiumSignUp");
  const query = new Parse.Query(PremiumSignUp);
  return query.get(id).then((result) => {
    // return TrackingEntry object with objectId: id
    return result;
  });
};
  
  export let PremiumSignUps = {};
  PremiumSignUps.collection = [];
  
// GET operation - get all goals in Parse class PremiumSignUp
export const getAllPremiumSignUps = () => {
  const PremiumSignUp = Parse.Object.extend("PremiumSignUp");
  const query = new Parse.Query(PremiumSignUp);
  return query.find().then((results) => {
      // returns array of PremiumSignUp objects
      console.log(results)
      return results;
  });
};
  
// DELETE operation - remove PremiumSignUp by ID
export const removePremiumSignUp = (id) => {
  const PremiumSignUp = Parse.Object.extend("PremiumSignUp");
  const query = new Parse.Query(PremiumSignUp);
  return query.get(id).then((premiumsignup) => {
      premiumsignup.destroy();
  });
};