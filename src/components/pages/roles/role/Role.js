import React from "react";
import { Link } from "react-router-dom";

const Role = ({ roles, setConfirmDelete, setRoleId }) => {
  const deleteRole = (roleId) => {
    setConfirmDelete(true);
    setRoleId(roleId);
  };

  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tên chức vụ</th>
              {/* <th>Ngày tạo</th>
              <th>Sửa đổi lần cuối</th> */}
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {roles &&
              roles.length > 0 &&
              roles.map((role) => (
                <tr key={role.roleId}>
                  <td className="name">
                    <Link to={`/roles/${role.roleId}`}>{role.name}</Link>
                  </td>
                  <td>
                    <Link to={`/add-role-${role.roleId}`}>
                      <i className="fas fa-edit"></i>
                    </Link>
                    <i
                      className="fas fa-trash"
                      onClick={() => deleteRole(role.roleId)}
                    ></i>
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
