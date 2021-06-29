import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Banner2 from "../../layout/Banner2";
import Footer2 from "../../layout/Footer2";
import Pagination from "../../layout/Pagination";
import GroupRight from "./group-right/GroupRight";

import { useSelector, useDispatch } from "react-redux";

import {
  fetchGroupRights,
  deleteGroupRight,
} from "../../../redux/group-rights/groupRightsActions";

const GroupRights = () => {
  document.title = "TLU | Quản lý nhóm quyền";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroupRights());
  }, []);

  const groupRights = useSelector((state) => state.groupRights);

  const [data, setData] = useState();

  useEffect(() => {
    setData(groupRights && groupRights.length > 0 && groupRights.slice(0, 10));
  }, [groupRights]);

  const [currentIndex, setCurrentIndex] = useState(1);
  const nextPagination = (groupRightNumber, currentIndex) => {
    setData(
      groupRights.slice(
        groupRightNumber * (currentIndex - 1),
        groupRightNumber * currentIndex
      )
    );
  };

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [groupRightId, setGroupRightId] = useState();
  const deleteGroupRightFunction = (groupRightId) => {
    dispatch(deleteGroupRight(groupRightId));
    setConfirmDelete(false);
  };

  return (
    <>
      <Banner2 title={["Quản lý nhóm quyền"]} />
      <section className="management-page padding">
        <h1>Danh sách nhóm quyền: </h1>

        {/* <div className="search-box">
          <button>
            <input type="text" name="search" id="search" />
            <i className="fas fa-search"></i>
          </button>
        </div> */}

        <div className="add-button">
          <button>
            <Link to="/add-groupright">
              Cấp quyền <i className="fas fa-user-plus"></i>
            </Link>
          </button>
        </div>

        <div className="filter-container">
          <div className="filter-result">
            <p>
              Hiển thị{" "}
              {data &&
              data.length > 0 &&
              groupRights &&
              groupRights.length > 0 ? (
                <span>
                  {data.length}/{groupRights.length}
                </span>
              ) : (
                <span>0 </span>
              )}{" "}
              nhóm quyền
            </p>
          </div>
        </div>

        <GroupRight
          groupRights={data}
          setConfirmDelete={setConfirmDelete}
          setGroupRightId={setGroupRightId}
        />

        {data && data.length > 0 && groupRights && groupRights.length > 0 && (
          <Pagination
            recordsTotal={groupRights.length}
            recordsNumber={10}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            nextPagination={nextPagination}
          />
        )}

        {confirmDelete && <span className="bg"></span>}
        {confirmDelete && (
          <div className="delete-employee">
            <p>Bạn có muốn xóa nhóm quyền này không?</p>
            <div className="confirm">
              <button onClick={() => deleteGroupRightFunction(groupRightId)}>
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

export default GroupRights;
