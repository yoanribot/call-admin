import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import appEvents from "services/events";
import { Context as UserContext } from "context/user";
import axios from "axios";

import Header from "components/Header";
import Footer from "components/Footer";
import CallDetail from "components/CallDetail";
import CallList from "components/CallList";
import "./App.css";

function App() {
  const { isAuth, logout } = useContext(UserContext);

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log("axios.interceptors ERROR ...");
        if (error.response.status === 401) {
          logout();
        }
        return error;
      }
    );
  }, []);

  useEffect(() => {
    if (isAuth) {
      appEvents.getEventsHandler();
      appEvents.subscribe(process.env.REACT_APP_PUSHER_APP_CHANNEL as string);
    }

    return () => {
      appEvents.unsubscribe(process.env.REACT_APP_PUSHER_APP_CHANNEL as string);
    };
  }, [isAuth]);

  return (
    <div className="App">
      <Header />
      <div className="app-content">
        {isAuth && (
          <Routes>
            <Route path="/" element={<CallList />} />
            <Route path="/call/:id" element={<CallDetail />} />
          </Routes>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
