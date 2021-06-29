import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Sender = ({ senders, setConfirmDelete, setId }) => {
  const deleteRight = (id) => {
    setConfirmDelete(true);
    setId(id);
  };
  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tên nơi đến</th>
              <th>Ngày lập</th>
              <th>Cập nhật lần cuối</th>
              <th>Hành động</th>
            </tr>
          </thead>
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
