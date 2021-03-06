import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { fetchOrganizational } from "../../../redux/organizational-structure/organizationalActions";
import { fetchDocTypes } from "../../../redux/docType/docTypesActions";
import { fetchAllAssigned } from "../../../redux/assigned/assignedActions";
import TableHead from "../../../components/componentDashs/TableHead";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Document = ({
  documents,
  checkRight,
  setConfirmDelete,
  setDocumentDeleteId,
  isDocManagement,
}) => {
  const groupId = localStorage.getItem("groupId");
  const employeeID = localStorage.getItem("employeeId");
  const departmentID = localStorage.getItem("departmentId");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrganizational());
    dispatch(fetchDocTypes());
    dispatch(fetchAllAssigned());
  }, []);
  const organizational = useSelector((state) => state.organizational);
  const docTypes = useSelector((state) => state.docTypes);
  const allAssigned = useSelector((state) => state.assigned);

  const deleteDocument = (id) => {
    setConfirmDelete(true);
    setDocumentDeleteId(id);
  };
  return (
    <>
      <div className="table-container">
        {!isDocManagement && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 30,
              marginTop: 30,
            }}
          >
            <span> </span>
            <ReactHTMLTableToExcel
              id="test-table-xls-button-v2"
              className="download-table-xls-button"
              table="document-to-xls"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Export to Excel"
            />
          </div>
        )}
        <table id="document-to-xls">
          <TableHead
            fields={[
              "M?? v??n b???n",
              "T??n v??n b???n",
              "T??nh tr???ng",
              "Lo???i v??n b???n",
              "B??? ph???n",
            ]}
            checkRight={checkRight}
          />
          <tbody>
            {documents &&
              documents.length > 0 &&
              documents.map((document) => (
                <tr key={document.id}>
                  <td className="name">
                    <Link to={`/document/${document.id}`}>{document.code}</Link>
                  </td>
                  <td className="name">
                    <Link to={`/document/${document.id}`}>{document.name}</Link>
                  </td>
                  {/* <td>{document.description.slice(0, 30)}...</td> */}
                  <td>{document.status}</td>
                  <td>
                    {(docTypes &&
                      docTypes.length > 0 &&
                      docTypes.find((type) => type.id === document.docTypeId)
                        .name) ||
                      ""}
                  </td>
                  <td>
                    {organizational &&
                      organizational.length > 0 &&
                      document.departmentId &&
                      organizational.find(
                        (dmp) => dmp.id === document.departmentId
                      ).name}
                  </td>
                  {/* <td>{moment(document.createdAt).format("L")}</td> */}
                  {checkRight && (
                    <td>
                      <Link to={`/add-document-${document.id}`}>
                        <i className="fas fa-edit"></i>
                      </Link>
                      <i
                        className="fas fa-trash"
                        onClick={() => deleteDocument(document.id)}
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

export default Document;
