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

// NodeJS endpoint to get personalized recommendations
app.get('/personalized-recommendations', async (req, res) => {
    const userSessionToken = req.headers['x-parse-session-token'];

    // Validate if the session token is provided
    //if (!userSessionToken) {
    //    return res.status(401).send('Session token is required.');
    //}

    try {

        // Fetch user's goal using their session token
        const User = new Parse.Query(Parse.User);
        User.sessionToken = userSessionToken; // Set session token for authentication
        console.log("Session Token in Node:", userSessionToken); // Log the session token

        const currentUser = await User.first({ sessionToken: userSessionToken, useMasterKey: true });
        if (!currentUser) {
            return res.status(404).send('User not found.');
        }

        const userGoal = currentUser.get('goal');

        // Determine the recommendations based on the user's goal
        let recommendations;
        switch (userGoal) {
            case 'lose weight':
                recommendations = { /* personalized recommendations for losing weight */ };
                break;
            case 'gain weight':
                recommendations = { /* personalized recommendations for gaining weight */ };
                break;
            case 'maintain weight':
                recommendations = { /* personalized recommendations for maintaining weight */ };
                break;
            default:
                recommendations = { message: 'No goal set or unrecognized goal.' };
        }

        // Send the recommendations back to the client
        res.json(recommendations);
    } catch (error) {
        console.error('Error while fetching user goals: ', error);
        res.status(500).send('An error occurred while fetching personalized recommendations.');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}, the link is http://localhost:4000/personalized-recommendations`);
});