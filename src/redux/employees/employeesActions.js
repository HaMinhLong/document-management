import * as actions from "./employeesTypes";
import data from "../../data/employees.json";

export const fetchEmployees = () => async (dispatch) => {
  try {
    const { employees } = data;
    dispatch({
      type: actions.FETCH_EMPLOYEES,
      payload: employees,
    });
  } catch (error) {
    console.log("Error Fetch Employees: " + error.message);
  }
};

export const fetchEmployee = (id) => async (dispatch) => {
  try {
    const employee = data.employees.filter((employee) => employee.id === id);
    dispatch({
      type: actions.FETCH_EMPLOYEE,
      payload: employee,
    });
  } catch (error) {
    console.log("Error Fetch Employee: " + error.message);
  }
};

export const addEmployee = (employee) => async (dispatch) => {
  try {
    data.employees.push(employee);
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
    for (var i = 0; i < data.employees.length; i++) {
      if (data.employees[i].id === id) {
        data.employees.splice(i, 1);
      }
    }
    dispatch({
      type: actions.DELETE_EMPLOYEE,
      payload: id,
    });
  } catch (error) {
    console.log("Error Delete Employee: " + error.message);
  }
};

export const updateEmployee = (employee) => (dispatch) => {
  try {
    for (var i = 0; i < data.employees.length; i++) {
      if (data.employees[i].id === employee.id) {
        data.employees[i] = employee;
      }
    }
    dispatch({
      type: actions.UPDATE_EMPLOYEE,
      payload: employee,
    });
  } catch (error) {
    console.log("Error Update Employee: " + error.message);
  }
};
