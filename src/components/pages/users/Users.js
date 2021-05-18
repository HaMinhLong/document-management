import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Banner2 from "../../layout/Banner2";
import Pagination from "../../layout/Pagination";
import Footer2 from "../../layout/Footer2";
import User from "./user/User";

import { useSelector, useDispatch } from "react-redux";

import { fetchUsers, deleteUser } from "../../../redux/users/usersActions";

import { fetchRoles } from "../../../redux/roles/rolesActions";

const Users = () => {
  document.title = "TLU | Quản lý tài khoản";
  const [currentIndex, setCurrentIndex] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);
  const roles = useSelector((state) => state.roles);

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

  const nextPagination = (userNumber, currentIndex) => {
    setData(
      users.slice(userNumber * (currentIndex - 1), userNumber * currentIndex)
    );
  };

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [username, setUsername] = useState();

  const deleteUserFunction = (username) => {
    dispatch(deleteUser(username));
    setConfirmDelete(false);
  };

  const searchUsers = (value) => {
    const dataSearch = users.filter(
      (user) => user.username.toLowerCase().indexOf(value) !== -1
    );
    setData(dataSearch.slice(0, 10));
  };

  const filterUsers = (role) => {
    if (role) {
      setData(
        users &&
          users.length > 0 &&
          users.filter((user) => user.roleName === role).slice(0, 10)
      );
    } else {
      setData(users && users.length > 0 && users.slice(0, 10));
    }
  };

  return (
    <>
      <Banner2 title={["Quản lí tài khoản"]} />

      <section className="user-management padding">
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

        <div className="add-button">
          <button>
            <Link to="/add-user">
              Thêm tài khoản <i className="fas fa-user-plus"></i>
            </Link>
          </button>
        </div>

        <div className="filter-container">
          <div className="filter-result">
            <p>
              Hiển thị{" "}
              {data && data.length > 0 && users && users.length > 0 ? (
                <span>
                  {data.length}/{users.length}
                </span>
              ) : (
                <span>0 </span>
              )}{" "}
              tài khoản
            </p>
          </div>
          <div className="filter">
            <div className="filter-department">
              <p>Bộ phận: </p>
              <select onClick={(e) => filterUsers(e.target.value)}>
                <option value="">Tất cả</option>
                {roles &&
                  roles.length > 0 &&
                  roles.map((role) => (
                    <option key={role.roleId} value={role.name}>
                      {role.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        {/* {data && data.length > 0 && ( */}
        <User
          users={data}
          setConfirmDelete={setConfirmDelete}
          setUsername={setUsername}
        />

        {data && data.length > 0 && users && users.length > 0 && (
          <Pagination
            recordsTotal={users.length}
            recordsNumber={10}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            nextPagination={nextPagination}
          />
        )}
        {confirmDelete && <span className="bg"></span>}
        {confirmDelete && (
          <div className="delete-employee">
            <p>Bạn có muốn xóa tài khoản này không?</p>
            <div className="confirm">
              <button onClick={() => deleteUserFunction(username)}>Có</button>
              <button onClick={() => setConfirmDelete(false)}>Không</button>
            </div>
          </div>
        )}
      </section>
      <Footer2 />
    </>
  );
};

export default Users;
