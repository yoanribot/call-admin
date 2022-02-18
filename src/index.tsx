import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider as UserProvider } from "./context/user";
import { Provider as CallsProvider } from "./context/calls";
import constants from "App-constants";
import axios from "axios";

axios.defaults.baseURL = "https://frontend-test-api.aircall.io";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <CallsProvider>
          <App />
        </CallsProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
