import * as actions from "./rolesTypes";
import * as api from "../../api/index";

export const fetchRoles = () => async (dispatch) => {
  try {
    const { data } = await api.fetchRoles();
    dispatch({
      type: actions.FETCH_ROLES,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Roles: " + error.message);
  }
};

export const fetchRole = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchRole(id);
    dispatch({
      type: actions.FETCH_ROLE,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Role: " + error.message);
  }
};

export const addRole = (role) => async (dispatch) => {
  try {
    const { data } = await api.createRole(role);
    dispatch({
      type: actions.ADD_ROLE,
      payload: data,
    });
  } catch (error) {
    console.log("Error Add Role: " + error.message);
  }
};

export const deleteRole = (id) => async (dispatch) => {
  try {
    await api.deleteRole(id);
    dispatch({
      type: actions.DELETE_ROLE,
      payload: id,
    });
  } catch (error) {
    console.log("Error Delete Role: " + error.message);
  }
};

export const updateRole = (role) => async (dispatch) => {
  try {
    await api.updateRole(role.id, role);
    dispatch({
      type: actions.UPDATE_ROLE,
      payload: role,
    });
  } catch (error) {
    console.log("Error Update Role: " + error.message);
  }
};
