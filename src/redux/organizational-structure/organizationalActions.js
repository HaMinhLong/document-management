import * as actions from "./organizationalTypes";
import * as api from "../../api/index";

export const fetchOrganizational = () => async (dispatch) => {
  try {
    const { data } = await api.fetchOrganizational();
    dispatch({
      type: actions.FETCH_ORGANIZATIONAL,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Organizational Structure: " + error.message);
  }
};

export const fetchDepartments = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchDepartments(id);
    dispatch({
      type: actions.FETCH_DEPARTMENTS,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Departments: " + error.message);
  }
};

export const createDepartment = (department) => async (dispatch) => {
  try {
    api.createDepartment(department);
    dispatch({
      type: actions.CREATE_DEPARTMENT,
      payload: department,
    });
  } catch (error) {
    console.log("Error Create New Department: " + error.message);
  }
};

export const updateDepartment = (department) => async (dispatch) => {
  try {
    api.updateDepartment(department.id, department);
    dispatch({
      type: actions.UPDATE_DEPARTMENT,
      payload: department,
    });
  } catch (error) {
    console.log("Error Update Department: " + error.message);
  }
};

export const deleteDepartment = (id) => async (dispatch) => {
  try {
    api.deleteDepartment(id);
    dispatch({
      type: actions.DELETE_DEPARTMENT,
      payload: id,
    });
  } catch (error) {
    console.log("Error Delete Department: " + error.message);
  }
};
