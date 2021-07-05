import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import { fetchGroups } from "../../../redux/groups/groupsActions";
import { fetchEmployees } from "../../../redux/employees/employeesActions";
import TableHead from "../../../components/componentDashs/TableHead";

const User = ({ users, setConfirmDelete, setUsername, checkRight }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchEmployees());
  }, []);

  const groups = useSelector((state) => state.groups);
  const employees = useSelector((state) => state.employees);

  const deleteUser = (username) => {
    setConfirmDelete(true);
    setUsername(username);
  };
  return (
    <>
      <div className="table-container">
        <table>
          <TableHead
            fields={[
              "Tải khoản",
              "Nhân viên",
              "Chức vụ",
              "Ngày lập",
              "Cập nhật lần cuối",
            ]}
            checkRight={checkRight}
          />
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user) => (
                <tr key={user.username}>
                  <td className="name">
                    <Link to={`/users/${user.username || ""}`}>
                      {user.username || ""}
                    </Link>
                  </td>
                  <td>
                    {employees &&
                      employees.length > 0 &&
                      employees.find((emp) => emp.username === user.username) &&
                      employees.find((emp) => emp.username === user.username)
                        .name}
                  </td>
                  <td>
                    {groups &&
                      groups.length > 0 &&
                      groups.find((group) => group.id === user.groupId) &&
                      groups.find((group) => group.id === user.groupId).name}
                  </td>
                  {/* <td>{user.email}</td>
                  <td>{user.phoneNumber}</td> */}
                  <td>{moment(user.createdAt).format("L")}</td>
                  <td>{moment(user.updatedAt).format("L")}</td>
                  {checkRight && (
                    <td>
                      <Link to={`/add-user-${user.username}`}>
                        <i className="fas fa-edit"></i>
                      </Link>
                      <i
                        className="fas fa-trash"
                        onClick={() => deleteUser(user.username)}
                      ></i>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default User;
