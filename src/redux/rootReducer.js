import { combineReducers } from "redux";

import employeesReducers from "./employees/employeesReducers";
import organizationalReducers from "./organizational-structure/organizationalReducers";

const rootReducer = combineReducers({
  employees: employeesReducers,
  organizational: organizationalReducers,
});

export default rootReducer;
