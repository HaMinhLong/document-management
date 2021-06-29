import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Banner2 from "../../layout/Banner2";
import Footer2 from "../../layout/Footer2";
import Group from "./group/Group";

import { useSelector, useDispatch } from "react-redux";

import { fetchGroups, deleteGroup } from "../../../redux/groups/groupsActions";

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

  const deleteGroupFunction = (groupId) => {
    dispatch(deleteGroup(groupId));
    setConfirmDelete(false);
  };

  const searchGroups = (value) => {
    const dataSearch = groups.filter(
      (group) => group.name.toLowerCase().indexOf(value) !== -1
    );
    setData(dataSearch.slice(0, 10));
  };

  return (
    <>
      <Banner2 title={["Quản lý chức vụ"]} />
      <section className="management-page padding">
        <h1>Danh sách chức vụ :</h1>

        <div className="search-box">
          <button>
            <input
              type="text"
              name="search"
              id="search"
              onChange={(e) => searchGroups(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="add-button">
          <button>
            <Link to="/add-group">
              Thêm chức vụ <i className="fas fa-user-plus"></i>
            </Link>
          </button>
        </div>

        <div className="filter-container">
          <div className="filter-result">
            {data && data.length > 0 && groups && groups.length > 0 ? (
              <p>
                Hiển thị{" "}
                <span>
                  {data.length}/{groups.length}
                </span>{" "}
                chức vụ
              </p>
            ) : (
              <p>
                Hiển thị <span>0</span> chức vụ
              </p>
            )}
          </div>
        </div>

        <Group
          groups={data}
          setConfirmDelete={setConfirmDelete}
          setGroupId={setGroupId}
        />

        {confirmDelete && <span className="bg"></span>}
        {confirmDelete && (
          <div className="delete-employee">
            <p>Bạn có muốn xóa chức vụ này không?</p>
            <div className="confirm">
              <button onClick={() => deleteGroupFunction(groupId)}>Có</button>
              <button onClick={() => setConfirmDelete(false)}>Không</button>
            </div>
          </div>
        )}
      </section>
      <Footer2 />
    </>
  );
};

export default Groups;
