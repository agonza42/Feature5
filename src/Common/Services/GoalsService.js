import Parse from "parse";

// Create operation - new goal form
export const createGoalForm = (formData) => {

    const { height, weight, age, goal } = formData; // Destructure the values
    
    console.log("Creating Goal:", GoalForm);
    const GoalForm = Parse.Object.extend("GoalForm");
    const goalform = new GoalForm();
    
    // Using setter to UPDATE the object
    goalform.set("height", height);
    goalform.set("weight", weight);
    goalform.set("age", age);
    goalform.set("goal", goal);

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
  
  // READ operation - get all goals in Parse class Goal
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