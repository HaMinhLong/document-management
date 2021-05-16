import { combineReducers } from "redux";

import employeesReducers from "./employees/employeesReducers";
import organizationalReducers from "./organizational-structure/organizationalReducers";
import rolesReducers from "./roles/rolesReducers";

const rootReducer = combineReducers({
  employees: employeesReducers,
  organizational: organizationalReducers,
  roles: rolesReducers,
});

export default rootReducer;
