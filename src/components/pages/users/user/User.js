import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const User = ({ users, setConfirmDelete, setUsername }) => {
  const deleteUser = (username) => {
    setConfirmDelete(true);
    setUsername(username);
  };
  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tài khoản</th>
              {/* <th>Nhân viên</th> */}
              <th>Chức vụ</th>
              {/* <th>Email</th>
              <th>Phone Number</th> */}
              <th>Ngày lập</th>
              <th>Cập nhật lần cuối</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user) => (
                <tr key={user.username}>
                  <td className="name">
                    <Link to={`/users/${user.username}`}>{user.username}</Link>
                  </td>
                  {/* <td className="name">
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td> */}
                  <td>{user.roleName}</td>
                  {/* <td>{user.email}</td>
                  <td>{user.phoneNumber}</td> */}
                  <td>{moment(user.createdAt).format("L")}</td>
                  <td>{moment(user.updatedAt).format("L")}</td>
                  <td>
                    <Link to={`/add-user-${user.username}`}>
                      <i className="fas fa-edit"></i>
                    </Link>
                    <i
                      className="fas fa-trash"
                      onClick={() => deleteUser(user.username)}
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

export default User;
