import * as actions from "./organizationalTypes";

const organizationalReducers = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_ORGANIZATIONAL_STRUCTURE:
      return action.payload;
    default:
      return state;
  }
};

export default organizationalReducers;
