import * as actions from "./rightsTypes";

const rightsReducers = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_RIGHTS:
    case actions.FETCH_RIGHT:
      return action.payload;
    case actions.ADD_RIGHT:
      return [...state, action.payload];
    case actions.DELETE_RIGHT:
      return state.filter((right) => right.id !== action.payload);
    case actions.UPDATE_RIGHT:
      return state.map((right) =>
        right.id === action.payload.id ? action.payload : right
      );
    default:
      return state;
  }
};

export default rightsReducers;
