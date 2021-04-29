import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
import NoMatch from "./components/pages/404";

import Home from "./components/home/Home";

import Employees from "./components/employees/Employees";
import EmployeeInformation from "./components/employees/employee/EmployeeInformation";

import AddEmployee from "./components/employees/employee/AddEmployee";
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/employees" component={Employees} />
          <Route exact path="/employees/:id" component={EmployeeInformation} />
          <Route exact path="/add-employee" component={AddEmployee} />
          <Route exact path="/add-employee-:id" component={AddEmployee} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
