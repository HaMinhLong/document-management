import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import TableHead from "../../../components/componentDashs/TableHead";

const Role = ({ groups, setConfirmDelete, setGroupId }) => {
  const deleteGroup = (id) => {
    setConfirmDelete(true);
    setGroupId(id);
  };

  return (
    <>
      <div className="table-container">
        <table>
          <TableHead
            fields={
              ("Tên chức vụ", "Ngày lập", "Cập nhật lần cuối", "Hành động")
            }
            checkRight={false}
          />
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
