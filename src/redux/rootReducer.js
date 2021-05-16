import { combineReducers } from "redux";

import employeesReducers from "./employees/employeesReducers";
import organizationalReducers from "./organizational-structure/organizationalReducers";
import rolesReducers from "./roles/rolesReducers";
import usersReducers from "./users/usersReducers";

const rootReducer = combineReducers({
  employees: employeesReducers,
  organizational: organizationalReducers,
  roles: rolesReducers,
  users: usersReducers,
});

export default rootReducer;
