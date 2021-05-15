import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { userValidation } from "./Validation/userValidation";
import TextField from "./Field/TextField";

const Login = () => {
  document.title = "TLU | Login";
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
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
          validationSchema={userValidation}
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
  );
};

export default Login;
