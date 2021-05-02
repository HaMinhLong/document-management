import React, { useState, useEffect } from "react";

import data from "../../../data/employees.json";

import { Link } from "react-router-dom";

import Banner2 from "../../layout/Banner2";
import Footer2 from "../../layout/Footer2";

const EmployeeInformation = (props) => {
  const id = props.match.params.id;
  useEffect(() => {
    document.title = `TLU | ${employee[0].name}`;
  });
  const [employee, setEmployee] = useState(
    data.employees.filter((employee) => employee.id === id)
  );

  const back = () => {
    window.history.back();
  };

  return (
    <>
      <Banner2 title={["Quản lí nhân viên", `${employee[0].name}`]} />
      <section className="employee-information-container padding">
        <h1>Thông tin nhân viên {employee[0].name} :</h1>
        <div className="employee-information">
          <div className="card-box">
            <div className="image-box">
              <img src={employee[0].image} alt="" />
              <p>{employee[0].name}</p>
              <p>{employee[0].position}</p>
            </div>
            <div className="contact">
              <p>Contact</p>
              <p>
                <i class="fas fa-phone-square"></i> {employee[0].email}
              </p>
              <p>
                <i class="fas fa-envelope"></i>
                {employee[0].phoneNumber}
              </p>
            </div>
          </div>
          <div className="content">
            <div>
              <h1>{employee[0].name}</h1>
              <p>{employee[0].code}</p>
            </div>
            <p>
              <span>Chức vụ :</span> {employee[0].position}
            </p>
            <p>
              <span>Bộ phận :</span> {employee[0].department}
            </p>
            <p>
              <span>Bộ phận trực thuộc :</span>{" "}
              {employee[0].affiliatedDepartment}
            </p>
            <p>
              <span>Email :</span> {employee[0].email}
            </p>
            <p>
              <span>Số điện thoại :</span> {employee[0].phoneNumber}
            </p>
            <p>
              <span>Làm việc từ :</span> {employee[0].startDate}
            </p>
            <Link to={`/add-employee-${employee[0].id}`}>
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

export default EmployeeInformation;
