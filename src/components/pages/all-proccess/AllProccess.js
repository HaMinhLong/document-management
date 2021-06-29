import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Banner2 from "../../layout/Banner2";
import Footer2 from "../../layout/Footer2";
import Pagination from "../../layout/Pagination";
import Proccess from "./proccess/Proccess";

import { useSelector, useDispatch } from "react-redux";

import {
  fetchAllProccess,
  deleteProccess,
} from "../../../redux/proccess/proccessActions";

const AllProccess = () => {
  document.title = "TLU | Quản lý tiến trình văn bản";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProccess());
  }, []);

  const allProccess = useSelector((state) => state.proccess);

  const [data, setData] = useState();
  useEffect(() => {
    allProccess && allProccess.length > 0
      ? setData(allProccess.slice(0, 10))
      : setData({});
  }, [allProccess]);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [proccessId, setProccessId] = useState();

  const [currentIndex, setCurrentIndex] = useState(1);
  const nextPagination = (proccessNumber, currentIndex) => {
    setData(
      allProccess.slice(
        proccessNumber * (currentIndex - 1),
        proccessNumber * currentIndex
      )
    );
  };

  const deleteProccessFunction = (proccessId) => {
    dispatch(deleteProccess(proccessId));
    setConfirmDelete(false);
  };

  const filterProccess = (status) => {
    status && allProccess && allProccess.length > 0
      ? setData(
          allProccess
            .filter((proccess) => proccess.status === status)
            .slice(0, 10)
        )
      : setData(allProccess.slice(0, 10));
  };

  return (
    <>
      <Banner2 title={["Quản lý tiến trình văn bản"]} />
      <section className="management-page padding">
        <h1>Danh sách các tiến trình văn bản: </h1>

        <div className="search-box">
          <button>
            <input type="text" name="search" id="search" />
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="add-button">
          <button>
            <Link to="/add-proccess">
              Thêm tiến trình <i className="fas fa-user-plus"></i>
            </Link>
          </button>
        </div>

        <div className="filter-container">
          <div className="filter-result">
            <p>
              Hiển thị{" "}
              {data &&
              data.length > 0 &&
              allProccess &&
              allProccess.length > 0 ? (
                <span>
                  {data.length}/{allProccess.length}
                </span>
              ) : (
                <span>0 </span>
              )}{" "}
              tiến trình
            </p>
          </div>
          <div className="filter">
            <div className="filter-department">
              <p>Trạng thái: </p>
              <select onClick={(e) => filterProccess(e.target.value)}>
                <option value="">Tất cả</option>
                <option value="Tiến hành">Tiến hành</option>
                <option value="Kết thúc">Kết thúc </option>
              </select>
            </div>
          </div>
        </div>

        <Proccess
          allProccess={data}
          setConfirmDelete={setConfirmDelete}
          setProccessId={setProccessId}
        />

        {data && data.length > 0 && allProccess && allProccess.length > 0 && (
          <Pagination
            recordsTotal={allProccess.length}
            recordsNumber={10}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            nextPagination={nextPagination}
          />
        )}

        {confirmDelete && <span className="bg"></span>}
        {confirmDelete && (
          <div className="delete-employee">
            <p>Bạn có muốn xóa chức vụ này không?</p>
            <div className="confirm">
              <button onClick={() => deleteProccessFunction(proccessId)}>
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

export default AllProccess;
