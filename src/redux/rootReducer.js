import { combineReducers } from "redux";

import employeesReducers from "./employees/employeesReducers";

const rootReducer = combineReducers({
  employees: employeesReducers,
});

export default rootReducer;
