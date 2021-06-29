import * as actions from "./proccessTypes";

const proccessReducers = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_ALL_PROCCESS:
    case actions.FETCH_PROCCESS:
      return action.payload;
    case actions.ADD_PROCCESS:
      return [...state, action.payload];
    case actions.DELETE_PROCCESS:
      return state.filter((proccess) => proccess.id !== action.payload);
    case actions.UPDATE_PROCCESS:
      return state.map((proccess) =>
        proccess.id === action.payload.id ? action.payload : proccess
      );
    default:
      return state;
  }
};

export default proccessReducers;
