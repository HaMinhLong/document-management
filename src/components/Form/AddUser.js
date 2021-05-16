import React, { useState } from "react";

import Banner2 from "../layout/Banner2";
import Footer2 from "../layout/Footer2";

import { Formik, Form } from "formik";
import { userValidation } from "./Validation/userValidation";
import TextField from "./Field/TextField";
import SelectField from "./Field/SelectField";

import { roles } from "../../data/roles.json";

const AddUser = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    roleId: "",
    roleName: "",
  });

  const handleSubmit = (values) => {
    values.roleId = user.roleId;
    console.log(values);
  };

  // Ham nay khong de lam gi
  const handleChange = (value) => {
    const roleValue = roles.find((role) => role.name === value);
    setUser({
      ...user,
      roleId: roleValue.roleId,
    });
  };

  return (
    <>
      <Banner2 title={["Thêm tài khoản"]} />
      <section className="add-form-container padding">
        <h1>{"Thêm tài khoản :"}</h1>
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
                  optionsData={roles}
                  onChange={handleChange}
                />

                <input type="submit" value="Thêm tài khoản" />
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
