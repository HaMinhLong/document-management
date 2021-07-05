import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import moment from "moment";
import TableHead from "../../../components/componentDashs/TableHead";
import { fetchOrganizational } from "../../../redux/organizational-structure/organizationalActions";

import { useDispatch, useSelector } from "react-redux";

const Employee = ({
  employees,
  setConfirmDelete,
  setEmployeeDeleteId,
  checkRight,
}) => {
  const username = localStorage.getItem("username");
  const groupId = localStorage.getItem("groupId");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrganizational());
  }, []);
  const organizational = useSelector((state) => state.organizational);

  const employeeLogin =
    groupId !== "15190574710097992" &&
    employees &&
    employees.length > 0 &&
    employees.find((employee) => employee.username === username);

  const deleteEmployee = (id) => {
    setConfirmDelete(true);
    setEmployeeDeleteId(id);
  };
  return (
    <div className="table-container">
      <table>
        <TableHead
          fields={[
            "Mã nhân viên",
            "Tên nhân viên",
            "Chức vụ",
            "Bộ phận",
            "Email",
            "Số điện thoại",
          ]}
          checkRight={checkRight}
        />
        <tbody>
          {employees &&
            employees.length > 0 &&
            employees.map((employee) => (
              <tr key={employee.id}>
                <td className="code">
                  <Link to={`/employees/${employee.id}`}>{employee.code}</Link>
                </td>
                <td className="name">
                  <Link to={`/employees/${employee.id}`}>{employee.name}</Link>
                </td>
                <td>{employee.roleName || ""}</td>
                <td>
                  {organizational &&
                    organizational.length > 0 &&
                    organizational.find(
                      (data) => data.id === employee.departmentId
                    ) &&
                    organizational.find(
                      (data) => data.id === employee.departmentId
                    ).name}
                </td>
                <td>{employee.email || ""}</td>
                <td>{employee.phoneNumber || ""}</td>
                {/* <td>{moment(employee.createdAt).format("L")}</td> */}
                {(groupId === "644317359247429400" ||
                  groupId === "461341600943357060" ||
                  (checkRight &&
                    (employeeLogin.departmentId === employee.departmentId ||
                      employeeLogin.departmentId ===
                        (organizational &&
                          organizational.length > 0 &&
                          organizational.find(
                            (org) => org.id === employee.departmentId
                          ).belongto)))) && (
                  <td>
                    <Link to={`/add-employee-${employee.id}`}>
                      <i className="fas fa-edit"></i>
                    </Link>
                    <i
                      className="fas fa-trash"
                      onClick={() => deleteEmployee(employee.id)}
                    ></i>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
