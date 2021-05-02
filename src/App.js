import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
import NoMatch from "./components/pages/404";

import HomePage from "./components/pages/home/HomePage";

import Employees from "./components/employees/Employees";
import EmployeeInformation from "./components/employees/employee/EmployeeInformation";
import AddEmployee from "./components/employees/employee/AddEmployee";

import About from "./components/pages/about/About";
import AboutWe from "./components/pages/about we/AboutWe";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/employees" component={Employees} />
          <Route exact path="/employees/:id" component={EmployeeInformation} />
          <Route exact path="/add-employee" component={AddEmployee} />
          <Route exact path="/add-employee-:id" component={AddEmployee} />
          <Route exact path="/about" component={About} />
          <Route exact path="/about-we" component={AboutWe} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
