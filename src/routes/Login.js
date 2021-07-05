import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Login from "../components/Form/Login";
import NoMatch from "../pages/404";

class LoginPage extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default LoginPage;
