import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Banner2 from "../../layout/Banner2";
import Pagination from "../../layout/Pagination";
import Footer2 from "../../layout/Footer2";
import Right from "./right/Right";

import { useSelector, useDispatch } from "react-redux";
import { fetchRights, deleteRight } from "../../../redux/rights/rightsActions";

const Rights = () => {
  document.title = "TLU | Quản lý quyền";
  const [currentIndex, setCurrentIndex] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRights());
  }, []);
  const rights = useSelector((state) => state.rights);
  const [data, setData] = useState();

  useEffect(() => {
    if (rights.length > 10) {
      setData(rights.slice((currentIndex - 1) * 10, currentIndex * 10));
    } else {
      setData(rights);
    }
  }, [rights]);

  const nextPagination = (rightNumber, currentIndex) => {
    setData(
      rights.slice(rightNumber * (currentIndex - 1), rightNumber * currentIndex)
    );
  };

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [id, setId] = useState();

  const deleteUserFunction = (id) => {
    dispatch(deleteRight(id));
    setConfirmDelete(false);
  };

  const searchRights = (value) => {
    const dataSearch = rights.filter(
      (right) => right.name.toLowerCase().indexOf(value) !== -1
    );
    setData(dataSearch.slice(0, 10));
  };

  return (
    <>
      <Banner2 title={["Quản lý quyền"]} />
      <section className="management-page padding">
        <h1>Danh sách quyền :</h1>

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
            <Link to="/add-right">
              Thêm quyền <i className="fas fa-user-plus"></i>
            </Link>
          </button>
        </div>

        <div className="filter-container">
          <div className="filter-result">
            <p>
              Hiển thị{" "}
              {data && data.length > 0 && rights && rights.length > 0 ? (
                <span>
                  {data.length}/{rights.length}
                </span>
              ) : (
                <span>0 </span>
              )}{" "}
              quyền
            </p>
          </div>
        </div>

        <Right
          rights={data}
          setConfirmDelete={setConfirmDelete}
          setId={setId}
        />
        {data && data.length > 0 && rights && rights.length > 0 && (
          <Pagination
            recordsTotal={rights.length}
            recordsNumber={10}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            nextPagination={nextPagination}
          />
        )}

        {confirmDelete && <span className="bg"></span>}
        {confirmDelete && (
          <div className="delete-employee">
            <p>Bạn có muốn xóa quyền này không?</p>
            <div className="confirm">
              <button onClick={() => deleteUserFunction(id)}>Có</button>
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
