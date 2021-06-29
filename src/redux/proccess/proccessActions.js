import * as actions from "./proccessTypes";
import * as api from "../../api/index";

export const fetchAllProccess = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllProccess();
    dispatch({
      type: actions.FETCH_ALL_PROCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch All Proccess: " + error.message);
  }
};

export const fetchProccess = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchProccess(id);
    dispatch({
      type: actions.FETCH_PROCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Proccess: " + error.message);
  }
};

export const addProccess = (proccess) => async (dispatch) => {
  try {
    const { data } = await api.createProccess(proccess);
    dispatch({
      type: actions.ADD_PROCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("Error Add Proccess: " + error.message);
  }
};

export const deleteProccess = (id) => async (dispatch) => {
  try {
    await api.deleteProccess(id);
    dispatch({
      type: actions.DELETE_PROCCESS,
      payload: id,
    });
  } catch (error) {
    console.log("Error Delete Proccess: " + error.message);
  }
};

export const updateProccess = (proccess) => async (dispatch) => {
  try {
    await api.updateProccess(proccess.id, proccess);
    dispatch({
      type: actions.UPDATE_PROCCESS,
      payload: proccess,
    });
  } catch (error) {
    console.log("Error Update Proccess: " + error.message);
  }
};
