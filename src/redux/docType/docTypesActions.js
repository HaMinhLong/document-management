import * as actions from "./docTypesTypes";
import * as api from "../../api/index";

export const fetchDocTypes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchDocTypes();
    dispatch({
      type: actions.FETCH_DOC_TYPES,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch DocTypes: " + error.message);
  }
};

export const fetchDocType = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchDocType(id);
    dispatch({
      type: actions.FETCH_DOC_TYPE,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch DocType: " + error.message);
  }
};

export const addDocType = (docType) => async (dispatch) => {
  try {
    const { data } = await api.createDocType(docType);
    dispatch({
      type: actions.ADD_DOC_TYPE,
      payload: data,
    });
  } catch (error) {
    console.log("Error Add DocType: " + error.message);
  }
};

export const deleteDocType = (id) => async (dispatch) => {
  try {
    await api.deleteDocType(id);
    dispatch({
      type: actions.DELETE_DOC_TYPE,
      payload: id,
    });
  } catch (error) {
    console.log("Error Delete DocType: " + error.message);
  }
};

export const updateDocType = (docType) => async (dispatch) => {
  try {
    await api.updateDocType(docType.id, docType);
    dispatch({
      type: actions.UPDATE_DOC_TYPE,
      payload: docType,
    });
  } catch (error) {
    console.log("Error Update DocType: " + error.message);
  }
};
