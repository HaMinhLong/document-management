import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Banner2 from "../../layout/Banner2";
import Footer2 from "../../layout/Footer2";
import Role from "./role/Role";

import { useSelector, useDispatch } from "react-redux";

import { fetchRoles, deleteRole } from "../../../redux/roles/rolesActions";

const Roles = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  const roles = useSelector((state) => state.roles);

  const [data, setData] = useState();
  useEffect(() => {
    setData(roles);
  }, [roles]);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [roleId, setRoleId] = useState();

  const deleteRoleFunction = (roleId) => {
    dispatch(deleteRole(roleId));
    setConfirmDelete(false);
  };

  const searchRoles = (value) => {
    const dataSearch = roles.filter(
      (role) => role.name.toLowerCase().indexOf(value) !== -1
    );
    setData(dataSearch.slice(0, 10));
  };

  return (
    <>
      <Banner2 title={["Quản lí chức vụ"]} />
      <section className="user-management padding">
        <h1>Danh sách chức vụ :</h1>

        <div className="search-box">
          <button>
            <input
              type="text"
              name="search"
              id="search"
              onChange={(e) => searchRoles(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="add-button">
          <button>
            <Link to="/add-role">
              Thêm chức vụ <i className="fas fa-user-plus"></i>
            </Link>
          </button>
        </div>

        <div className="filter-container">
          <div className="filter-result">
            {data && data.length > 0 && roles && roles.length > 0 ? (
              <p>
                Hiển thị{" "}
                <span>
                  {data.length}/{roles.length}
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
        <Role
          roles={data}
          setConfirmDelete={setConfirmDelete}
          setRoleId={setRoleId}
        />

        {confirmDelete && <span className="bg"></span>}
        {confirmDelete && (
          <div className="delete-employee">
            <p>Bạn có muốn xóa tài khoản này không?</p>
            <div className="confirm">
              <button onClick={() => deleteRoleFunction(roleId)}>Có</button>
              <button onClick={() => setConfirmDelete(false)}>Không</button>
            </div>
          </div>
        )}
      </section>
      <Footer2 />
    </>
  );
};

export default Roles;
