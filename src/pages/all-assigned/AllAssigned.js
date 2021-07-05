import React, { useState, useEffect } from "react";

import Banner2 from "../../layouts/Banner2";
import Footer2 from "../../layouts/Footer2";
import Pagination from "../../components/componentDashs/Pagination";
import Assigned from "./assigned/Assigned";
import FilterResult from "../../components/componentDashs/FilterResult";
import DeleteBox from "../../components/componentDashs/DeleteBox";
import AddButton from "../../components/componentDashs/AddButton";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllAssigned,
  deleteAssigned,
} from "../../redux/assigned/assignedActions";

const AllAssigned = (props) => {
  document.title = "TLU | Quản lý phân công";
  const dispatch = useDispatch();
  const checkRight = props.match.url === "/assigned" ? true : false;

  useEffect(() => {
    dispatch(fetchAllAssigned());
  }, []);
  const allAssigned = useSelector((state) => state.assigned);

  const [data, setData] = useState();
  useEffect(() => {
    setData(allAssigned);
  }, [allAssigned]);

  const [currentIndex, setCurrentIndex] = useState(1);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [assignedDeleteId, setAssignedDeleteId] = useState();

  const searchDocuments = (value) => {
    const dataSearch = allAssigned.filter(
      (assigned) => assigned.name.toLowerCase().indexOf(value) !== -1
    );
    setData(dataSearch.slice(0, 10));
  };

  return (
    <>
      <Banner2 title={["Quản lý phân công"]} />

      <section className="management-page padding">
        <h1>Danh sách các phân công văn bản: </h1>

        <div className="search-box">
          <button>
            <input type="text" name="search" id="search" />
            <i className="fas fa-search"></i>
          </button>
        </div>
        {checkRight && (
          <AddButton link={"add-assigned"} text={"Thêm phân công"} />
        )}

        <div className="filter-container">
          <FilterResult text={"phân công"} data={data} dataAll={allAssigned} />
        </div>

        <Assigned
          allAssigned={data}
          checkRight={checkRight}
          setConfirmDelete={setConfirmDelete}
          setAssignedDeleteId={setAssignedDeleteId}
        />

        {data && data.length > 0 && allAssigned && allAssigned.length > 0 && (
          <Pagination
            recordsTotal={allAssigned.length}
            recordsNumber={10}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setData={setData}
            data={allAssigned}
          />
        )}

        <DeleteBox
          text="phân công"
          deleteFunction={deleteAssigned}
          id={assignedDeleteId}
          confirmDelete={confirmDelete}
          setConfirm={setConfirmDelete}
        />
      </section>

      <Footer2 />
    </>
  );
};

export default AllAssigned;
