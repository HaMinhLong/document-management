import * as actions from "./documentsTypes";

const documentsReducers = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_DOCUMENTS:
    case actions.FETCH_DOCUMENTS_BY_DEP:
    case actions.FETCH_DOCUMENTS_BY_ASSIGN:
    case actions.FETCH_DOCUMENT:
    case actions.COUNT_BY_TYPE:
    case actions.COUNT_BY_SENDER:
    case actions.COUNT_BY_DEP:
    case actions.COUNT_BY_STATUS:
      return action.payload;
    case actions.ADD_DOCUMENT:
      return [...state, action.payload];
    case actions.DELETE_DOCUMENT:
      return state.filter((document) => document.id !== action.payload);
    case actions.UPDATE_DOCUMENT:
      return state.map((document) =>
        document.id === action.payload.id ? action.payload : document
      );
    default:
      return state;
  }
};

export default documentsReducers;
