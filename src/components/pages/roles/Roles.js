import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Banner2 from "../../layout/Banner2";
import Footer2 from "../../layout/Footer2";
import Role from "./role/Role";

import { useSelector, useDispatch } from "react-redux";

import { fetchOrganizational } from "../../../redux/organizational-structure/organizationalActions";

const Roles = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrganizational());
  }, []);
  const organizational = useSelector((state) => state.organizational);

  return (
    <>
      <Banner2 title={["Quản lí chức vụ"]} />
      <section className="role-management padding">
        <h1>Danh sách chức vụ :</h1>

        <div className="search-box">
          <button>
            <input type="text" name="search" id="search" />
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
          <div className="filter-result">filter result</div>
          <div className="filter">
            <div className="filter-department">
              <p>Bộ phận: </p>
              <select>
                {organizational.map((org) => (
                  <option value={org.id}>{org.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <Role roles={[]} />
      </section>
      <Footer2 />
    </>
  );
};

export default Roles;
