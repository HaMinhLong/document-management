import * as actions from "./employeesTypes";

const employeesReducers = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_EMPLOYEES:
      return action.payload;
    case actions.FETCH_EMPLOYEE:
      return action.payload;
    case actions.ADD_EMPLOYEE:
      return [...state, action.payload];
    case actions.DELETE_EMPLOYEE:
      return state.filter((employee) => employee.id !== action.payload);
    case actions.UPDATE_EMPLOYEE:
      return state.map((employee) =>
        employee.id === action.payload.id ? action.payload : employee
      );
    default:
      return state;
  }
};

export default employeesReducers;
