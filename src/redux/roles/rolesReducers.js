import * as actions from "./rolesTypes";

const rolesReducers = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_ROLES:
    case actions.FETCH_ROLE:
      return action.payload;
    case actions.ADD_ROLE:
      return [...state, action.payload];
    case actions.DELETE_ROLE:
      return state.filter((role) => role.roleId !== action.payload);
    case actions.UPDATE_ROLE:
      return state.map((role) =>
        role.roleId === action.payload.roleId ? action.payload : role
      );
    default:
      return state;
  }
};

export default rolesReducers;
