import React, { useState } from "react";

import Banner2 from "../layout/Banner2";
import Footer2 from "../layout/Footer2";

import { Formik, Form } from "formik";
import { roleValidation } from "./Validation/roleValidation";
import TextField from "./Field/TextField";

import { useDispatch, useSelector } from "react-redux";
import { addRole, updateRole } from "../../redux/roles/rolesActions";

const AddRole = (props) => {
  const dispatch = useDispatch();
  const roleID = props.match.params.id && props.match.params.id;

  const roleUpdate = useSelector((state) => state.roles);

  const data =
    roleUpdate &&
    roleUpdate.length > 0 &&
    roleUpdate.find((role) => role.roleId === roleID);

  const [role, setRole] = useState(
    roleID && data
      ? {
          roleId: data.roleId,
          name: data.name,
        }
      : {
          roleId: Math.floor(Math.random() * 1000000000000000000).toString(),
          name: "",
        }
  );

  const handleSubmit = (values) => {
    if (roleID) {
      dispatch(updateRole(values));
    } else {
      dispatch(addRole(values));
    }
    props.history.push("/role");
  };

  return (
    <>
      <Banner2 title={[roleID ? "Cập nhật chức vụ" : "Thêm chức vụ"]} />
      <section className="add-form-container padding">
        <h1>{roleID ? "Cập nhật chức vụ" : "Thêm chức vụ :"}</h1>
        {role && (
          <Formik
            initialValues={role}
            validationSchema={roleValidation}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(formik) => (
              <Form>
                <TextField label="Tên chức vụ :" name="name" type="text" />

                <input
                  type="submit"
                  value={roleID ? "Cập nhật chức vụ" : "Thêm chức vụ"}
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

export default AddRole;
