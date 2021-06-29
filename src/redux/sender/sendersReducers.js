import * as actions from "./sendersTypes";

const sendersReducers = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_SENDERS:
    case actions.FETCH_SENDER:
      return action.payload;
    case actions.ADD_SENDER:
      return [...state, action.payload];
    case actions.DELETE_SENDER:
      return state.filter((sender) => sender.id !== action.payload);
    case actions.UPDATE_SENDER:
      return state.map((sender) =>
        sender.id === action.payload.id ? action.payload : sender
      );
    default:
      return state;
  }
};

export default sendersReducers;
