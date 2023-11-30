import Parse from "parse";

// Create operation - new tracking entry
export const createTrackingEntry = (formData) => {

  // Destructure the values
  const { todaysDate, breakfastCals, lunchCals, dinnerCals, snacksCals, exerciseCals, user} = formData;
  
  console.log("Creating Goal:", TrackingEntry);
  const TrackingEntry = Parse.Object.extend("TrackingEntry");
  const trackingentry = new TrackingEntry();
  
  // Using setter to UPDATE the object
  trackingentry.set("todaysDate", todaysDate);
  trackingentry.set("breakfastCals", parseFloat(breakfastCals));
  trackingentry.set("lunchCals", parseFloat(lunchCals));
  trackingentry.set("dinnerCals", parseFloat(dinnerCals));
  trackingentry.set("snacksCals", parseFloat(snacksCals));
  trackingentry.set("exerciseCals", parseFloat(exerciseCals));
  trackingentry.set("user", user);

  console.log("Saving form data to Parse:", formData);

  return trackingentry.save().then((result) => {
    // Returns new TrackingEntry object
    return result;
  });

};

// READ operation - get tracking entry by ID
export const getById = (id) => {
  const TrackingEntry = Parse.Object.extend("TrackingEntry");
  const query = new Parse.Query(TrackingEntry);
  return query.get(id).then((result) => {
    // return TrackingEntry object with objectId: id
    return result;
  });
};
  
  export let TrackingEntries = {};
  TrackingEntries.collection = [];
  
// GET operation - get all tracking enteries in Parse class TrackingEntry
export const getAllTrackingEntries = (user) => {
  const TrackingEntry = Parse.Object.extend("TrackingEntry");
  const query = new Parse.Query(TrackingEntry);
  query.equalTo("user", user); // filter to current user 
  return query.find().then((results) => {
    // This logs and returns an array of TrackingEntry objects associated with the user
    console.log(results);
    return results;
  }).catch((error) => {
    console.error('Error while fetching tracking entries for user:', error);
    return Promise.reject(error);
  });
};

export const updateTrackingForm = (existingData, newData) => {
  var dateObject = new Date(newData.todaysDate);
  
  existingData.set("todaysDate", dateObject);
  existingData.set("breakfastCals", parseFloat(newData.breakfastCals));
  existingData.set("lunchCals", parseFloat(newData.lunchCals));
  existingData.set("dinnerCals", parseFloat(newData.dinnerCals));
  existingData.set("snacksCals", parseFloat(newData.snacksCals));
  existingData.set("exerciseCals", parseFloat(newData.exerciseCals));

  return existingData.save();
};
  
// DELETE operation - remove TrackingEntry by ID
export const deleteById = (id) => {
  const TrackingEntry = Parse.Object.extend("TrackingEntry");
  const query = new Parse.Query(TrackingEntry);
  return query.get(id).then((trackingentry) => {
      trackingentry.destroy();
  });
};