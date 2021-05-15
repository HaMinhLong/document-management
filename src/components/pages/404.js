import React, { Component } from "react";
import { withRouter } from "react-router";

export class NoMatch extends Component {
  render() {
    return (
      <section className="page-not-found">
        <h1>404 Page Not Found</h1>
        <p>
          Redirect to{" "}
          <span onClick={() => this.props.history.push("/")}>
            {localStorage.getItem("status") ? "Home Page" : "Login Page"}
          </span>
        </p>
        <img
          src="https://github.com/candraKriswinarto/form-validation/blob/main/src/assets/rocket.png?raw=true"
          alt=""
        />
      </section>
    );
  }
}

export default withRouter(NoMatch);
