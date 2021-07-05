import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import TableHead from "../../../components/componentDashs/TableHead";
const Right = ({ docTypes, setConfirmDelete, setId }) => {
  const deleteDocType = (id) => {
    setConfirmDelete(true);
    setId(id);
  };
  return (
    <>
      <div className="table-container">
        <table>
          <TableHead
            fields={[
              "Tên loại văn bản",
              "Ngày lập",
              "Cập nhật lần cuối",
              "Hành động",
            ]}
            checkRight={false}
          />
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
