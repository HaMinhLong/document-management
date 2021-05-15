import React, { useState, useEffect } from "react";

import Banner2 from "../layout/Banner2";
import Footer2 from "../layout/Footer2";

import { organizational } from "../../data/organizational.json";
import { Formik, Form } from "formik";
import { departmentValidation } from "./Validation/departmentValidation";
import TextField from "./Field/TextField";
import SelectField from "./Field/SelectField";
import Textarea from "./Field/TextareaField";

import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrganizational,
  createDepartment,
  updateDepartment,
} from "../../redux/organizational-structure/organizationalActions";

const AddDepartment = (props) => {
  const dispatch = useDispatch();
  const id =
    props.match.params.id &&
    props.match.params.id.slice(0, props.match.params.id.length - 1);

  useEffect(() => {
    document.title = id
      ? "TLU | Thêm bộ phận"
      : "TLU | Cập nhật thông tin bộ phận";
    dispatch(fetchOrganizational());
  }, []);

  const organizational = useSelector((state) => state.organizational);

  // Du lieu ban dau cua bo phan khi them moi
  const [department, setDepartment] = useState(
    id
      ? organizational.find((org) => org.id === id)
      : {
          id: Math.floor(Math.random() * 1000000000000000000).toString(),
          name: "",
          description: "",
          email: "",
          phoneNumber: "",
          belongto: "",
        }
  );

  const [departmentSelect, setDepartmentSelect] = useState([]);
  useEffect(() => {
    setDepartmentSelect(organizational);
  }, [organizational]);

  const handleDepartment = (value) => {};

  const handleSubmit = (values) => {
    const department = organizational.find(
      (org) => org.name === values.belongto
    );
    if (department) values.belongto = department.id;
    if (id) {
      dispatch(updateDepartment(values));
    } else {
      dispatch(createDepartment(values));
    }
    props.history.push("/organizational");
  };

  // Ham nay khong de lam gi
  const handleChange = () => {};

  // Thong bao
  const SuccessNoti = () => {
    store.addNotification({
      title: !id ? "Bộ phận mới được thêm" : "Bộ phận được cập nhật",
      message: !id
        ? "Thêm mới bộ phận thành công"
        : "Cập nhật thông tin bộ phận thành công",
      type: "success",
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

  const ErrorNoti = () => {
    store.addNotification({
      title: "Lỗi",
      message: !id
        ? "Đã xảy ra lỗi khi thêm mới bộ phận"
        : "Đã xảy ra lỗi khi cập nhật bộ phận",
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
      <ReactNotification /> {/* react notification component */}
      <Banner2 title={[id ? "Cập nhật bộ phận" : "Thêm bộ phận"]} />
      <section className="add-department-container padding">
        <h1>{id ? "Cập nhập bộ phận :" : "Thêm bộ phận :"}</h1>

        {department && (
          <Formik
            initialValues={department}
            validationSchema={departmentValidation}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(formik) => (
              <Form>
                <TextField label="Tên bộ phận:" name="name" type="text" />
                <Textarea label="Mô tả :" name="description" type="text" />
                <TextField label="Email :" name="email" type="email" />
                <TextField
                  label="Số điện thoại :"
                  name="phoneNumber"
                  type="text"
                />
                <SelectField
                  label="Bộ phận quản lý :"
                  name="belongto"
                  id="belongto"
                  optionsData={
                    departmentSelect ? departmentSelect : [{ name: "" }]
                  }
                  onChange={handleDepartment}
                />

                <input
                  type="submit"
                  value={id ? "Cập nhật bộ phận" : "Thêm nhân viên"}
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

export default AddDepartment;
