import * as actions from "./rolesTypes";
import { roles } from "../../data/roles.json";

export const fetchRoles = () => async (dispatch) => {
  try {
    const data = roles;
    dispatch({
      type: actions.FETCH_ROLES,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Roles: " + error.message);
  }
};

export const addRole = (role) => async (dispatch) => {
  try {
    roles.push(role);
    dispatch({
      type: actions.ADD_ROLE,
      payload: role,
    });
  } catch (error) {
    console.log("Error Add Role: " + error.message);
  }
};

export const deleteRole = (id) => async (dispatch) => {
  try {
    for (var i = 0; i < roles.length; i++) {
      if (roles[i].id === id) {
        roles.splice(i, 1);
      }
    }
    dispatch({
      type: actions.DELETE_ROLE,
      payload: id,
    });
  } catch (error) {
    console.log("Error Delete Role:" + error.message);
  }
};

export const updateRole = (role) => async (dispatch) => {
  try {
    for (var i = 0; i < roles.length; i++) {
      if (roles[i].id === role.id) {
        roles[i] = role;
      }
    }
    dispatch({
      type: actions.UPDATE_ROLE,
      payload: role,
    });
  } catch (error) {
    console.log("Error Update Role: " + error.message);
  }
};
