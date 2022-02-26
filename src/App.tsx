import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import appEvents from "services/events";
import { Context as UserContext } from "context/user";
import { Context as CallsContext } from "context/calls";
import axios from "axios";

import Header from "components/Header";
import Footer from "components/Footer";
import CallDetail from "components/CallDetail";
import CallList from "components/CallList";
import "./App.css";

function App() {
  const { isAuth, logout } = useContext(UserContext);
  const { updateCurrentCall, updateCallList } = useContext(CallsContext);

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          console.log("axios.interceptors ERROR - 401 ... logout");
          logout();
        }
        return error;
      }
    );
  }, []);

  useEffect(() => {
    if (isAuth) {
      const eventsHandler = appEvents.getEventsHandler();
      const channel = eventsHandler.subscribe(
        process.env.REACT_APP_PUSHER_APP_CHANNEL as string
      );

      channel.bind("update-call", updateCurrentCall);
      channel.bind("update-call", updateCallList);
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
