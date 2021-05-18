import * as actions from "./usersTypes";

const usersReducers = (state = [], action) => {
  switch (action.type) {
    case actions.LOGIN:
    case actions.FETCH_USERS:
    case actions.FETCH_USER:
    case actions.FETCH_AVAILABLE_USER:
      return action.payload;
    case actions.ADD_USER:
      return action.payload;
    case actions.DELETE_USER:
      return state.filter((user) => user.username !== action.payload);
    case actions.UPDATE_USER:
      return state.map((user) =>
        user.username === action.payload ? action.payload : user
      );
    default:
      return state;
  }
};

export default usersReducers;
