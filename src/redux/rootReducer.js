import { combineReducers } from "redux";

import employeesReducers from "./employees/employeesReducers";
import organizationalReducers from "./organizational-structure/organizationalReducers";
import usersReducers from "./users/usersReducers";
import groupsReducers from "./groups/groupsReducers";
import rightsReducers from "./rights/rightsReducers";
import groupRightsReducers from "./group-rights/groupRightsReducers";

const rootReducer = combineReducers({
  employees: employeesReducers,
  organizational: organizationalReducers,
  groups: groupsReducers,
  users: usersReducers,
  rights: rightsReducers,
  groupRights: groupRightsReducers,
});

export default rootReducer;
