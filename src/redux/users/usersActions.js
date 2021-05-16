import * as actions from "./usersTypes";
import { users } from "../../data/users.json";

export const login = (user) => async (dispatch) => {
  try {
    const userData = users.find((usr) => usr.username === user.username);
    const message = !userData
      ? "Không tìm thấy tài khoản"
      : userData.password === user.password
      ? "Đăng nhập thành công"
      : "Sai mật khẩu";
    dispatch({
      type: actions.LOGIN,
      payload: message,
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
    const data = [];
    dispatch({
      type: actions.FETCH_USERS,
      payload: data,
    });
  } catch (error) {
    console.log("Error Fetch Users: " + error.message);
  }
};

export const fetchUser = () => async (dispatch) => {
  try {
    const data = [];
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
    dispatch({
      type: actions.ADD_USER,
      payload: user,
    });
  } catch (error) {
    console.log("Error Add User: " + error.message);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actions.DELETE_USER,
      payload: id,
    });
  } catch (error) {
    console.log("Error Delete User: " + error.message);
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: actions.UPDATE_USER,
      payload: user,
    });
  } catch (error) {
    console.log("Error Update User: " + error.message);
  }
};
