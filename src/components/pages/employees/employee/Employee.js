import React from "react";

import { Link } from "react-router-dom";

const Employee = ({ employees, setConfirmDelete, setEmployeeDeleteId }) => {
  const deleteEmployee = (id) => {
    setConfirmDelete(true);
    setEmployeeDeleteId(id);
  };
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Nhân viên</th>
            <th>Chức vụ</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Hành động</th>
          </tr>
        </thead>
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
                <td>{employee.roleName}</td>
                <td>{employee.email}</td>
                <td>{employee.phoneNumber}</td>
                <td>
                  <Link to={`/add-employee-${employee.id}`}>
                    <i className="fas fa-edit"></i>
                  </Link>
                  <i
                    className="fas fa-trash"
                    onClick={() => deleteEmployee(employee.id)}
                  ></i>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
