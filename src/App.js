import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/routers/Home";
import Login from "./components/routers/Login";

const App = () => {
  const [checkLogin, setCheckLogin] = useState();
  useEffect(() => {
    setCheckLogin(localStorage.getItem("username") ? "login" : "notLogin");
  });

  return (
    <>
      <Router>
        <Switch>
          {checkLogin === "login" ? (
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
