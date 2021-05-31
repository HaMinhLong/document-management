import * as actions from "./usersTypes";
import * as api from "../../api/index";

export const login = (user) => async (dispatch) => {
  try {
    const { data } = await api.SignIn(user);

    dispatch({
      type: actions.LOGIN,
      payload: data,
    });
  } catch (error) {
    console.log("Error Login: " + error.message);
  }
};

export const forgotPassword = () => async (dispatch) => {
  try {
  } catch (error) {
    console.log("Error Forgot Password: " + error.message);
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();
    dispatch({
      type: actions.FETCH_USERS,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Users: " + error.message);
  }
};

export const fetchAvailableUsers = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchAvailableUsers(id);
    dispatch({
      type: actions.FETCH_AVAILABLE_USER,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Available Users: " + error.message);
  }
};

export const fetchUser = (username) => async (dispatch) => {
  try {
    const { data } = await api.fetchUser(username);
    dispatch({
      type: actions.FETCH_USER,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch User: " + error.message);
  }
};

export const addUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.createUser(user);
    dispatch({
      type: actions.ADD_USER,
      payload: data,
    });
  } catch (error) {
    console.log("Error Add User: " + error.message);
  }
};

export const deleteUser = (username) => async (dispatch) => {
  try {
    await api.deleteUser(username);
    dispatch({
      type: actions.DELETE_USER,
      payload: username,
    });
  } catch (error) {
    console.log("Error Delete User: " + error.message);
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    await api.updateUser(user.username, user);
    dispatch({
      type: actions.UPDATE_USER,
      payload: user,
    });
  } catch (error) {
    console.log("Error Update User: " + error.message);
  }
};
