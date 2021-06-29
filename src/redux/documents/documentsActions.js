import * as actions from "./documentsTypes";
import * as api from "../../api/index";

export const fetchAllDocuments = () => async (dispatch) => {
  try {
    const { data } = await api.fetchDocuments();
    dispatch({
      type: actions.FETCH_DOCUMENTS,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Documents: " + error.message);
  }
};

export const fetchDocumentsByDep = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchDocumentsByDep(id);
    dispatch({
      type: actions.FETCH_DOCUMENTS_BY_DEP,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Documents By Departments: " + error.message);
  }
};

export const fetchDocumentsByAssign = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchDocumentsByAssign(id);
    dispatch({
      type: actions.FETCH_DOCUMENTS_BY_ASSIGN,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Documents By Assign: " + error.message);
  }
};

export const fetchDocument = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchDocument(id);
    dispatch({
      type: actions.FETCH_DOCUMENT,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Document: " + error.message);
  }
};

export const addDocument = (document) => async (dispatch) => {
  try {
    const { data } = await api.createDocument(document);

    dispatch({
      type: actions.ADD_DOCUMENT,
      payload: data,
    });
  } catch (error) {
    console.log("Error Add Document: " + error.message);
  }
};

export const deleteDocument = (id) => async (dispatch) => {
  console.log(id);
  try {
    await api.deleteDocument(id);
    dispatch({
      type: actions.DELETE_DOCUMENT,
      payload: id,
    });
  } catch (error) {
    console.log("Error Delete Document:" + error.message);
  }
};

export const updateDocument = (document) => async (dispatch) => {
  try {
    await api.updateDocument(document.id, document);
    dispatch({
      type: actions.UPDATE_DOCUMENT,
      payload: document,
    });
  } catch (error) {
    console.log("Error Update Document: " + error.message);
  }
};

export const countByType = (date) => async (dispatch) => {
  try {
    const { data } = await api.countByType(date);
    dispatch({
      type: actions.COUNT_BY_TYPE,
      payload: data,
    });
  } catch (error) {
    console.log("Error Count By Type: " + error.message);
  }
};

export const countBySender = (date) => async (dispatch) => {
  try {
    const { data } = await api.countBySender(date);
    dispatch({
      type: actions.COUNT_BY_SENDER,
      payload: data,
    });
  } catch (error) {
    console.log("Error Count By Sender: " + error.message);
  }
};

export const countByDep = (date) => async (dispatch) => {
  try {
    const { data } = await api.countByDep(date);
    dispatch({
      type: actions.COUNT_BY_DEP,
      payload: data,
    });
  } catch (error) {
    console.log("Error Count By Dep: " + error.message);
  }
};

export const countByStatus = (date) => async (dispatch) => {
  try {
    const { data } = await api.countByStatus(date);
    dispatch({
      type: actions.COUNT_BY_STATUS,
      payload: data,
    });
  } catch (error) {
    console.log("Error Count By Status: " + error.message);
  }
};

export const changeStatus = (id, status) => async (dispatch) => {
  try {
    const document = {
      status: status,
    };
    await api.changeStatus(id, document);
    dispatch({
      type: actions.CHANGE_STATUS,
      payload: id,
    });
  } catch (error) {
    console.log("Error Change Status: " + error.message);
  }
};
