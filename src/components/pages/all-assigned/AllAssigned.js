import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Banner2 from "../../layout/Banner2";
import Pagination from "../../layout/Pagination";
import Assigned from "./assigned/Assigned";
import Footer2 from "../../layout/Footer2";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllAssigned,
  deleteAssigned,
} from "../../../redux/assigned/assignedActions";

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
  const nextPagination = (assignedNumber, currentIndex) => {
    setData(
      allAssigned.slice(
        assignedNumber * (currentIndex - 1),
        assignedNumber * currentIndex
      )
    );
  };

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [assignedDeleteId, setAssignedDeleteId] = useState();

  const deleteAssignedFunction = (id) => {
    dispatch(deleteAssigned(id));
    setConfirmDelete(false);
  };

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
          <div className="add-button">
            <button>
              <Link to="/add-assigned">
                Thêm phân công <i className="fas fa-user-plus"></i>
              </Link>
            </button>
          </div>
        )}

        <div className="filter-container">
          <div className="filter-result">
            <p>
              Hiển thị{" "}
              {data &&
              data.length > 0 &&
              allAssigned &&
              allAssigned.length > 0 ? (
                <span>
                  {data.length}/{allAssigned.length}
                </span>
              ) : (
                <span>0 </span>
              )}{" "}
              phân công
            </p>
          </div>
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
            nextPagination={nextPagination}
          />
        )}

        {confirmDelete && <span className="bg"></span>}
        {confirmDelete && (
          <div className="delete-employee">
            <p>Bạn có muốn xóa phân công này không?</p>
            <div className="confirm">
              <button onClick={() => deleteAssignedFunction(assignedDeleteId)}>
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

export default AllAssigned;
