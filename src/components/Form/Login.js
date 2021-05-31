import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { loginValidation } from "./Validation/loginValidation";
import TextField from "./Field/TextField";

import { useDispatch, useSelector } from "react-redux";

import { login } from "../../redux/users/usersActions";

import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const Login = () => {
  const dispatch = useDispatch();
  document.title = "TLU | Login";
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [checkLogin, setCheckLogin] = useState(false);

  const message = useSelector((state) => state.users);

  useEffect(() => {
    message.username &&
      !message.message &&
      message.groupId &&
      message.group.rights &&
      loginUser(message.groupId, message.username, message);
    ((!message.username && message.message) ||
      (!message.groupId && !localStorage.getItem("groupId"))) &&
      errorNotification(
        message.message || "Tài khoản không được phép đăng nhập"
      );
  });

  const handleSubmit = (values) => {
    dispatch(login(values));
    localStorage.setItem("groupId", "");
    // if (message.username) {
    //   loginUser(message.roleId, message.username);
    // } else {
    //   errorNotification(message.message);
    // }
  };

  const loginUser = (groupId, username, message) => {
    if (!checkLogin) {
      localStorage.setItem("groupId", groupId || "");
      localStorage.setItem("username", username);
      localStorage.setItem("rights", JSON.stringify(message.group.rights));
      window.location = "/";
      setCheckLogin(true);
    }
  };

  const errorNotification = (mes) => {
    localStorage.setItem("groupId", "1");
    store.addNotification({
      title: "Xảy ra lỗi khi đăng nhập",
      message: mes,
      type: "danger",
      container: "top-right",
      insert: "top",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 4000,
        showIcon: true,
        onScreen: true,
      },
      width: 350,
    });
  };

  return (
    <>
      <ReactNotification />

      <section className="login-page">
        <div className="bg"></div>
        <div className="form-login">
          <div className="text-box">
            <div className="image-box">
              <img
                src="https://login.thanglong.edu.vn/images/logotlu.jpg"
                alt="logo thang long"
              />
            </div>
            <h1>Welcome</h1>
            <p>Sign in by entering the information below</p>
          </div>
          <Formik
            initialValues={user}
            validationSchema={loginValidation}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(formik) => (
              <Form>
                <TextField label="Tài khoản :" name="username" type="text" />
                <TextField label="Mật khẩu :" name="password" type="password" />

                <Link to="/forgot-password">Forgot Password?</Link>

                <input type="submit" value="Login" />
              </Form>
            )}
          </Formik>
        </div>
        <p>
          Copyright &copy; 2021 Thăng Long University.{" "}
          <span>All right reserved</span>
        </p>
      </section>
    </>
  );
};

export default Login;
