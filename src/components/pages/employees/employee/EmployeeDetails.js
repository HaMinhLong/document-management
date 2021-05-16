import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Banner2 from "../../../layout/Banner2";
import Footer2 from "../../../layout/Footer2";

import { fetchEmployee } from "../../../../redux/employees/employeesActions";
import { fetchOrganizational } from "../../../../redux/organizational-structure/organizationalActions";

const EmployeeDetails = (props) => {
  const id = props.match.params.id;
  useEffect(() => {
    document.title = `TLU | ${employee.name}`;
    dispatch(fetchOrganizational());
    dispatch(fetchEmployee(id));
  }, []);

  const dispatch = useDispatch();

  const employee = useSelector((state) => state.employees);
  const organizational = useSelector((state) => state.organizational);

  const [department, setDepartment] = useState();
  useEffect(() => {
    setDepartment(
      organizational.find((org) => org.id === employee.departmentId)
    );
  }, [employee]);

  const back = () => {
    window.history.back();
  };

  return (
    <>
      <Banner2 title={["Quản lí nhân viên", `${employee.name}`]} />
      <section className="employee-information-container padding">
        <h1>Thông tin nhân viên {employee.name} :</h1>
        <div className="employee-information">
          <div className="card-box">
            <div className="image-box">
              <img
                src={
                  employee.image
                    ? employee.image
                    : "https://i.stack.imgur.com/l60Hf.png"
                }
                alt=""
              />
              <p>{employee.name}</p>
              <p>{employee.roleName}</p>
            </div>
            <div className="contact">
              <p>Contact</p>
              <p>
                <i className="fas fa-phone-square"></i> {employee.email}
              </p>
              <p>
                <i className="fas fa-envelope"></i>
                {employee.phoneNumber}
              </p>
            </div>
          </div>
          <div className="content">
            <div>
              <h1>{employee.name}</h1>
              <p>{employee.code}</p>
            </div>
            <p>
              <span>Tài khoản: </span> {employee.username}
            </p>
            <p>
              <span>Chức vụ :</span> {employee.roleName}
            </p>
            <p>
              <span>Bộ phận :</span> {department ? department.name : ""}
            </p>
            <p>
              <span>Email :</span> {employee.email}
            </p>
            <p>
              <span>Số điện thoại :</span> {employee.phoneNumber}
            </p>
            <Link to={`/add-employee-${employee.id}`}>
              <button>Cập nhật nhân viên</button>
            </Link>
          </div>
        </div>
        <p onClick={() => back()}>Quay lại trang trước</p>
      </section>
      <Footer2 />
    </>
  );
};

export default EmployeeDetails;
