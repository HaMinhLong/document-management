import * as actions from "./groupsTypes";

const groupsReducers = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_GROUPS:
    case actions.FETCH_GROUP:
      return action.payload;
    case actions.ADD_GROUP:
      return [...state, action.payload];
    case actions.DELETE_GROUP:
      return state.filter((group) => group.id !== action.payload);
    case actions.UPDATE_GROUP:
      return state.map((group) =>
        group.id === action.payload.id ? action.payload : group
      );
    default:
      return state;
  }
};

export default groupsReducers;
