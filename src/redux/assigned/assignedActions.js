import * as actions from "./assignedTypes";
import * as api from "../../api/index";

export const fetchAllAssigned = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllAssigned();
    dispatch({
      type: actions.FETCH_ALL_ASSIGNED,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch All Assigned: " + error.message);
  }
};

export const fetchAssigned = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchAssigned(id);
    dispatch({
      type: actions.FETCH_ASSIGNED,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Assigned: " + error.message);
  }
};

export const addAssigned = (assigned) => async (dispatch) => {
  try {
    const { data } = await api.createAssigned(assigned);

    dispatch({
      type: actions.ADD_ASSIGNED,
      payload: data,
    });
  } catch (error) {
    console.log("Error Add Assigned: " + error.message);
  }
};

export const deleteAssigned = (id) => async (dispatch) => {
  try {
    await api.deleteAssigned(id);
    dispatch({
      type: actions.DELETE_ASSIGNED,
      payload: id,
    });
  } catch (error) {
    console.log("Error Delete Assigned:" + error.message);
  }
};

export const updateAssigned = (assigned) => async (dispatch) => {
  try {
    await api.updateAssigned(assigned.id, assigned);
    dispatch({
      type: actions.UPDATE_ASSIGNED,
      payload: assigned,
    });
  } catch (error) {
    console.log("Error Update Assigned: " + error.message);
  }
};
