import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/routers/Home";
import Login from "./components/routers/Login";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          {localStorage.getItem("status") ? (
            <Route path="/" render={() => <Home />} />
          ) : (
            <Route path="/" render={() => <Login />} />
          )}
        </Switch>
      </Router>
    </>
  );
};

export default App;
