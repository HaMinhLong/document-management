import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import TableHead from "../../../components/componentDashs/TableHead";

const Right = ({ rights, setConfirmDelete, setId }) => {
  const deleteRight = (id) => {
    setConfirmDelete(true);
    setId(id);
  };
  return (
    <>
      <div className="table-container">
        <table>
          <TableHead
            fields={["Tên quyền", "Ngày lập", "Cập nhật lần cuối", "Hành đồng"]}
            checkRight={false}
          />
          <tbody>
            {rights &&
              rights.length > 0 &&
              rights.map((right) => (
                <tr key={right.name}>
                  <td className="name">
                    <Link to={`/right/${right.id}`}>{right.name}</Link>
                  </td>
                  <td>{moment(right.createdAt).format("L")}</td>
                  <td>{moment(right.updatedAt).format("L")}</td>
                  <td>
                    <Link to={`/add-right-${right.id}`}>
                      <i className="fas fa-edit"></i>
                    </Link>
                    <i
                      className="fas fa-trash"
                      onClick={() => deleteRight(right.id)}
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

export default Right;
