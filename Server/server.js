const Env = require('./environments');

const express = require('express');
const Parse = require('parse/node');
const cors = require('cors');

// Configure the Parse SDK with your Back4App credentials
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY, Env.MASTER_KEY);
Parse.serverURL = Env.SERVER_URL;

const app = express();
app.use(express.json());
app.use(cors());

// Port at which the server will run
const port = 4000;

// Function to calculate BMR
const calculateBMR = (weight, height, age, gender) => {

    // Check for invalid inputs
    if (isNaN(weight) || isNaN(height) || isNaN(age) || !gender) {
      console.error('Invalid input for BMR calculation');
      return NaN;
    }
  
    // BMR formulas based on gender
    if (gender === 'male') {
      // BMR for men
      return 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
    } else {
      // BMR for women
      return 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
    }

};

// NodeJS endpoint to get personalized recommendations
app.get('/personalized-recommendations', async (req, res) => {
    const sessionToken = req.headers['x-parse-session-token'];

    try {

        // Fetch the session object using the session token
        const sessionQuery = new Parse.Query(Parse.Session);
        const session = await sessionQuery.equalTo("sessionToken", sessionToken).first({ useMasterKey: true });
        if (!session) {
            return res.status(404).send('Session not found.');
        }

        // Get the user from the session
        const currentUser = session.get('user');
        if (!currentUser) {
            return res.status(404).send('User not found.');
        }
        //console.log("User: ", currentUser);
        //console.log("Token: ", session);

        // Query for the user's goal
        const Goal = Parse.Object.extend("Goal");
        const goalQuery = new Parse.Query(Goal);
        goalQuery.equalTo("user", currentUser);
        const userGoalObject = await goalQuery.first({ sessionToken: sessionToken });

        // Check if a goal exists
        if (!userGoalObject) {
            return res.status(404).send('Goal not found for user.');
        }
        const userGoal = userGoalObject.get('goal');
        //console.log("Goal: ", userGoal);

        // Query for the user's tracking entries
        const TrackingEntry = Parse.Object.extend("TrackingEntry");
        const trackingQuery = new Parse.Query(TrackingEntry);
        trackingQuery.equalTo("user", currentUser);
        const trackingEntries = await trackingQuery.find({ sessionToken: sessionToken });
        //console.log("Entries: ", trackingEntries);

        if (trackingEntries.length === 0) {
            return res.status(404).send('No tracking entries found for user.');
        }

        // Calculate averages and BMR
        let totalCalories = 0;
        trackingEntries.forEach((entry) => {
            const foodCalories = entry.get('breakfastCals') + entry.get('lunchCals') + entry.get('dinnerCals') + entry.get('snacksCals');
            const exerciseCalories = entry.get('exerciseCals');
            totalCalories += (foodCalories - exerciseCalories);
        });
        const averageCalories = trackingEntries.length > 0 ? totalCalories / trackingEntries.length : 0;

        const userGender = userGoalObject.get('gender');
        const userWeight = userGoalObject.get('weight');
        const userHeight = userGoalObject.get('height');
        const userAge = userGoalObject.get('age');

        //console.log(`Weight: ${userWeight}, Height: ${userHeight}, Age: ${userAge}, Gender: ${userGender}`);

        const bmr = calculateBMR(Number(userWeight), Number(userHeight), Number(userAge), userGender);
    

        //console.log("BMR: ", bmr);
        //console.log("Cals: ", averageCalories);

        // Compare BMR with average calories to determine the case
        let caseResult;
        if (userGoal === 'lose' && averageCalories < bmr) {
            caseResult = 'loseWeightUnderBMR';
        } else if (userGoal === 'lose' && averageCalories > bmr) {
            caseResult = 'loseWeightOverBMR';
        } else if (userGoal === 'gain' && averageCalories < bmr) {
            caseResult = 'gainWeightUnderBMR';
        } else if (userGoal === 'gain' && averageCalories > bmr) {
            caseResult = 'gainWeightOverBMR';
        } else if (userGoal === 'maintain') {
            caseResult = 'maintainWeight';
        }
        else {
            caseResult = 'missing';
        }
        //console.log("Case: ", caseResult);

        // Send the recommendations back to the client
        res.json({ case: caseResult, bmr, averageCalories });
        
    } catch (error) {
        console.error('Error while fetching user goals: ', error);
        res.status(500).send('An error occurred while processing data.');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}, the link is http://localhost:4000/personalized-recommendations`);
});