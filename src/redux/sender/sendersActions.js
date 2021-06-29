import * as actions from "./sendersTypes";
import * as api from "../../api/index";

export const fetchSenders = () => async (dispatch) => {
  try {
    const { data } = await api.fetchSenders();
    dispatch({
      type: actions.FETCH_SENDER,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Senders: " + error.message);
  }
};

export const fetchSender = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchSender(id);
    dispatch({
      type: actions.FETCH_SENDER,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Sender: " + error.message);
  }
};

export const addSender = (sender) => async (dispatch) => {
  try {
    const { data } = await api.createSender(sender);
    dispatch({
      type: actions.ADD_SENDER,
      payload: data,
    });
  } catch (error) {
    console.log("Error Add Sender: " + error.message);
  }
};

export const deleteSender = (id) => async (dispatch) => {
  try {
    await api.deleteSender(id);
    dispatch({
      type: actions.DELETE_SENDER,
      payload: id,
    });
  } catch (error) {
    console.log("Error Delete Sender: " + error.message);
  }
};

export const updateSender = (sender) => async (dispatch) => {
  try {
    await api.updateSender(sender.id, sender);
    dispatch({
      type: actions.UPDATE_SENDER,
      payload: sender,
    });
  } catch (error) {
    console.log("Error Update Sender: " + error.message);
  }
};
