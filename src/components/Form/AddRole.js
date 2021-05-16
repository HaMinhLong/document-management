import React, { useState } from "react";

import Banner2 from "../layout/Banner2";
import Footer2 from "../layout/Footer2";

import { Formik, Form } from "formik";
import { roleValidation } from "./Validation/roleValidation";
import TextField from "./Field/TextField";

const AddRole = () => {
  const [role, setRole] = useState({
    roleId: Math.floor(Math.random() * 1000000000000000000).toString(),
    roleName: "",
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <Banner2 title={["Thêm chức vụ"]} />
      <section className="add-form-container padding">
        <h1>{"Thêm chức vụ :"}</h1>
        {role && (
          <Formik
            initialValues={role}
            validationSchema={roleValidation}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(formik) => (
              <Form>
                <TextField label="Tên chức vụ :" name="roleName" type="text" />

                <input type="submit" value="Thêm chức vụ" />
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

export default AddRole;
