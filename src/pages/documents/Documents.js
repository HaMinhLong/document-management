import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Banner2 from "../../layouts/Banner2";
import Footer2 from "../../layouts/Footer2";
import Pagination from "../../components/componentDashs/Pagination";
import Document from "./document/Document";
import FilterResult from "../../components/componentDashs/FilterResult";
import DeleteBox from "../../components/componentDashs/DeleteBox";
import FilterBox from "../../components/componentDashs/FilterBox";
import { useSelector, useDispatch } from "react-redux";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import TableHead from "../../components/componentDashs/TableHead";
import moment from "moment";

import {
  fetchAllDocuments,
  fetchDocumentsByDep,
  fetchDocumentsByAssign,
  deleteDocument,
} from "../../redux/documents/documentsActions";
import { fetchDocTypes } from "../../redux/docType/docTypesActions";
import { fetchOrganizational } from "../../redux/organizational-structure/organizationalActions";
import { checkDocManagement } from "../../utils/utils";

const Documents = (props) => {
  document.title = "TLU | Quản lý văn bản";
  const dispatch = useDispatch();
  const checkRight =
    props.match.url === "/incoming-document" ||
    props.match.url === "/internal-document"
      ? true
      : false;
  const groupId = localStorage.getItem("groupId");
  const employeeID = localStorage.getItem("employeeId");
  const departmentID = localStorage.getItem("departmentId");
  const isDocManagement = checkDocManagement(groupId);

  useEffect(() => {
    isDocManagement
      ? dispatch(fetchAllDocuments())
      : dispatch(fetchDocumentsByDep(departmentID));
    dispatch(fetchDocTypes());
    dispatch(fetchOrganizational());
  }, []);

  const documents = useSelector((state) => state.documents);
  const docTypes = useSelector((state) => state.docTypes);
  const departments = useSelector((state) => state.organizational);
  // 167751611920858000 van_ban_thong_bao
  // 39504437639007016 van_ban_phan_cong
  const [data, setData] = useState();
  useEffect(() => {
    setData(
      isDocManagement
        ? documents &&
            documents.length > 0 &&
            documents
              .filter((document) => document.docTypeId === "167751611920858000")
              .slice(0, 10)
        : documents &&
            documents.length > 0 &&
            documents
              .filter(
                (document) =>
                  (document.employeeId === employeeID ||
                    (document.status !== "Chờ duyệt" &&
                      document.state !== "Từ chỗi")) &&
                  (document.docTypeId === "167751611920858000" ||
                    document.docTypeId === "39504437639007016")
              )
              .slice(0, 10)
    );
  }, [documents]);

  const [currentIndex, setCurrentIndex] = useState(1);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [documentDeleteId, setDocumentDeleteId] = useState();

  const docStatus = [
    { id: "Chờ duyệt", name: "Chờ duyệt" },
    { id: "Từ chối", name: "Từ chối" },
    { id: "Tiến hành", name: "Tiến hành" },
    { id: "Trưởng phòng thực hiện", name: "Trưởng phòng thực hiện" },
    { id: "Nhân viên thực hiện", name: "Nhân viên thực hiện" },
    { id: "Chờ trưởng phòng duyệt", name: "Chờ trưởng phòng duyệt" },
    { id: "Xác nhận hoàn thành", name: "Xác nhận hoàn thành" },
    { id: "Đã hoàn thành", name: "Đã hoàn thành" },
  ];

  const types2 = [
    // {
    //   id: "167751611920858000",
    //   name: "Tất cả văn bản",
    // },
    {
      id: "pcByDep",
      name: "Văn bản theo bộ phận",
    },
    {
      id: "pcByEmp",
      name: "Văn bản được phân công",
    },
  ];

  const filterDocuments = (value) => {
    value === ""
      ? dispatch(fetchAllDocuments())
      : setData(documents.filter((document) => document.docTypeId === value));
  };

  const filterDocuments2 = (value) => {
    value === "167751611920858000"
      ? dispatch(fetchAllDocuments())
      : value === "pcByEmp"
      ? dispatch(fetchDocumentsByAssign(employeeID))
      : dispatch(fetchDocumentsByDep(departmentID));
  };

  const filterDocumentsByStatus = (value) => {
    value
      ? setData(documents.filter((doc) => doc.status === value))
      : setData(documents.slice(0, 10));
  };
  const filterDocumentsByDepartment = (value) => {
    value
      ? setData(documents.filter((doc) => doc.departmentId === value))
      : setData(documents.slice(0, 10));
  };

  return (
    <>
      <Banner2 title={["Quản lý văn bản"]} />
      <section className="management-page padding">
        <h1>Danh sách các văn bản của trường Đại học Thăng Long: </h1>

        <div className="search-box">
          <button>
            <input type="text" name="search" id="search" />
            <i className="fas fa-search"></i>
          </button>
        </div>

        {checkRight && (
          <div className="add-button">
            <button>
              <Link
                to={
                  props.match.url === "/incoming-document"
                    ? "/add-incoming-document"
                    : "/add-internal-document"
                }
              >
                {props.match.url === "/incoming-document"
                  ? "Thêm văn bản đến"
                  : "Thêm văn bản nội bộ"}{" "}
                <i className="fas fa-user-plus"></i>
              </Link>
            </button>
          </div>
        )}
        {isDocManagement && (
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
              table="table-to-xls-v2"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Export to Excel"
            />
          </div>
        )}
        <div className="filter-container">
          <FilterResult text={"văn bản"} data={data} dataAll={documents} />

          <div className="filter">
            {isDocManagement && (
              <>
                <FilterBox
                  text={"Tình trạng"}
                  selectData={docStatus}
                  filterFunction={filterDocumentsByStatus}
                />
                <FilterBox
                  text={"Bộ phận"}
                  selectData={departments}
                  filterFunction={filterDocumentsByDepartment}
                />
              </>
            )}
            {checkRight && (
              <FilterBox
                text={"Loại văn bản"}
                selectData={docTypes}
                filterFunction={filterDocuments}
              />
            )}
            {!checkRight && (
              <FilterBox
                text={"Loại văn bản"}
                selectData={types2}
                filterFunction={filterDocuments2}
              />
            )}
          </div>
        </div>

        <div style={{ display: "none" }} className="table-container">
          <table id="table-to-xls-v2">
            <TableHead
              fields={[
                "Mã văn bản",
                "Tên văn bản",
                "Tình trạng",
                "Loại văn bản",
                "Bộ phận",
                "Ngày tạo",
              ]}
              checkRight={false}
            />
            <tbody>
              {documents &&
                documents.length > 0 &&
                documents.map((document) => (
                  <tr key={document.id}>
                    <td className="name">
                      <Link to={`/document/${document.id}`}>
                        {document.code}
                      </Link>
                    </td>
                    <td className="name">
                      <Link to={`/document/${document.id}`}>
                        {document.name}
                      </Link>
                    </td>
                    {/* <td>{document.description.slice(0, 30)}...</td> */}
                    <td>{document.status}</td>
                    <td>
                      {(docTypes &&
                        docTypes.length > 0 &&
                        docTypes.find(
                          (type) => type.id === document.docTypeId
                        ) &&
                        docTypes.find((type) => type.id === document.docTypeId)
                          .name) ||
                        ""}
                    </td>
                    <td>
                      {departments &&
                        departments.length > 0 &&
                        document.departmentId &&
                        departments.find(
                          (dmp) => dmp.id === document.departmentId
                        ).name}
                    </td>
                    <td>{moment(document.createdAt).format("L")}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Document
          documents={data}
          checkRight={checkRight}
          setConfirmDelete={setConfirmDelete}
          setDocumentDeleteId={setDocumentDeleteId}
          isDocManagement={isDocManagement}
        />

        {data && data.length > 0 && documents && documents.length > 0 && (
          <Pagination
            recordsTotal={documents.length}
            recordsNumber={10}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setData={setData}
            data={documents}
          />
        )}

        <DeleteBox
          text="văn bản"
          deleteFunction={deleteDocument}
          id={documentDeleteId}
          confirmDelete={confirmDelete}
          setConfirm={setConfirmDelete}
        />
      </section>
      <Footer2 />
    </>
  );
};

export default Documents;
