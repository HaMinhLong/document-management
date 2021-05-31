import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Role = ({ groups, setConfirmDelete, setGroupId }) => {
  const deleteGroup = (id) => {
    setConfirmDelete(true);
    setGroupId(id);
  };

  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tên chức vụ</th>
              <th>Ngày lập</th>
              <th>Cập nhật lần cuối</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {groups &&
              groups.length > 0 &&
              groups.map((group) => (
                <tr key={group.id}>
                  <td className="name">
                    <Link to={`/group/${group.id}`}>{group.name}</Link>
                  </td>
                  <td>{moment(group.createdAt).format("L")}</td>
                  <td>{moment(group.updatedAt).format("L")}</td>
                  <td>
                    <Link to={`/add-group-${group.id}`}>
                      <i className="fas fa-edit"></i>
                    </Link>
                    <i
                      className="fas fa-trash"
                      onClick={() => deleteGroup(group.id)}
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
