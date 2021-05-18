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
import {
  fetchUsers,
  fetchAvailableUsers,
} from "../../redux/users/usersActions";

import { Formik, Form } from "formik";
import { employeeValidation } from "./Validation/employeeValidation";
import TextField from "./Field/TextField";
import SelectField from "./Field/SelectField";
import FileBase64 from "./Field/FileBase64";

import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const AddEmployee = (props) => {
  const roleId = localStorage.getItem("status");
  const dispatch = useDispatch();
  const id = props.match.params.id && props.match.params.id;

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
          code: "",
          name: "",
          email: "@gmail.com",
          phoneNumber: "0963339657",
          departmentId: "",
          roleId: "0",
          roleName: "",
          username: "",
          image: "",
        }
  );

  useEffect(() => {
    dispatch(fetchOrganizational());
    // dispatch(fetchUsers());
  }, [employee]);
  const organizational = useSelector((state) => state.organizational);

  const [department, setDepartment] = useState();
  useEffect(() => {
    setDepartment(organizational);
  }, [organizational]);

  const [usersSelect, setUsersSelect] = useState();

  const handleSubmit = (values) => {
    values.departmentId = employee.departmentId;
    values.roleId = employee.roleId;
    values.image = employee.image;
    if (id) {
      dispatch(updateEmployee(values));
    } else {
      dispatch(addEmployee(values));
    }
    props.history.push("/employees");
  };

  // set id cua department cho employee
  const handleDepartment = (value) => {
    const departmentValue = organizational.find((org) => org.name === value);
    departmentValue &&
      departmentValue.id &&
      setEmployee({
        ...employee,
        departmentId: departmentValue.id,
      });
  };

  // set username cho employee
  const handleUser = (value) => {};

  // Ham nay khong de lam gi
  const handleChange = (value) => {
    const roleValue = roles.find((role) => role.name === value);
    roleValue &&
      roleValue.id &&
      setEmployee({
        ...employee,
        roleId: roleValue.roleId,
      });
    dispatch(fetchAvailableUsers(roleValue.roleId));
  };

  const users = useSelector((state) => state.users);
  useEffect(() => {
    setUsersSelect(users);
  }, [users]);

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
      <section className="add-form-container padding">
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
                {(roleId === "89" || roleId === "1") && (
                  <TextField label="Mã nhân viên :" name="code" type="text" />
                )}
                <TextField label="Email :" name="email" type="email" />
                <TextField
                  label="Số điện thoại :"
                  name="phoneNumber"
                  type="text"
                />
                {(roleId === "89" || roleId === "1") && (
                  <SelectField
                    label="Bộ phận :"
                    name="departmentId"
                    optionsData={department ? department : [{ name: "" }]}
                    onChange={handleDepartment}
                  />
                )}

                {(roleId === "89" || roleId === "1") && (
                  <SelectField
                    label="Chức vụ :"
                    name="roleName"
                    optionsData={roles}
                    onChange={handleChange}
                  />
                )}

                {(roleId === "89" || roleId === "1") && (
                  <SelectField
                    label="Tài khoản :"
                    name="username"
                    optionsData={usersSelect ? usersSelect : [{ name: "" }]}
                    onChange={handleUser}
                  />
                )}

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
