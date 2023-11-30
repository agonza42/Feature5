import Parse from "parse";

// Create operation - new goal form
export const createGoalForm = (formData) => {

  // Destructure the values
  const { height, weight, age, goal, user} = formData;
  console.log(formData);
  
  console.log("Creating Goal:", Goal);
  const Goal = Parse.Object.extend("Goal");
  const goalform = new Goal();
  
  // Using setter to UPDATE the object
  goalform.set("height", height);
  goalform.set("weight", weight);
  goalform.set("age", age);
  goalform.set("goal", goal);
  goalform.set("user", user);

  console.log("Saving form data to Parse:", formData);

  return goalform.save().then((result) => {
    // Returns new GoalForm object
    return result;
  });

};


// READ operation - get goal by ID
export const getById = (id) => {
  const GoalForm = Parse.Object.extend("GoalForm");
  const query = new Parse.Query(GoalForm);
  return query.get(id).then((result) => {
    // return Goal object with objectId: id
    return result;
  });
};
  
  export let Goals = {};
  Goals.collection = [];
  
// GET operation - get all goals in Parse class Goal
export const getAllGoals = () => {
  const GoalForm = Parse.Object.extend("GoalForm");
  const query = new Parse.Query(GoalForm);
  return query.find().then((results) => {
      // returns array of Goal objects
      console.log(results)
      return results;
  });
};
  
// DELETE operation - remove goal by ID
export const removeGoal = (id) => {
  const GoalForm = Parse.Object.extend("GoalForm");
  const query = new Parse.Query(GoalForm);
  return query.get(id).then((goalform) => {
      goalform.destroy();
  });
};

// UPDATE operation - update existing form
export const updateGoalForm = (existingGoalData, newData) => {
  existingGoalData.set('height', newData.height); 
  existingGoalData.set('weight', newData.weight);
  existingGoalData.set('age', newData.age);
  existingGoalData.set('goal', newData.goal);

  return existingGoalData.save();
};

// FETCH the current user's goal
export const fetchUserGoal = (user) => {
  const Goal = Parse.Object.extend("Goal");
  const query = new Parse.Query(Goal);
  query.equalTo("user", user); // Assuming 'user' is the column name in 'Goal' class
  return query.first(); // Using first() as each user is expected to have at most one goal
};