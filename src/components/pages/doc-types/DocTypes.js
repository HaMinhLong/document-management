import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Banner2 from "../../layout/Banner2";
import Pagination from "../../layout/Pagination";
import Footer2 from "../../layout/Footer2";
import DocType from "./doc-type/DocType";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchDocTypes,
  deleteDocType,
} from "../../../redux/docType/docTypesActions";

const Rights = () => {
  document.title = "TLU | Quản lý loại văn bản";
  const [currentIndex, setCurrentIndex] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDocTypes());
  }, []);
  const docTypes = useSelector((state) => state.docTypes);
  const [data, setData] = useState();

  useEffect(() => {
    if (docTypes.length > 10) {
      setData(docTypes.slice((currentIndex - 1) * 10, currentIndex * 10));
    } else {
      setData(docTypes);
    }
  }, [docTypes]);

  const nextPagination = (rightNumber, currentIndex) => {
    setData(
      docTypes.slice(
        rightNumber * (currentIndex - 1),
        rightNumber * currentIndex
      )
    );
  };

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [id, setId] = useState();

  const deleteDocTypeFunction = (id) => {
    dispatch(deleteDocType(id));
    setConfirmDelete(false);
  };

  const searchRights = (value) => {
    const dataSearch = docTypes.filter(
      (right) => right.name.toLowerCase().indexOf(value) !== -1
    );
    setData(dataSearch.slice(0, 10));
  };

  return (
    <>
      <Banner2 title={["Quản lý loại văn bản"]} />
      <section className="management-page padding">
        <h1>Danh sách loại văn bản :</h1>

        <div className="search-box">
          <button>
            <input
              type="text"
              name="search"
              id="search"
              onChange={(e) => searchRights(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="add-button">
          <button>
            <Link to="/add-doc-type">
              Thêm loại văn bản <i className="fas fa-user-plus"></i>
            </Link>
          </button>
        </div>

        <div className="filter-container">
          <div className="filter-result">
            <p>
              Hiển thị{" "}
              {data && data.length > 0 && docTypes && docTypes.length > 0 ? (
                <span>
                  {data.length}/{docTypes.length}
                </span>
              ) : (
                <span>0 </span>
              )}{" "}
              loại văn bản
            </p>
          </div>
        </div>

        <DocType
          docTypes={data}
          setConfirmDelete={setConfirmDelete}
          setId={setId}
        />
        {data && data.length > 0 && docTypes && docTypes.length > 0 && (
          <Pagination
            recordsTotal={docTypes.length}
            recordsNumber={10}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            nextPagination={nextPagination}
          />
        )}

        {confirmDelete && <span className="bg"></span>}
        {confirmDelete && (
          <div className="delete-employee">
            <p>Bạn có muốn xóa loại văn bản này không?</p>
            <div className="confirm">
              <button onClick={() => deleteDocTypeFunction(id)}>Có</button>
              <button onClick={() => setConfirmDelete(false)}>Không</button>
            </div>
          </div>
        )}
      </section>
      <Footer2 />
    </>
  );
};

export default Rights;
