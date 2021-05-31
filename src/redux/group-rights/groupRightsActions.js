import * as actions from "./groupRightsTypes";
import * as api from "../../api/index";

export const fetchGroupRights = () => async (dispatch) => {
  try {
    const { data } = await api.fetchGroupRights();
    dispatch({
      type: actions.FETCH_GROUP_RIGHTS,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Group Rights: " + error.message);
  }
};

export const fetchGroupRight = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchGroupRight(id);
    dispatch({
      type: actions.FETCH_GROUP_RIGHT,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Group Right: " + error.message);
  }
};

export const addGroupRight = (groupRight) => async (dispatch) => {
  try {
    const { data } = await api.createGroupRight(groupRight);
    dispatch({
      type: actions.ADD_GROUP_RIGHT,
      payload: data,
    });
  } catch (error) {
    console.log("Error Add Group Right: " + error.message);
  }
};

export const deleteGroupRight = (id) => async (dispatch) => {
  try {
    await api.deleteGroupRight(id);
    dispatch({
      type: actions.DELETE_GROUP_RIGHT,
      payload: id,
    });
  } catch (error) {
    console.log("Error Delete Group Right:" + error.message);
  }
};

export const updateGroupRight = (groupRight) => async (dispatch) => {
  try {
    await api.updateGroupRight(groupRight.id, groupRight);
    dispatch({
      type: actions.UPDATE_GROUP_RIGHT,
      payload: groupRight,
    });
  } catch (error) {
    console.log("Error Update Group Right: " + error.message);
  }
};
