import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "../layout/Navbar";
// import Footer from "./components/layout/Footer";
import NoMatch from "../pages/404";

import HomePage from "../pages/home/HomePage";

import Employees from "../pages/employees/Employees";
import EmployeeDetails from "../pages/employees/employee/EmployeeDetails";
import AddEmployee from "../Form/AddEmployee";

import Organizational from "../pages/organizational/Organizational";
import OrganizationalDetails from "../pages/organizational/OrganizationalDetails";

import AddDepartment from "../Form/AddDepartment";

import Roles from "../pages/roles/Roles";

import Users from "../pages/users/Users";

import About from "../pages/about/About";
import AboutWe from "../pages/about we/AboutWe";
import AddUser from "../Form/AddUser";
import AddRole from "../Form/AddRole";

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />

          {/* Employee management */}
          <Route exact path="/employees" component={Employees} />
          <Route exact path="/employees/:id" component={EmployeeDetails} />
          <Route exact path="/add-employee" component={AddEmployee} />
          <Route exact path="/add-employee-:id" component={AddEmployee} />

          {/* Organizational Structure Management */}
          <Route exact path="/organizational" component={Organizational} />
          <Route
            exacta
            path="/organizational/:id"
            component={OrganizationalDetails}
          />

          <Route exact path="/add-department" component={AddDepartment} />
          <Route exact path="/add-department-:id" component={AddDepartment} />

          <Route exact path="/role" component={Roles} />
          <Route exact path="/add-role" component={AddRole} />

          <Route exact path="/user" component={Users} />
          <Route exact path="/add-user" component={AddUser} />

          <Route exact path="/about" component={About} />
          <Route exact path="/about-we" component={AboutWe} />

          <Route path="*" component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default Home;
