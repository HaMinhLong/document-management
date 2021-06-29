import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";

import { fetchEmployees } from "../../../../redux/employees/employeesActions";

const Proccess = ({ allProccess, setConfirmDelete, setProccessId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);
  const employees = useSelector((state) => state.employees);

  const deleteProccess = (id) => {
    setConfirmDelete(true);
    setProccessId(id);
  };
  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tên tiến trình</th>
              <th>Mô tả</th>
              <th>Trạng thái</th>
              <th>Người lập</th>
              <th>Ngày tạo</th>
              {/* <th>Cập nhật lần cuối</th> */}
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {allProccess &&
              allProccess.length > 0 &&
              allProccess.map((proccess) => (
                <tr key={proccess.id}>
                  <td className="name">
                    <Link to={`/process/${proccess.id}`}>{proccess.name}</Link>
                  </td>
                  <td>{proccess.description.slice(0, 30)} ...</td>
                  <td>{proccess.status}</td>
                  <td>
                    {!proccess.employeeId
                      ? "admin"
                      : employees &&
                        employees.length > 0 &&
                        employees.find((emp) => emp.id === proccess.employeeId)
                          .name}
                  </td>
                  <td>{moment(proccess.createdAt).format("L")}</td>
                  {/* <td>{moment(proccess.updatedAt).format("L")}</td> */}
                  <td>
                    <Link to={`/add-proccess-${proccess.id}`}>
                      <i className="fas fa-edit"></i>
                    </Link>
                    <i
                      className="fas fa-trash"
                      onClick={() => deleteProccess(proccess.id)}
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

export default Proccess;
