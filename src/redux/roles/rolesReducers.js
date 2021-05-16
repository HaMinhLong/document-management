import * as actions from "./rolesTypes";

const rolesReducers = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_ROLES:
      return action.payload;
    case actions.ADD_ROLE:
      return [...state, action.payload];
    case actions.DELETE_ROLE:
      return state.filter((role) => role.id !== action.payload);
    case actions.UPDATE_ROLE:
      return state.map((role) =>
        role.id === action.payload.id ? action.payload : role
      );
    default:
      return state;
  }
};

export default rolesReducers;
