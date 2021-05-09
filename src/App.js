import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
import NoMatch from "./components/pages/404";

import HomePage from "./components/pages/home/HomePage";

import Employees from "./components/pages/employees/Employees";
import EmployeeDetails from "./components/pages/employees/employee/EmployeeDetails";
import AddEmployee from "./components/Form/AddEmployee";

import Organizational from "./components/pages/organizational/Organizational";
import OrganizationalDetails from "./components/pages/organizational/OrganizationalDetails";

import Departments from "./components/pages/organizational/departments/Departments";
import DepartmentDetails from "./components/pages/organizational/departments/DepartmentDetails";

import AffiliatedDepartment from "./components/pages/organizational/departments/affiliated-department/AffiliatedDepartment";
import AffiliatedDepartmentDetails from "./components/pages/organizational/departments/affiliated-department/AffiliatedDepartmentDetails";

import AddDepartment from "./components/Form/AddDepartment";

import About from "./components/pages/about/About";
import AboutWe from "./components/pages/about we/AboutWe";

const App = () => {
  return (
    <>
      <Router>
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
            exact
            path="/organizational/:id"
            component={OrganizationalDetails}
          />

          <Route exact path="/department-:id" component={Departments} />
          <Route
            exact
            path="/department-:id1/:id2"
            component={DepartmentDetails}
          />

          <Route
            exact
            path="/affiliated-department-:id1-:id2"
            component={AffiliatedDepartment}
          />
          <Route
            exact
            path="/affiliated-department-:id1-:id2/:id3"
            component={AffiliatedDepartmentDetails}
          />

          <Route exact path="/add-department" component={AddDepartment} />
          <Route
            exact
            path="/update-department-:id/:id1"
            component={AddDepartment}
          />
          <Route
            exact
            path="/update-department-:id/:id1/:id2"
            component={AddDepartment}
          />

          <Route exact path="/about" component={About} />
          <Route exact path="/about-we" component={AboutWe} />

          <Route path="*" component={NoMatch} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
