import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import Banner2 from "../../layout/Banner2";
import Employee from "./employee/Employee";
import Pagination from "../../layout/Pagination";
import Footer2 from "../../layout/Footer2";

import {
  fetchEmployees,
  deleteEmployee,
} from "../../../redux/employees/employeesActions";

import { fetchRoles } from "../../../redux/roles/rolesActions";

import { fetchOrganizational } from "../../../redux/organizational-structure/organizationalActions";

const Employees = () => {
  const dispatch = useDispatch();
  const roleId = localStorage.getItem("status");
  useEffect(() => {
    document.title = "TLU | Quản lí nhân viên";
    dispatch(fetchRoles());
  }, []);
  const roles = useSelector((state) => state.roles);

  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const employeesList = useSelector((state) => state.employees);

  const [employees, setEmployees] = useState();

  useEffect(() => {
    if (employeesList.length > 10) {
      setEmployees(
        employeesList.slice((currentIndex - 1) * 10, currentIndex * 10)
      );
      dispatch(fetchOrganizational());
    } else {
      setEmployees(employeesList);
      dispatch(fetchOrganizational());
    }
  }, [employeesList]);

  const organizational = useSelector((state) => state.organizational);

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

  const filterEmployee = (e) => {
    if (!e.target.value) {
      setEmployees(employeesList.slice(0, 10));
    } else {
      setEmployees(
        employeesList
          .filter((emp) => emp.departmentId == e.target.value)
          .slice(0, 10)
      );
    }
  };

  const filterEmployeeByRole = (role) => {
    if (role) {
      setEmployees(
        employeesList
          .filter((employee) => employee.roleName === role)
          .slice(0, 10)
      );
    } else {
      setEmployees(employeesList.slice(0, 10));
    }
  };
  const filterEmployeeByUser = (user) => {
    if (user) {
      if (user === "có") {
        setEmployees(
          employeesList
            .filter((employee) => employee.username !== null)
            .slice(0, 10)
        );
      } else {
        setEmployees(
          employeesList
            .filter((employee) => employee.username === null)
            .slice(0, 10)
        );
      }
    } else {
      setEmployees(employeesList.slice(0, 10));
    }
  };

  const searchEmployees = (value) => {
    const dataSearch = employeesList.filter(
      (employee) => employee.name.toLowerCase().indexOf(value) !== -1
    );
    setEmployees(dataSearch.slice(0, 10));
  };

  return (
    <>
      <Banner2 title={["Quản lí nhân viên"]} />
      <section className="employees-container padding">
        <h1>
          Danh sách cán bộ / giảng viên / nhân viên làm việc tại Trường Đại học
          Thăng Long :{" "}
        </h1>

        <div className="search-box">
          <button>
            <input
              type="text"
              name="search"
              id="search"
              onChange={(e) => searchEmployees(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </button>
        </div>
        {roleId && (roleId === "89" || roleId === "1") && (
          <div className="add-button">
            <button>
              <Link to="/add-employee">
                Thêm nhân viên <i className="fas fa-user-plus"></i>
              </Link>
            </button>
          </div>
        )}

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
              )}{" "}
              nhân viên
            </p>
          </div>
          <div className="filter">
            <div className="filter-department">
              <p>Bộ phận: </p>
              <select onClick={(e) => filterEmployee(e)}>
                <option value="">Tất cả</option>
                {organizational &&
                  organizational.length > 0 &&
                  organizational.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="filter">
            <div className="filter-department">
              <p>Chức vụ: </p>
              <select onClick={(e) => filterEmployeeByRole(e.target.value)}>
                <option value="">Tất cả</option>
                {roles &&
                  roles.length > 0 &&
                  roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="filter">
            <div className="filter-department">
              <p>Tài khoản: </p>
              <select onClick={(e) => filterEmployeeByUser(e.target.value)}>
                <option value="">Tất cả</option>
                <option value="có">Đã có</option>
                <option value="chưa">Chưa có</option>
              </select>
            </div>
          </div>
        </div>
        <Employee
          roleId={roleId}
          employees={employees}
          setConfirmDelete={setConfirmDelete}
          setEmployeeDeleteId={setEmployeeDeleteId}
        />

        {employees &&
          employees.length > 0 &&
          employeesList &&
          employeesList.length > 0 && (
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
