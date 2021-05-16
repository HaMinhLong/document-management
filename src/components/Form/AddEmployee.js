import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Banner2 from "../layout/Banner2";
import Footer2 from "../layout/Footer2";

import { roles } from "../../data/roles.json";

import {
  addEmployee,
  fetchEmployee,
  updateEmployee,
} from "../../redux/employees/employeesActions";

import { fetchOrganizational } from "../../redux/organizational-structure/organizationalActions";

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
  const id = props.match.params.id;

  useEffect(() => {
    document.title = id
      ? "TLU | Thêm nhân viên"
      : "TLU | Cập nhật thông tin nhân viên";
  }, []);

  const employeeUpdate = useSelector((state) => state.employees);

  const [employee, setEmployee] = useState(
    id
      ? employeeUpdate.length > 2
        ? employeeUpdate.find((emp) => emp.id === id)
        : employeeUpdate
      : {
          id: Math.floor(Math.random() * 1000000000000000000).toString(),
          name: "",
          email: "",
          phoneNumber: "",
          departmentId: "",
          roleId: "0",
          roleName: "",
        }
  );

  useEffect(() => {
    dispatch(fetchOrganizational());
  }, [employee]);
  const organizational = useSelector((state) => state.organizational);

  const [department, setDepartment] = useState();
  useEffect(() => {
    setDepartment(organizational);
  }, [organizational]);

  const handleSubmit = (values) => {
    values.departmentId = employee.departmentId;
    values.roleId = values.roleName === "Trưởng phòng" ? "1" : "0";
    if (id) {
      dispatch(updateEmployee(values));
    } else {
      dispatch(addEmployee(values));
    }
    props.history.push("/employees");
  };
  // Tu thay doi thong tin cua phong ban khi lua chon co cau to chuc
  const handleDepartment = (value) => {
    const departmentValue = organizational.find((org) => org.name === value);
    setEmployee({
      ...employee,
      departmentId: departmentValue.id,
    });
  };

  // Ham nay khong de lam gi
  const handleChange = () => {};

  // Thong bao
  const SuccessNoti = () => {
    store.addNotification({
      title: !id ? "Nhân viên mới được thêm" : "Thông tin được cập nhật",
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
      message: !id
        ? "Đã xảy ra lỗi khi thêm mới nhân viên"
        : "Đã xảy ra lỗi khi cập nhật nhân viên",
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
                  label="Bộ phận :"
                  name="departmentId"
                  optionsData={department ? department : [{ name: "" }]}
                  onChange={handleDepartment}
                />

                <SelectField
                  label="Chức vụ :"
                  name="roleName"
                  optionsData={roles}
                  onChange={handleChange}
                />

                {/* <FileBase64 data={employee} setData={setEmployee} /> */}

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
