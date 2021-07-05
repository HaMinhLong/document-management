import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./routes/Home";
import Login from "./routes/Login";

const App = () => {
  const [checkLogin, setCheckLogin] = useState();
  const username = localStorage.getItem("username");
  useEffect(() => {
    setCheckLogin(username ? "login" : "notLogin");
  }, [username]);

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
