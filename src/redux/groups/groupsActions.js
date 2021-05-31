import * as actions from "./groupsTypes";
import * as api from "../../api/index";

export const fetchGroups = () => async (dispatch) => {
  try {
    const { data } = await api.fetchGroups();
    dispatch({
      type: actions.FETCH_GROUPS,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Groups: " + error.message);
  }
};

export const fetchGroup = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchGroup(id);
    dispatch({
      type: actions.FETCH_GROUP,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Group: " + error.message);
  }
};

export const addGroup = (group) => async (dispatch) => {
  try {
    const { data } = await api.createGroup(group);
    dispatch({
      type: actions.ADD_GROUP,
      payload: data,
    });
  } catch (error) {
    console.log("Error Add Group: " + error.message);
  }
};

export const deleteGroup = (id) => async (dispatch) => {
  try {
    await api.deleteGroup(id);
    dispatch({
      type: actions.DELETE_GROUP,
      payload: id,
    });
  } catch (error) {
    console.log("Error Delete Group:" + error.message);
  }
};

export const updateGroup = (group) => async (dispatch) => {
  try {
    await api.updateGroup(group.id, group);
    dispatch({
      type: actions.UPDATE_GROUP,
      payload: group,
    });
  } catch (error) {
    console.log("Error Update Group: " + error.message);
  }
};
