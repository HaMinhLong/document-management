import React, { useEffect, useState } from "react";

import Banner2 from "../../layouts/Banner2";
import Footer2 from "../../layouts/Footer2";
import Pagination from "../../components/componentDashs/Pagination";
import GroupRight from "./group-right/GroupRight";
import { useSelector, useDispatch } from "react-redux";
import FilterResult from "../../components/componentDashs/FilterResult";
import DeleteBox from "../../components/componentDashs/DeleteBox";
import AddButton from "../../components/componentDashs/AddButton";
import FilterBox from "../../components/componentDashs/FilterBox";
import {
  fetchGroupRights,
  deleteGroupRight,
} from "../../redux/group-rights/groupRightsActions";
import { fetchGroups } from "../../redux/groups/groupsActions";

const GroupRights = () => {
  document.title = "TLU | Quản lý nhóm quyền";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroupRights());
    dispatch(fetchGroups());
  }, []);

  const groupRights = useSelector((state) => state.groupRights);
  const groups = useSelector((state) => state.groups);

  const [data, setData] = useState();

  useEffect(() => {
    setData(groupRights && groupRights.length > 0 && groupRights.slice(0, 10));
  }, [groupRights]);

  const [currentIndex, setCurrentIndex] = useState(1);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [groupRightId, setGroupRightId] = useState();

  const filterGroupRights = (value) => {
    value
      ? setData(
          groupRights.filter((data) => data.groupId === value).slice(0, 10)
        )
      : setData(groupRights.slice(0, 10));
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

        <AddButton link={"add-groupright"} text={"Cấp quyền"} />

        <div className="filter-container">
          <FilterResult text={"nhóm quyền"} data={data} dataAll={groupRights} />
          <div className="filter">
            <FilterBox
              text={"Chức vụ"}
              selectData={groups}
              filterFunction={filterGroupRights}
            />
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
            setData={setData}
            data={groupRights}
          />
        )}

        <DeleteBox
          text="nhóm quyền"
          deleteFunction={deleteGroupRight}
          id={groupRightId}
          confirmDelete={confirmDelete}
          setConfirm={setConfirmDelete}
        />
      </section>
      <Footer2 />
    </>
  );
};

export default GroupRights;
