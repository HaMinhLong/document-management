import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Banner2 from "../../layout/Banner2";
import Pagination from "../../layout/Pagination";
import Document from "./document/Document";
import Footer2 from "../../layout/Footer2";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllDocuments,
  fetchDocumentsByDep,
  fetchDocumentsByAssign,
  deleteDocument,
} from "../../../redux/documents/documentsActions";
import { fetchDocTypes } from "../../../redux/docType/docTypesActions";

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

  useEffect(() => {
    dispatch(fetchAllDocuments());
    dispatch(fetchDocTypes());
  }, []);

  const documents = useSelector((state) => state.documents);
  const docTypes = useSelector((state) => state.docTypes);
  // 167751611920858000 van_ban_thong_bao
  // 39504437639007016 van_ban_phan_cong
  const [data, setData] = useState();
  useEffect(() => {
    setData(
      groupId === "461341600943357060" || groupId === "222908158858354780"
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
  const nextPagination = (documentNumber, currentIndex) => {
    setData(
      documents.slice(
        documentNumber * (currentIndex - 1),
        documentNumber * currentIndex
      )
    );
  };

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [documentDeleteId, setDocumentDeleteId] = useState();

  const deleteDocumentFunction = (id) => {
    dispatch(deleteDocument(id));
    setConfirmDelete(false);
  };

  const searchDocuments = (value) => {
    const dataSearch = documents.filter(
      (document) => document.name.toLowerCase().indexOf(value) !== -1
    );
    setData(dataSearch.slice(0, 10));
  };

  const docStatus = [
    { name: "Chờ duyệt" },
    { name: "Từ chối" },
    { name: "Tiến hành" },
    { name: "Trưởng phòng thực hiện" },
    { name: "Nhân viên thực hiện" },
    { name: "Chờ trưởng phòng duyệt" },
    { name: "Xác nhận hoàn thành" },
    { name: "Đã hoàn thành" },
  ];

  const types2 = [
    {
      id: "167751611920858000",
      name: "Tất cả văn bản",
    },
    {
      id: "pcByEmp",
      name: "Văn bản được phân công",
    },
    {
      id: "pcByDep",
      name: "Văn bản phân công theo bộ phận",
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
    setData(documents.filter((doc) => doc.status === value));
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

        <div className="filter-container">
          <div className="filter-result">
            <p>
              Hiển thị{" "}
              {data && data.length > 0 && documents && documents.length > 0 ? (
                <span>
                  {data.length}/{documents.length}
                </span>
              ) : (
                <span>0 </span>
              )}{" "}
              văn bản
            </p>
          </div>

          <div className="filter">
            {(groupId === "461341600943357060" ||
              groupId === "222908158858354780") && (
              <div className="filter-department">
                <p>Tình trạng: </p>
                <select
                  onClick={(e) => filterDocumentsByStatus(e.target.value)}
                >
                  {/* {groupId === "461341600943357060" ||
                    (groupId === "222908158858354780" && (
                      <option value="">Tất cả</option>
                    ))} */}
                  {docStatus &&
                    docStatus.length > 0 &&
                    docStatus.map((type) => (
                      <option key={type.name} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            {checkRight && (
              <div className="filter-department">
                <p>Loại văn bản: </p>
                <select onClick={(e) => filterDocuments(e.target.value)}>
                  {/* {groupId === "461341600943357060" ||
                    (groupId === "222908158858354780" && (
                      <option value="">Tất cả</option>
                    ))} */}
                  {docTypes &&
                    docTypes.length > 0 &&
                    docTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            {!checkRight && (
              <div className="filter-department">
                <p>Loại văn bản: </p>
                <select onClick={(e) => filterDocuments2(e.target.value)}>
                  {types2 &&
                    types2.length > 0 &&
                    types2.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <Document
          documents={data}
          checkRight={checkRight}
          setConfirmDelete={setConfirmDelete}
          setDocumentDeleteId={setDocumentDeleteId}
        />

        {data && data.length > 0 && documents && documents.length > 0 && (
          <Pagination
            recordsTotal={documents.length}
            recordsNumber={10}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            nextPagination={nextPagination}
          />
        )}

        {confirmDelete && <span className="bg"></span>}
        {confirmDelete && (
          <div className="delete-employee">
            <p>Bạn có muốn xóa văn bản này không?</p>
            <div className="confirm">
              <button onClick={() => deleteDocumentFunction(documentDeleteId)}>
                Có
              </button>
              <button onClick={() => setConfirmDelete(false)}>Không</button>
            </div>
          </div>
        )}
      </section>
      <Footer2 />
    </>
  );
};

export default Documents;
