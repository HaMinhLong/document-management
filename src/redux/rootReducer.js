import { combineReducers } from "redux";

import employeesReducers from "./employees/employeesReducers";
import organizationalReducers from "./organizational-structure/organizationalReducers";
import usersReducers from "./users/usersReducers";
import groupsReducers from "./groups/groupsReducers";
import rightsReducers from "./rights/rightsReducers";
import groupRightsReducers from "./group-rights/groupRightsReducers";
import proccessReducers from "./proccess/proccessReducers";
import documentsReducers from "./documents/documentsReducers";
import assignedReducers from "./assigned/assignedReducers";
import rolesReducers from "./roles/rolesReducers";
import sendersReducers from "./sender/sendersReducers";
import docTypesReducers from "./docType/docTypesReducers";

const rootReducer = combineReducers({
  employees: employeesReducers,
  organizational: organizationalReducers,
  groups: groupsReducers,
  users: usersReducers,
  rights: rightsReducers,
  groupRights: groupRightsReducers,
  proccess: proccessReducers,
  documents: documentsReducers,
  assigned: assignedReducers,
  roles: rolesReducers,
  senders: sendersReducers,
  docTypes: docTypesReducers,
});

export default rootReducer;
