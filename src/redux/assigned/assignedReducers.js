import * as actions from "./assignedTypes";

const assignedReducers = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_ALL_ASSIGNED:
    case actions.FETCH_ASSIGNED:
      return action.payload;
    case actions.ADD_ASSIGNED:
      return [...state, action.payload];
    case actions.DELETE_ASSIGNED:
      return state.filter((assigned) => assigned.id !== action.payload);
    case actions.UPDATE_ASSIGNED:
      return state.map((assigned) =>
        assigned.id === action.payload.id ? action.payload : assigned
      );
    default:
      return state;
  }
};

export default assignedReducers;
