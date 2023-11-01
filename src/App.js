import React from "react";
import Components from "./Components/Components.js";
import * as Env from "./environments";
import Parse from "parse";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route
} from "react-router-dom";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

//Before using the SDK...
Parse.setAsyncStorage(AsyncStorage);

function App() {
  return <Components />;
}

export default App;
