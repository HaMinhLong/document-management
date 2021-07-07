import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import Banner2 from "../../layouts/Banner2";
import Footer2 from "../../layouts/Footer2";
import Employee from "./employee/Employee";
import Pagination from "../../components/componentDashs/Pagination";
import DeleteBox from "../../components/componentDashs/DeleteBox";
import FilterBox from "../../components/componentDashs/FilterBox";
import FilterResult from "../../components/componentDashs/FilterResult";
import SearchBox from "../../components/componentDashs/SearchBox";
import AddButton from "../../components/componentDashs/AddButton";
import { checkAdmin } from "../../utils/utils";
import {
  fetchEmployees,
  deleteEmployee,
  fetchEmployeesByDep,
} from "../../redux/employees/employeesActions";

import { fetchGroups } from "../../redux/groups/groupsActions";

import { fetchOrganizational } from "../../redux/organizational-structure/organizationalActions";

const Employees = (props) => {
  const dispatch = useDispatch();
  const checkRight = props.match.url === "/employees" ? true : false;
  const groupId = localStorage.getItem("groupId");
  const departmentId = localStorage.getItem("departmentId");
  const isAdmin = checkAdmin(groupId);
  useEffect(() => {
    document.title = "TLU | Quản lí nhân viên";
    dispatch(fetchGroups());
  }, []);
  const groups = useSelector((state) => state.groups);

  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    isAdmin
      ? dispatch(fetchEmployees())
      : dispatch(fetchEmployeesByDep(departmentId));
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

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [employeeDeleteId, setEmployeeDeleteId] = useState();

  const filterEmployee = (value) => {
    !value
      ? setEmployees(employeesList.slice(0, 10))
      : setEmployees(
          employeesList.filter((emp) => emp.departmentId == value).slice(0, 10)
        );
  };

  const filterEmployeeByRole = (role) => {
    console.log(role);
    role
      ? setEmployees(
          employeesList
            .filter((employee) => employee.roleId === role)
            .slice(0, 10)
        )
      : setEmployees(employeesList.slice(0, 10));
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

  return (
    <>
      <Banner2 title={["Quản lí nhân viên"]} />
      <section className="employees-container padding">
        <h1>
          Danh sách cán bộ / giảng viên / nhân viên làm việc tại Trường Đại học
          Thăng Long :{" "}
        </h1>

        <SearchBox data={employeesList} setData={setEmployees} />

        {checkRight && (
          <AddButton link={"add-employee"} text={"Thêm nhân viên"} />
        )}

        <div className="filter-container">
          <FilterResult
            text={"nhân viên"}
            data={employees}
            dataAll={employeesList}
          />

          <div className="filter">
            {isAdmin && (
              <FilterBox
                text={"Bộ phận"}
                selectData={organizational}
                filterFunction={filterEmployee}
              />
            )}
            {isAdmin && (
              <FilterBox
                text={"Chức vụ"}
                selectData={groups}
                filterFunction={filterEmployeeByRole}
              />
            )}

            <FilterBox
              text={"Tài khoản"}
              selectData={[
                {
                  id: "có",
                  name: "Đã có",
                },
                {
                  id: "chưa",
                  name: "Chưa có",
                },
              ]}
              filterFunction={filterEmployeeByUser}
            />
          </div>
        </div>

        <Employee
          employees={employees}
          setConfirmDelete={setConfirmDelete}
          setEmployeeDeleteId={setEmployeeDeleteId}
          checkRight={checkRight}
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
              setData={setEmployees}
              data={employeesList}
            />
          )}

        <DeleteBox
          text="nhân viên"
          deleteFunction={deleteEmployee}
          id={employeeDeleteId}
          confirmDelete={confirmDelete}
          setConfirm={setConfirmDelete}
        />
      </section>
      <Footer2 />
    </>
  );
};

export default Employees;
