import * as actions from "./groupRightsTypes";

const groupRightsReducers = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_GROUP_RIGHTS:
    case actions.FETCH_GROUP_RIGHT:
      return action.payload;
    case actions.ADD_GROUP_RIGHT:
      return [...state, action.payload];
    case actions.DELETE_GROUP_RIGHT:
      return state.filter((groupRight) => groupRight.id !== action.payload);
    case actions.UPDATE_GROUP_RIGHT:
      return state.map((groupRight) =>
        groupRight.id === action.payload.id ? action.payload : groupRight
      );
    default:
      return state;
  }
};

export default groupRightsReducers;
