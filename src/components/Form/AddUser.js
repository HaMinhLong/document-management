import React, { useState, useEffect } from "react";

import Banner2 from "../layout/Banner2";
import Footer2 from "../layout/Footer2";

import { Formik, Form } from "formik";
import { userValidation } from "./Validation/userValidation";
import TextField from "./Field/TextField";
import SelectField from "./Field/SelectField";

import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../../redux/users/usersActions";
import { fetchGroups } from "../../redux/groups/groupsActions";

import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const AddUser = (props) => {
  document.title = "TLU | Thêm tài khoản";
  const username = props.match.params.id && props.match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  const userUpdate = useSelector((state) => state.users);
  const groups = useSelector((state) => state.groups);

  const data =
    userUpdate &&
    userUpdate.length > 0 &&
    userUpdate.find((user) => user.username === username);

  const [user, setUser] = useState(
    username && data
      ? {
          username: data.username,
          password: data.password,
          confirmPassword: data.password,
          groupId: data.id,
        }
      : {
          username: "",
          password: "",
          confirmPassword: "",
          groupId: "",
        }
  );

  const message = useSelector((state) => state.users);

  const handleSubmit = (values) => {
    values.groupId = user.groupId;
    if (message === "This username has been taken") {
      ErrorNoti();
    } else {
      if (username) {
        dispatch(updateUser(values));
        props.history.push("/user");
      } else {
        dispatch(addUser(values));
        props.history.push("/user");
      }
    }
  };

  // Ham nay khong de lam gi
  const handleChange = (value) => {
    const roleValue = groups.find((role) => role.name === value);
    setUser({
      ...user,
      groupId: roleValue.id,
    });
  };

  const ErrorNoti = () => {
    store.addNotification({
      title: "Lỗi",
      message: "Tên tài khoản đã được sử dụng",
      type: "warning",
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
      <Banner2 title={[username ? "Cập nhật tài khoản" : "Thêm tài khoản"]} />
      <section className="add-form-container padding">
        <h1>{username ? "Cập nhật tài khoản : " : "Thêm tài khoản :"}</h1>
        {user && (
          <Formik
            initialValues={user}
            validationSchema={userValidation}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(formik) => (
              <Form>
                <TextField
                  label="Tên tài khoản :"
                  name="username"
                  type="text"
                />
                <TextField label="Mật khẩu :" name="password" type="password" />
                <TextField
                  label="Xác nhận mật khẩu :"
                  name="confirmPassword"
                  type="password"
                />

                <SelectField
                  label="Chức vụ :"
                  name="roleName"
                  optionsData={
                    groups && groups.length > 0
                      ? groups.filter((group) => group.name !== "admin")
                      : [{ name: "" }]
                  }
                  onChange={handleChange}
                />

                <input
                  type="submit"
                  value={username ? "Cập nhật tài khoản" : "Thêm tài khoản"}
                />
              </Form>
            )}
          </Formik>
        )}

        <p onClick={() => window.history.back()}>Quay lại trang trước</p>
      </section>
      <Footer2 />
    </>
  );
};

export default AddUser;
