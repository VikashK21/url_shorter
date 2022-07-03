// eslint-disable-next-line
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";

function Routers() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default Routers;
