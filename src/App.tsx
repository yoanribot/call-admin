import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "components/Header";
import CallDetail from "components/CallDetail";
import CallList from "components/CallList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<CallList />} />
        <Route path="/call/:id" element={<CallDetail />} />
      </Routes>
    </div>
  );
}

export default App;
