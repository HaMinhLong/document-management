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
import RoleDetails from "../pages/roles/role/RoleDetails";

import Users from "../pages/users/Users";

import About from "../pages/about/About";
import AboutWe from "../pages/about we/AboutWe";

import AddUser from "../Form/AddUser";
import UserDetails from "../pages/users/user/UserDetails";

import AddRole from "../Form/AddRole";

class Home extends Component {
  render() {
    const roleId = localStorage.getItem("status");
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />

          {/* Employee management */}
          <Route exact path="/employees" component={Employees} />
          <Route exact path="/employees/:id" component={EmployeeDetails} />
          <Route
            exact
            path="/add-employee"
            component={
              roleId === "89" || roleId === "1" ? AddEmployee : NoMatch
            }
          />
          <Route exact path="/add-employee-:id" component={AddEmployee} />

          {/* Organizational Structure Management */}
          <Route exact path="/organizational" component={Organizational} />
          <Route
            exacta
            path="/organizational/:id"
            component={OrganizationalDetails}
          />

          <Route
            exact
            path="/add-department"
            component={roleId === "89" ? AddDepartment : NoMatch}
          />
          <Route
            exact
            path="/add-department-:id"
            component={roleId === "89" ? AddDepartment : NoMatch}
          />

          <Route
            exact
            path="/role"
            component={roleId === "89" ? Roles : NoMatch}
          />
          <Route
            exact
            path="/add-role"
            component={roleId === "89" ? AddRole : NoMatch}
          />
          <Route
            exact
            path="/add-role-:id"
            component={roleId === "89" ? AddRole : NoMatch}
          />
          <Route
            exact
            path="/roles/:id"
            component={roleId === "89" ? RoleDetails : NoMatch}
          />

          <Route
            exact
            path="/user"
            component={roleId === "89" ? Users : NoMatch}
          />
          <Route
            exact
            path="/add-user"
            component={roleId === "89" ? AddUser : NoMatch}
          />
          <Route
            exact
            path="/add-user-:id"
            component={roleId === "89" ? AddUser : NoMatch}
          />
          <Route
            exact
            path="/users/:id"
            component={roleId === "89" ? UserDetails : NoMatch}
          />

          <Route exact path="/about" component={About} />
          <Route exact path="/about-we" component={AboutWe} />

          <Route path="*" component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default Home;
