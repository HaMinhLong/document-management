import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Banner2 from "../layout/Banner2";
import Employee from "./employee/Employee";
import Pagination from "../layout/Pagination";
import Footer2 from "../layout/Footer2";

import data from "../../data/employees.json";

const Employees = () => {
  useEffect(() => {
    document.title = "TLU | Quản lí nhân viên";
  });

  const employeesList = data.employees;
  const [employees, setEmployees] = useState(employeesList.slice(0, 10));
  const [deleteEmployee, setDeleteEmployee] = useState(false);

  const nextPagination = (employeesNumber, currentIndex) => {
    setEmployees(
      employeesList.slice(
        employeesNumber * (currentIndex - 1),
        employeesNumber * currentIndex
      )
    );
  };

  return (
    <>
      <Banner2 title={["Quản lí nhân viên"]} />
      <section className="employees-container padding">
        <h1>
          Danh sách cán bộ / giảng viên / nhân viên làm việc tại Trường Đại học
          Thăng Long:{" "}
        </h1>
        <div className="add-employee-button">
          <button>
            <Link to="/add-employee">
              Thêm nhân viên <i className="fas fa-user-plus"></i>
            </Link>
          </button>
        </div>
        <div className="filter-container">
          <div className="filter-result">
            <p>
              Hiển thị{" "}
              <span>
                {employees.length}/{employeesList.length}
              </span>{" "}
              nhân viên
            </p>
          </div>
          <div className="filter">
            <div className="filter-department">
              <p>Bộ phận: </p>
              <select>
                <option value="toantin">Toán - Tin</option>
                <option value="kinhtequanli">Kinh tế - Quản lí</option>
              </select>
            </div>
            <div className="filter-affiliated-department">
              <p>Ngành:</p>
              <select>
                <option value="toan">Bộ môn Toán</option>
                <option value="tin">Bộ môn Tin</option>
              </select>
            </div>
          </div>
        </div>

        <Employee employees={employees} setDeleteEmployee={setDeleteEmployee} />
        <Pagination
          recordsTotal={employeesList.length}
          recordsNumber={10}
          nextPagination={nextPagination}
        />
        {deleteEmployee && <span className="bg"></span>}
        {deleteEmployee && (
          <div className="delete-employee">
            <p>Bạn có muốn xóa nhân viên này không?</p>
            <div className="confirm">
              <button onClick={() => setDeleteEmployee(false)}>Có</button>
              <button onClick={() => setDeleteEmployee(false)}>Không</button>
            </div>
          </div>
        )}
      </section>
      <Footer2 />
    </>
  );
};

export default Employees;
