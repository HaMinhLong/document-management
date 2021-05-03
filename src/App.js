import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
import NoMatch from "./components/pages/404";

import HomePage from "./components/pages/home/HomePage";

import Employees from "./components/employees/Employees";
import EmployeeInformation from "./components/employees/employee/EmployeeInformation";
import AddEmployee from "./components/employees/employee/AddEmployee";

import OrganizationalStructure from "./components/organizational-structure/OrganizationalStructure";
import OrganizationalInformation from "./components/organizational-structure/OrganizationalInformation";

import Departments from "./components/organizational-structure/departments/Departments";
import DepartmentInformation from "./components/organizational-structure/departments/DepartmentInformation";

import AffiliatedDepartment from "./components/organizational-structure/departments/affiliated-department/AffiliatedDepartment";
import AffiliatedDepartmentInformation from "./components/organizational-structure/departments/affiliated-department/AffiliatedDepartmentInformation";

import AddDepartment from "./components/organizational-structure/AddDepartment";
import AddAffiliatedDepartment from "./components/organizational-structure/departments/affiliated-department/AddAffiliatedDepartment";

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
          <Route exact path="/employees/:id" component={EmployeeInformation} />
          <Route exact path="/add-employee" component={AddEmployee} />
          <Route exact path="/add-employee-:id" component={AddEmployee} />

          {/* Organizational Structure Management */}
          <Route
            exact
            path="/organizational-structure"
            component={OrganizationalStructure}
          />
          <Route
            exact
            path="/organizational-structure/:id"
            component={OrganizationalInformation}
          />

          <Route exact path="/department-:id" component={Departments} />
          <Route
            exact
            path="/department-:id1/:id2"
            component={DepartmentInformation}
          />

          <Route
            exact
            path="/affiliated-department-:id"
            component={AffiliatedDepartment}
          />
          <Route
            exact
            path="/affiliated-department-:id1/:id2"
            component={AffiliatedDepartmentInformation}
          />

          <Route exact path="/add-department" component={AddDepartment} />
          <Route exact path="/add-department-:id" component={AddDepartment} />
          <Route
            exact
            path="/add-affiliated-department"
            component={AddAffiliatedDepartment}
          />
          <Route
            exact
            path="/add-affiliated-department-:id"
            component={AddAffiliatedDepartment}
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
