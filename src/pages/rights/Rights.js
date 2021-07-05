import React, { useState, useEffect } from "react";
import Banner2 from "../../layouts/Banner2";
import Footer2 from "../../layouts/Footer2";
import Pagination from "../../components/componentDashs/Pagination";
import Right from "./right/Right";
import DeleteBox from "../../components/componentDashs/DeleteBox";
import FilterResult from "../../components/componentDashs/FilterResult";
import AddButton from "../../components/componentDashs/AddButton";
import SearchBox from "../../components/componentDashs/SearchBox";

import { useSelector, useDispatch } from "react-redux";
import { fetchRights, deleteRight } from "../../redux/rights/rightsActions";

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

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [id, setId] = useState();

  return (
    <>
      <Banner2 title={["Quản lý quyền"]} />
      <section className="management-page padding">
        <h1>Danh sách quyền :</h1>

        <SearchBox data={rights} setData={setData} />

        <AddButton link={"add-right"} text={"Thêm quyền"} />

        <div className="filter-container">
          <FilterResult text={"quyền"} data={data} dataAll={rights} />
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
            setData={setData}
            data={rights}
          />
        )}

        <DeleteBox
          text="quyền"
          setConfirm={setConfirmDelete}
          confirmDelete={confirmDelete}
          deleteFunction={deleteRight}
          id={id}
        />
      </section>
      <Footer2 />
    </>
  );
};

export default Rights;
