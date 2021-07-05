import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "../layouts/Navbar";
// import Footer from "./components/layout/Footer";
import NoMatch from "../pages/404";

import HomePage from "../pages/home/HomePage";

import Employees from "../pages/employees/Employees";
import EmployeeDetails from "../pages/employees/employee/EmployeeDetails";
import AddEmployee from "../components/Form/AddEmployee";

import Organizational from "../pages/organizational/Organizational";
import OrganizationalDetails from "../pages/organizational/OrganizationalDetails";

import AddDepartment from "../components/Form/AddDepartment";

import Groups from "../pages/groups/Groups";
import AddGroup from "../components/Form/AddGroup";
import GroupDetails from "../pages/groups/group/GroupDetails";

import About from "../pages/about/About";
import AboutWe from "../pages/about we/AboutWe";

import Users from "../pages/users/Users";
import AddUser from "../components/Form/AddUser";
import UserDetails from "../pages/users/user/UserDetails";

import Rights from "../pages/rights/Rights";
import AddRight from "../components/Form/AddRight";
import RightDetails from "../pages/rights/right/RightDetails";

import GroupRights from "../pages/group-rights/GroupRights";
import AddGroupRight from "../components/Form/AddGroupRight";
import GroupRightDetails from "../pages/group-rights/group-right/GroupRightDetails";

import AllProccess from "../pages/all-proccess/AllProccess";
import AddProccess from "../components/Form/AddProccess";
import ProccessDetails from "../pages/all-proccess/proccess/ProccessDetails";

import Documents from "../pages/documents/Documents";
import AddDocument from "../components/Form/AddDocument";
import DocumentDetails from "../pages/documents/document/DocumentDetails";

import AllAssigned from "../pages/all-assigned/AllAssigned";
import AddAssigned from "../components/Form/AddAssigned";
import AssignedDetails from "../pages/all-assigned/assigned/AssignedDetails";

import Senders from "../pages/senders/Senders";
import AddSender from "../components/Form/AddSender";

import DocTypes from "../pages/doc-types/DocTypes";
import AddDocType from "../components/Form/AddDocType";

import Statistical from "../pages/Statistical/Statistical";

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />

          {/* Employee management */}
          <Route exact path="/employees" component={Employees} />
          <Route exact path="/employees-w" component={Employees} />
          <Route exact path="/employees/:id" component={EmployeeDetails} />
          <Route exact path="/add-employee" component={AddEmployee} />
          <Route exact path="/add-employee-:id" component={AddEmployee} />

          {/* Organizational Structure Management */}
          <Route exact path="/organizational" component={Organizational} />
          <Route exact path="/organizational-w" component={Organizational} />
          <Route
            exacta
            path="/organizational/:id"
            component={OrganizationalDetails}
          />

          <Route exact path="/add-department" component={AddDepartment} />
          <Route exact path="/add-department-:id" component={AddDepartment} />

          <Route exact path="/group" component={Groups} />
          <Route exact path="/add-group" component={AddGroup} />
          <Route exact path="/add-group-:id" component={AddGroup} />
          <Route exact path="/group/:id" component={GroupDetails} />

          <Route exact path="/user" component={Users} />
          <Route exact path="/user-w" component={Users} />
          <Route exact path="/add-user" component={AddUser} />
          <Route exact path="/add-user-:id" component={AddUser} />
          <Route exact path="/users/:id" component={UserDetails} />

          <Route exact path="/right" component={Rights} />
          <Route exact path="/add-right" component={AddRight} />
          <Route exact path="/add-right-:id" component={AddRight} />
          <Route exact path="/right/:id" component={RightDetails} />

          <Route exact path="/group-right" component={GroupRights} />
          <Route exact path="/add-groupright" component={AddGroupRight} />
          <Route exact path="/add-groupright-:id" component={AddGroupRight} />
          <Route exact path="/group-right/:id" component={GroupRightDetails} />

          <Route exact path="/document-process" component={AllProccess} />
          <Route exact path="/add-proccess" component={AddProccess} />
          <Route exact path="/add-proccess-:id" component={AddProccess} />
          <Route exact path="/process/:id" component={ProccessDetails} />

          <Route exact path="/incoming-document" component={Documents} />
          <Route exact path="/incoming-document-w" component={Documents} />
          <Route exact path="/internal-document" component={Documents} />
          <Route exact path="/internal-document-w" component={Documents} />
          <Route exact path="/add-incoming-document" component={AddDocument} />
          <Route exact path="/add-internal-document" component={AddDocument} />
          <Route exact path="/add-document-:id" component={AddDocument} />
          <Route exact path="/document/:id" component={DocumentDetails} />

          <Route exact path="/assigned" component={AllAssigned} />
          <Route exact path="/assigned-w" component={AllAssigned} />
          <Route exact path="/add-assigned" component={AddAssigned} />
          <Route exact path="/add-assigned-:id" component={AddAssigned} />
          <Route exact path="/assigned/:id" component={AssignedDetails} />

          <Route exact path="/sender" component={Senders} />
          <Route exact path="/add-sender" component={AddSender} />
          <Route exact path="/add-sender-:id" component={AddSender} />
          {/* <Route exact path="/sender/:id" component={RightDetails} /> */}

          <Route exact path="/doc-type" component={DocTypes} />
          <Route exact path="/add-doc-type" component={AddDocType} />
          <Route exact path="/add-doc-type-:id" component={AddDocType} />

          <Route exact path="/statistical" component={Statistical} />

          <Route exact path="/about" component={About} />
          <Route exact path="/about-we" component={AboutWe} />

          <Route path="*" component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default Home;
