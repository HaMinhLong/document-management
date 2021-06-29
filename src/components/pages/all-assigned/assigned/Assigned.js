import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../../../redux/employees/employeesActions";
import { fetchAllDocuments } from "../../../../redux/documents/documentsActions";
import { fetchRoles } from "../../../../redux/roles/rolesActions";

const Assigned = ({
  allAssigned,
  checkRight,
  setConfirmDelete,
  setAssignedDeleteId,
}) => {
  const dispatch = useDispatch();

  const documentId = localStorage.getItem("documentId");

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchAllDocuments());
    dispatch(fetchRoles());
  }, []);

  const employees = useSelector((state) => state.employees);
  const documents = useSelector((state) => state.documents);
  const roles = useSelector((state) => state.roles);

  const deleteAssigned = (id) => {
    setConfirmDelete(true);
    setAssignedDeleteId(id);
  };

  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Người thực hiện</th>
              <th>Văn bản</th>
              <th>Vai trò</th>
              <th>Ngày tạo</th>
              <th>Cập nhật lần cuối</th>
              {checkRight && <th>Hành động</th>}
            </tr>
          </thead>
          <tbody>
            {allAssigned &&
              allAssigned.length > 0 &&
              allAssigned.map((assigned) => (
                <tr key={assigned.id}>
                  <td className="name">
                    <Link to={`/assigned/${assigned.id}`}>
                      {employees &&
                        employees.length > 0 &&
                        employees.find((emp) => emp.id === assigned.employeeId)
                          .name}
                    </Link>
                  </td>
                  <td>
                    {documents &&
                      documents.length > 0 &&
                      assigned.documentId &&
                      assigned &&
                      assigned.documentId &&
                      documents.find(
                        (document) => document.id === assigned.documentId
                      ).name}
                  </td>
                  <td>
                    {roles &&
                      roles.length > 0 &&
                      roles.find((role) => role.id === assigned.roleId)
                        .role_name}
                  </td>
                  <td>{moment(assigned.createdAt).format("L")}</td>
                  <td>{moment(assigned.updatedAt).format("L")}</td>

                  {checkRight && (
                    <td>
                      <Link to={`/add-assigned-${assigned.id}`}>
                        <i className="fas fa-edit"></i>
                      </Link>
                      <i
                        className="fas fa-trash"
                        onClick={() => deleteAssigned(assigned.id)}
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

export default Assigned;
