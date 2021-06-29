import * as actions from "./docTypesTypes";

const docTypesReducers = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_DOC_TYPES:
    case actions.FETCH_DOC_TYPE:
      return action.payload;
    case actions.ADD_DOC_TYPE:
      return [...state, action.payload];
    case actions.DELETE_DOC_TYPE:
      return state.filter((docType) => docType.id !== action.payload);
    case actions.UPDATE_DOC_TYPE:
      return state.map((docType) =>
        docType.id === action.payload.id ? action.payload : docType
      );
    default:
      return state;
  }
};

export default docTypesReducers;
