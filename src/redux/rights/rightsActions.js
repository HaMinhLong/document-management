import * as actions from "./rightsTypes";
import * as api from "../../api/index";

export const fetchRights = () => async (dispatch) => {
  try {
    const { data } = await api.fetchRights();
    dispatch({
      type: actions.FETCH_RIGHTS,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Rights: " + error.message);
  }
};

export const fetchRight = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchRight(id);
    dispatch({
      type: actions.FETCH_RIGHT,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Right: " + error.message);
  }
};

export const addRight = (right) => async (dispatch) => {
  try {
    const { data } = await api.createRight(right);
    dispatch({
      type: actions.ADD_RIGHT,
      payload: data,
    });
  } catch (error) {
    console.log("Error Add Right: " + error.message);
  }
};

export const deleteRight = (id) => async (dispatch) => {
  try {
    await api.deleteRight(id);
    dispatch({
      type: actions.DELETE_RIGHT,
      payload: id,
    });
  } catch (error) {
    console.log("Error Delete Right: " + error.message);
  }
};

export const updateRight = (right) => async (dispatch) => {
  try {
    await api.updateRight(right.id, right);
    dispatch({
      type: actions.UPDATE_RIGHT,
      payload: right,
    });
  } catch (error) {
    console.log("Error Update Right: " + error.message);
  }
};
