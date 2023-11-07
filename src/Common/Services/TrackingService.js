import Parse from "parse";

// Create operation - new tracking entry
export const createTrackingEntry = (formData) => {

  // Destructure the values
  const { todaysDate, breakfastCals, lunchCals, dinnerCals, snacksCals, exerciseCals } = formData;
  
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
  
// GET operation - get all goals in Parse class TrackingEntry
export const getAllTrackingEntries = () => {
  const TrackingEntry = Parse.Object.extend("TrackingEntry");
  const query = new Parse.Query(TrackingEntry);
  return query.find().then((results) => {
      // returns array of TrackingEntry objects
      console.log(results)
      return results;
  });
};
  
// DELETE operation - remove TrackingEntry by ID
export const removeTrackingEntry = (id) => {
  const TrackingEntry = Parse.Object.extend("TrackingEntry");
  const query = new Parse.Query(TrackingEntry);
  return query.get(id).then((trackingentry) => {
      trackingentry.destroy();
  });
};