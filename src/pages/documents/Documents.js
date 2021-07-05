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
import {
  fetchAllDocuments,
  fetchDocumentsByDep,
  fetchDocumentsByAssign,
  deleteDocument,
} from "../../redux/documents/documentsActions";
import { fetchDocTypes } from "../../redux/docType/docTypesActions";

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
    value
      ? setData(documents.filter((doc) => doc.status === value))
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

        <div className="filter-container">
          <FilterResult text={"văn bản"} data={data} dataAll={documents} />

          <div className="filter">
            {(groupId === "461341600943357060" ||
              groupId === "222908158858354780") && (
              <FilterBox
                text={"Tình trạng"}
                selectData={docStatus}
                filterFunction={filterDocumentsByStatus}
              />
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
