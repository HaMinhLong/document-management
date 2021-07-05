import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import TableHead from "../../../components/componentDashs/TableHead";

const Sender = ({ senders, setConfirmDelete, setId }) => {
  const deleteRight = (id) => {
    setConfirmDelete(true);
    setId(id);
  };
  return (
    <>
      <div className="table-container">
        <table>
          <TableHead
            fields={[
              "Tên nơi đén",
              "Ngày lập",
              "Cập nhật lần cuối",
              "Hành động",
            ]}
            checkRight={false}
          />
          <tbody>
            {senders &&
              senders.length > 0 &&
              senders.map((sender) => (
                <tr key={sender.name}>
                  <td className="name">
                    <Link to={`/sender}`}>{sender.name}</Link>
                  </td>
                  <td>{moment(sender.createdAt).format("L")}</td>
                  <td>{moment(sender.updatedAt).format("L")}</td>
                  <td>
                    <Link to={`/add-sender-${sender.id}`}>
                      <i className="fas fa-edit"></i>
                    </Link>
                    <i
                      className="fas fa-trash"
                      onClick={() => deleteRight(sender.id)}
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

export default Sender;
