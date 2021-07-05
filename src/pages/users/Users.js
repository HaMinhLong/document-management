import React, { useState, useEffect } from "react";
import Banner2 from "../../layouts/Banner2";
import Footer2 from "../../layouts/Footer2";
import User from "./user/User";
import Pagination from "../../components/componentDashs/Pagination";
import DeleteBox from "../../components/componentDashs/DeleteBox";
import FilterResult from "../../components/componentDashs/FilterResult";
import FilterBox from "../../components/componentDashs/FilterBox";
import AddButton from "../../components/componentDashs/AddButton";
import { useSelector, useDispatch } from "react-redux";

import { fetchUsers, deleteUser } from "../../redux/users/usersActions";

import { fetchGroups } from "../../redux/groups/groupsActions";

const Users = (props) => {
  document.title = "TLU | Quản lý tài khoản";
  const checkRight = props.match.url === "/user" ? true : false;
  const [currentIndex, setCurrentIndex] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
  }, []);
  const groups = useSelector((state) => state.groups);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users);
  const [data, setData] = useState();
  useEffect(() => {
    if (users.length > 10) {
      setData(users.slice((currentIndex - 1) * 10, currentIndex * 10));
    } else {
      setData(users);
    }
  }, [users]);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [username, setUsername] = useState();

  const searchUsers = (value) => {
    const dataSearch = users.filter(
      (user) => user.username.toLowerCase().indexOf(value) !== -1
    );
    setData(dataSearch.slice(0, 10));
  };

  const filterUsers = (group) => {
    if (group) {
      setData(
        users &&
          users.length > 0 &&
          users.filter((user) => user.groupId === group).slice(0, 10)
      );
    } else {
      setData(users && users.length > 0 && users.slice(0, 10));
    }
  };

  return (
    <>
      <Banner2 title={["Quản lý tài khoản"]} />

      <section className="management-page padding">
        <h1>Danh sách tài khoản :</h1>

        <div className="search-box">
          <button>
            <input
              type="text"
              name="search"
              id="search"
              onChange={(e) => searchUsers(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </button>
        </div>
        {checkRight && <AddButton link={"add-user"} text={"Thêm tài khoản"} />}

        <div className="filter-container">
          <FilterResult text={"tài khoản"} data={data} dataAll={users} />
          <div className="filter">
            <FilterBox
              text={"Bộ phận"}
              selectData={groups}
              filterFunction={filterUsers}
            />
          </div>
        </div>
        {/* {data && data.length > 0 && ( */}
        <User
          users={data}
          setConfirmDelete={setConfirmDelete}
          setUsername={setUsername}
          checkRight={checkRight}
        />

        {data && data.length > 0 && users && users.length > 0 && (
          <Pagination
            recordsTotal={users.length}
            recordsNumber={10}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setData={setData}
            data={users}
          />
        )}
        <DeleteBox
          text="tài khoản"
          setConfirm={setConfirmDelete}
          confirmDelete={confirmDelete}
          deleteFunction={deleteUser}
          id={username}
        />
      </section>
      <Footer2 />
    </>
  );
};

export default Users;
