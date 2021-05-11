import * as actions from "./organizationalTypes";

const organizationalReducers = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_ORGANIZATIONAL:
    case actions.FETCH_DEPARTMENTS:
      return action.payload;
    case actions.CREATE_DEPARTMENT:
      return [...state, action.payload];
    case actions.UPDATE_DEPARTMENT:
      return state.map((department) =>
        department.id === action.payload.id ? action.payload : department
      );
    case actions.DELETE_DEPARTMENT:
      return state.filter((department) => department.id !== action.payload);
    default:
      return state;
  }
};

export default organizationalReducers;
