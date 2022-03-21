import React from "react";
import Naivebar from "./Components/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Naivebar />
    </Router>
  );
};

export default App;
