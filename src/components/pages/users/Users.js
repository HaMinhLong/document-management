import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Banner2 from "../../layout/Banner2";
import Footer2 from "../../layout/Footer2";
import User from "./user/User";

import { useSelector, useDispatch } from "react-redux";

import { fetchOrganizational } from "../../../redux/organizational-structure/organizationalActions";

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrganizational());
  }, []);
  const organizational = useSelector((state) => state.organizational);

  return (
    <>
      <Banner2 title={["Quản lí tài khoản"]} />
      <section className="user-management padding">
        <h1>Danh sách tài khoản :</h1>

        <div className="search-box">
          <button>
            <input type="text" name="search" id="search" />
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

        <User users={[]} />
      </section>

      <Footer2 />
    </>
  );
};

export default Users;
