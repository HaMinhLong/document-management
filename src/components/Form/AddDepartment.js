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

const AddDepartment = (props) => {
  const check =
    props.match.path === "/add-department"
      ? "add-department"
      : props.match.path === "/update-department-:id/:id1"
      ? "update-department"
      : "update-affiliated-department";

  // Lay ID cua co cau to chuc, bo phan, bo phan truc thuoc
  const organizationalID =
    check === "add-department" ? "" : props.match.params.id;
  const departmentID =
    check === "add-department"
      ? ""
      : check === "update-department"
      ? props.match.params.id1.slice(0, props.match.params.id1.length - 1)
      : props.match.params.id1;
  const affiliatedDepartmentID =
    check === "add-department" ? "" : props.match.params.id2;

  // Lay du lieu
  const organizationalData =
    check === "add-department"
      ? ""
      : organizational.find((org) => org.id === organizationalID);

  const departmentData =
    check === "add-department"
      ? ""
      : organizationalData.departments.find(
          (department) => department.id == departmentID
        );

  const affiliatedDepartmentData =
    check === "update-affiliated-department"
      ? departmentData.affiliatedDepartment.find(
          (aff) => aff.id == affiliatedDepartmentID
        )
      : "";

  // Du lieu ban dau cua bo phan khi them moi
  const [department, setDepartment] = useState(
    check === "add-department"
      ? {
          id: Math.floor(Math.random() * 1000000000000000000).toString(),
          name: "",
          describe: "",
          email: "",
          phoneNumber: "",
          startDate: "20/10/2021",
          organizational: "",
          department: "",
        }
      : check === "update-department"
      ? {
          id: departmentData.id,
          name: departmentData.name,
          describe: departmentData.describe,
          email: departmentData.email,
          phoneNumber: departmentData.phoneNumber,
          startDate: departmentData.startDate,
          organizational: organizationalData.name,
          department: "",
        }
      : {
          id: affiliatedDepartmentData.id,
          name: affiliatedDepartmentData.name,
          describe: affiliatedDepartmentData.describe,
          email: affiliatedDepartmentData.email,
          phoneNumber: affiliatedDepartmentData.phoneNumber,
          startDate: affiliatedDepartmentData.startDate,
          organizational: organizationalData.name,
          department: departmentData.name,
        }
  );

  const handleSubmit = (values) => {
    console.log(values);
    SuccessNoti();
    // props.history.push("/organizational");
  };

  // Tu thay doi thong tin cua phong ban khi lua chon co cau to chuc
  const [departmentSelect, setDepartmentSelect] = useState(
    affiliatedDepartmentID ? organizationalData.departments : ""
  );
  const handleDepartment = (value) => {
    const data = organizational.find((org) => org.name === value);
    if (data) setDepartmentSelect(data.departments);
  };

  // Ham nay khong de lam gi
  const handleChange = () => {};

  // Thong bao
  const SuccessNoti = () => {
    store.addNotification({
      title: "Bộ phận mới được thêm",
      message: "Thêm mới bộ phận thành công",
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
      message: "Đã xảy ra lỗi khi thêm mới bộ phận",
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
      <Banner2 title={[departmentID ? "Cập nhật bộ phận" : "Thêm bộ phận"]} />
      <section className="add-department-container padding">
        <h1>{departmentID ? "Cập nhập bộ phận :" : "Thêm bộ phận :"}</h1>

        {department && (
          <Formik
            initialValues={department}
            validationSchema={departmentValidation}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(formik) => (
              <Form>
                <TextField label="Tên bộ phận:" name="name" type="text" />
                <Textarea label="Mô tả :" name="describe" type="text" />
                <TextField label="Email :" name="email" type="email" />
                <TextField
                  label="Số điện thoại :"
                  name="phoneNumber"
                  type="text"
                />
                <SelectField
                  label="Bộ phận quản lý :"
                  name="organizational"
                  id="organizational"
                  optionsData={organizational}
                  onChange={handleDepartment}
                />
                <SelectField
                  label="Bộ phận trực thuộc :"
                  name="department"
                  optionsData={
                    departmentSelect ? departmentSelect : [{ name: "" }]
                  }
                  onChange={handleChange}
                />

                <input
                  type="submit"
                  value={departmentID ? "Cập nhật bộ phận" : "Thêm nhân viên"}
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
