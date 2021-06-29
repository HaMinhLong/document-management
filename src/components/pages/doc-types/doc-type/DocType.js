import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Right = ({ docTypes, setConfirmDelete, setId }) => {
  const deleteDocType = (id) => {
    setConfirmDelete(true);
    setId(id);
  };
  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tên loại văn bản</th>
              <th>Ngày lập</th>
              <th>Cập nhật lần cuối</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {docTypes &&
              docTypes.length > 0 &&
              docTypes.map((type) => (
                <tr key={type.name}>
                  <td className="name">{type.name}</td>
                  <td>{moment(type.createdAt).format("L")}</td>
                  <td>{moment(type.updatedAt).format("L")}</td>
                  <td>
                    <Link to={`/add-doc-type-${type.id}`}>
                      <i className="fas fa-edit"></i>
                    </Link>
                    <i
                      className="fas fa-trash"
                      onClick={() => deleteDocType(type.id)}
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
