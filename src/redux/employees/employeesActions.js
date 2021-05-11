import * as actions from "./employeesTypes";
import data from "../../data/employees.json";
import * as api from "../../api/index";

export const fetchEmployees = () => async (dispatch) => {
  try {
    const { data } = await api.fetchEmployees();
    dispatch({
      type: actions.FETCH_EMPLOYEES,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Employees: " + error.message);
  }
};

export const fetchEmployee = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchEmployee(id);
    dispatch({
      type: actions.FETCH_EMPLOYEE,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Employee: " + error.message);
  }
};

export const addEmployee = (employee) => async (dispatch) => {
  try {
    await api.createEmployee(employee.departmentId, employee);
    dispatch({
      type: actions.ADD_EMPLOYEE,
      payload: employee,
    });
  } catch (error) {
    console.log("Error Add Employee: " + error.message);
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    await api.deleteEmployee(id);
    dispatch({
      type: actions.DELETE_EMPLOYEE,
      payload: id,
    });
  } catch (error) {
    console.log("Error Delete Employee: " + error.message);
  }
};

export const updateEmployee = (employee) => async (dispatch) => {
  try {
    await api.updateEmployee(employee.id, employee);
    dispatch({
      type: actions.UPDATE_EMPLOYEE,
      payload: employee,
    });
  } catch (error) {
    console.log("Error Update Employee: " + error.message);
  }
};
