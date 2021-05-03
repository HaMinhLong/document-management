import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import Banner2 from "../layout/Banner2";
import Employee from "./employee/Employee";
import Pagination from "../layout/Pagination";
import Footer2 from "../layout/Footer2";

import {
  fetchEmployees,
  deleteEmployee,
} from "../../redux/employees/employeesActions";

const Employees = () => {
  useEffect(() => {
    document.title = "TLU | Quản lí nhân viên";
  });

  const [currentIndex, setCurrentIndex] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const employeesList = useSelector((state) => state.employees);

  const [employees, setEmployees] = useState();

  useEffect(() => {
    setEmployees(
      employeesList.slice(10 * (currentIndex - 1), 10 * currentIndex)
    );
  }, [employeesList]);

  const nextPagination = (employeesNumber, currentIndex) => {
    setEmployees(
      employeesList.slice(
        employeesNumber * (currentIndex - 1),
        employeesNumber * currentIndex
      )
    );
  };

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [employeeDeleteId, setEmployeeDeleteId] = useState();

  const deleteEmployeeFunction = (id) => {
    dispatch(deleteEmployee(id));
    setConfirmDelete(false);
  };

  return (
    <>
      <Banner2 title={["Quản lí nhân viên"]} />
      <section className="employees-container padding">
        <h1>
          Danh sách cán bộ / giảng viên / nhân viên làm việc tại Trường Đại học
          Thăng Long:{" "}
        </h1>

        <div className="search-box">
          <button>
            <input type="text" name="search" id="search" />
            <i className="fas fa-search"></i>
          </button>
        </div>

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
              {employees &&
              employees.length > 0 &&
              employeesList &&
              employeesList.length > 0 ? (
                <span>
                  {employees.length}/{employeesList.length}
                </span>
              ) : (
                <span>0 </span>
              )}
              nhân viên
            </p>
          </div>
          <div className="filter">
            <div className="filter-department">
              <p>Phòng ban: </p>
              <select>
                <option value="toantin">Toán - Tin</option>
                <option value="kinhtequanli">Kinh tế - Quản lí</option>
              </select>
            </div>
            <div className="filter-affiliated-department">
              <p>Bộ phận:</p>
              <select>
                <option value="toan">Bộ môn Toán</option>
                <option value="tin">Bộ môn Tin</option>
              </select>
            </div>
          </div>
        </div>
        <Employee
          employees={employees}
          setConfirmDelete={setConfirmDelete}
          setEmployeeDeleteId={setEmployeeDeleteId}
        />

        {employeesList && employeesList.length > 0 && (
          <Pagination
            recordsTotal={employeesList.length}
            recordsNumber={10}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            nextPagination={nextPagination}
          />
        )}
        {confirmDelete && <span className="bg"></span>}
        {confirmDelete && (
          <div className="delete-employee">
            <p>Bạn có muốn xóa nhân viên này không?</p>
            <div className="confirm">
              <button onClick={() => deleteEmployeeFunction(employeeDeleteId)}>
                Có
              </button>
              <button onClick={() => setConfirmDelete(false)}>Không</button>
            </div>
          </div>
        )}
      </section>
      <Footer2 />
    </>
  );
};

export default Employees;
