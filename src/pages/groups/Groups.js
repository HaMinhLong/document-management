import React, { useState, useEffect } from "react";

import Banner2 from "../../layouts/Banner2";
import Footer2 from "../../layouts/Footer2";
import Group from "./group/Group";
import DeleteBox from "../../components/componentDashs/DeleteBox";
import SearchBox from "../../components/componentDashs/SearchBox";
import FilterResult from "../../components/componentDashs/FilterResult";
import AddButton from "../../components/componentDashs/AddButton";
import { useSelector, useDispatch } from "react-redux";

import { fetchGroups, deleteGroup } from "../../redux/groups/groupsActions";

const Groups = () => {
  document.title = "TLU | Quản lý chức vụ";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  const groups = useSelector((state) => state.groups);

  const [data, setData] = useState();
  useEffect(() => {
    setData(groups);
  }, [groups]);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [groupId, setGroupId] = useState();

  return (
    <>
      <Banner2 title={["Quản lý chức vụ"]} />
      <section className="management-page padding">
        <h1>Danh sách chức vụ :</h1>

        <SearchBox data={groups} setData={setData} />

        <AddButton link={"add-group"} text={"Thêm chức vụ"} />

        <div className="filter-container">
          <FilterResult text={"chức vụ"} data={data} dataAll={groups} />
        </div>

        <Group
          groups={data}
          setConfirmDelete={setConfirmDelete}
          setGroupId={setGroupId}
        />

        <DeleteBox
          text="chức vụ"
          deleteFunction={deleteGroup}
          id={groupId}
          confirmDelete={confirmDelete}
          setConfirm={setConfirmDelete}
        />
      </section>
      <Footer2 />
    </>
  );
};

export default Groups;
