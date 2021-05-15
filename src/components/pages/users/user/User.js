import React from "react";
import { Link } from "react-router-dom";

const User = ({ users }) => {
  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tài khoản</th>
              <th>Nhân viên</th>
              <th>Chức vụ</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user) => (
                <tr key={user.id}>
                  <td className="username">
                    <Link to={`/users/${user.id}`}>{user.username}</Link>
                  </td>
                  <td className="name">
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.roleName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    <Link to={`/add-user-${user.id}`}>
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

export default User;
