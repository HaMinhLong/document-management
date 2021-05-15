import React from "react";
import { Link } from "react-router-dom";

const Role = ({ roles }) => {
  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Mã chức vụ</th>
              <th>Tên chức vụ</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {roles &&
              roles.length > 0 &&
              roles.map((role) => (
                <tr key={role.id}>
                  <td className="name">
                    <Link to={`/users/${role.id}`}>{role.name}</Link>
                  </td>
                  <td>
                    <Link to={`/add-role-${role.id}`}>
                      <i className="fas fa-edit"></i>
                    </Link>
                    <i className="fas fa-trash"></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Role;
