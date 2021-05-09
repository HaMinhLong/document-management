import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Banner2 from "../layout/Banner2";
import Footer2 from "../layout/Footer2";

import { organizational } from "../../data/organizational.json";
import { position } from "../../data/position.json";

import {
  fetchEmployee,
  addEmployee,
  updateEmployee,
} from "../../redux/employees/employeesActions";

import { Formik, Form } from "formik";
import { employeeValidation } from "./Validation/employeeValidation";
import TextField from "./Field/TextField";
import SelectField from "./Field/SelectField";
import FileBase64 from "./Field/FileBase64";

import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const AddEmployee = (props) => {
  const dispatch = useDispatch();
  const url = props.match.url;
  const id = url.slice(14, url.length);

  useEffect(() => {
    document.title = id
      ? "TLU | Thêm nhân viên"
      : "TLU | Cập nhật thông tin nhân viên";
    dispatch(fetchEmployee(id));
  }, []);

  const data = useSelector((state) => state.employees[0]);

  const [employee, setEmployee] = useState(
    id
      ? data
      : {
          id: Math.floor(Math.random() * 1000000000000000000).toString(),
          name: "",
          code: "",
          email: "",
          phoneNumber: "",
          organizational: "",
          department: "",
          affiliatedDepartment: "",
          position: "",
          startDate: "20/10/2021",
          image: "https://i.stack.imgur.com/l60Hf.png",
        }
  );

  const handleSubmit = (values) => {
    if (!id) {
      dispatch(addEmployee(values));
    } else {
      dispatch(updateEmployee(values));
    }
    SuccessNoti();
    // props.history.push("/employees");
    values.image = employee.image;
    values.startDate = employee.startDate;
    console.log(values);
  };

  // Tu thay doi thong tin cua phong ban khi lua chon co cau to chuc
  const [department, setDepartment] = useState();
  const handleDepartment = (value) => {
    const data = organizational.find((org) => org.name === value);
    if (data) setDepartment(data.departments);
  };

  // Tu thay doi thong tin cua bo phan truc thuoc phong ban
  const [affiliatedDepartment, setAffiliatedDepartment] = useState();
  const handleAffiliatedDepartment = (value) => {
    const data = department.find((dpm) => dpm.name === value);
    if (data) setAffiliatedDepartment(data.affiliatedDepartment);
  };

  // Dat gia tri cua bo phan truc thuoc phong ban la rỗng
  // khi lua chon co cau to chuc
  useEffect(() => {
    setAffiliatedDepartment();
  }, [department]);

  // Ham nay khong de lam gi
  const handleChange = () => {};

  // Thong bao
  const SuccessNoti = () => {
    store.addNotification({
      title: !id ? "Bộ phận mới được thêm" : "Thông tin được cập nhật",
      message: !id
        ? "Thêm mới nhân viên thành công"
        : "Cập nhật thông tin nhân viên thành công",
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
      message: "Đã xảy ra lỗi khi thêm mới nhân viên",
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
      <Banner2 title={[!id ? "Thêm nhân viên" : "Cập nhật thông tin"]} />
      <section className="add-employee-container padding">
        <h1>{!id ? "Thêm nhân viên :" : "Cập nhật thông tin nhân viên :"}</h1>
        {employee && (
          <Formik
            initialValues={employee}
            validationSchema={employeeValidation}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(formik) => (
              <Form>
                <TextField label="Tên nhân viên :" name="name" type="text" />
                <TextField label="Mã nhân viên :" name="code" type="text" />
                <TextField label="Email :" name="email" type="email" />
                <TextField
                  label="Số điện thoại :"
                  name="phoneNumber"
                  type="text"
                />
                <SelectField
                  label="Cơ cấu tổ chức :"
                  name="organizational"
                  id="organizational"
                  optionsData={organizational}
                  onChange={handleDepartment}
                />
                <SelectField
                  label="Bộ phận :"
                  name="department"
                  optionsData={department ? department : [{ name: "" }]}
                  onChange={handleAffiliatedDepartment}
                />
                <SelectField
                  label="Bộ phận trực thuộc :"
                  name="affiliatedDepartment"
                  optionsData={
                    affiliatedDepartment ? affiliatedDepartment : [{ name: "" }]
                  }
                  onChange={handleChange}
                />
                <SelectField
                  label="Chức vụ :"
                  name="position"
                  optionsData={position}
                  onChange={handleChange}
                />

                <FileBase64 data={employee} setData={setEmployee} />

                <input
                  type="submit"
                  value={id ? "Cập nhật nhân viên" : "Thêm nhân viên"}
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

export default AddEmployee;
