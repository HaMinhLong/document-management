import React, { useState, useEffect } from "react";

import Banner2 from "../../layouts/Banner2";
import Footer2 from "../../layouts/Footer2";
import Pagination from "../../components/componentDashs/Pagination";
import Proccess from "./proccess/Proccess";
import FilterResult from "../../components/componentDashs/FilterResult";
import FilterBox from "../../components/componentDashs/FilterBox";
import DeleteBox from "../../components/componentDashs/DeleteBox";
import AddButton from "../../components/componentDashs/AddButton";

import { useSelector, useDispatch } from "react-redux";

import {
  fetchAllProccess,
  deleteProccess,
} from "../../redux/proccess/proccessActions";

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

        <AddButton link={"add-proccess"} text={"Thêm tiến trình"} />
        <div className="filter-container">
          <FilterResult text={"tiến trình"} data={data} dataAll={allProccess} />
          <FilterBox
            text={"Trạng thái"}
            selectData={[
              { id: "Tiến hành", name: "Tiến hành" },
              { id: "Kết thúc", name: "Kết thúc" },
            ]}
            filterFunction={filterProccess}
          />
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
            setData={setData}
            data={allProccess}
          />
        )}

        <DeleteBox
          text="tiến trình"
          deleteFunction={deleteProccess}
          id={proccessId}
          confirmDelete={deleteProccess}
          setConfirm={setConfirmDelete}
        />
      </section>
      <Footer2 />
    </>
  );
};

export default AllProccess;
