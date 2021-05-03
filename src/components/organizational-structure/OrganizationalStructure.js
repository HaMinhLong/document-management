import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Banner2 from "../layout/Banner2";
import Footer2 from "../layout/Footer2";

import Pagination from "../layout/Pagination";

import { organizational } from "../../data/organizational.json";

const OrganizationalStructure = () => {
  useEffect(() => {
    document.title = "TLU | Quản lý cơ cấu tổ chức";
  }, []);

  const [organizationalStructure, setOrganizationalStructure] = useState(
    organizational
  );
  const [currentIndex, setCurrentIndex] = useState(1);

  const nextPagination = (employeesNumber, currentIndex) => {};

  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      <Banner2 title={["Quản lý cơ cấu tổ chức"]} />
      <section className="organizational-structure-container padding">
        <h1>Quản lý cơ cấu tổ chức trường Đại học Thăng Long :</h1>

        <div className="search-box">
          <button>
            <input type="text" name="search" id="search" />
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="add-organizational-structure-button">
          <button>
            <Link to="/add-department">
              Thêm bộ phận trực thuộc <i className="far fa-plus-square"></i>
            </Link>
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Cơ cấu tổ chức</th>
                <th>Mô tả</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Bộ phận trực thuộc</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {organizationalStructure &&
                organizationalStructure.length > 0 &&
                organizationalStructure.map((organizationalStructure) => (
                  <tr key={organizationalStructure.id}>
                    <td className="name">
                      <Link
                        to={`/organizational-structure/${organizationalStructure.id}`}
                      >
                        {organizationalStructure.name}
                      </Link>
                    </td>
                    <td>{organizationalStructure.describe.slice(0, 30)}...</td>
                    <td>{organizationalStructure.email}</td>
                    <td>{organizationalStructure.phoneNumber}</td>
                    <td>
                      <Link to={`/department-${organizationalStructure.id}`}>
                        Xem bộ phận trực thuộc
                      </Link>
                    </td>
                    <td>
                      <Link to={`/add-department`}>
                        <i className="fas fa-edit"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {organizationalStructure && organizationalStructure.length > 0 && (
          <Pagination
            recordsTotal={organizationalStructure.length}
            recordsNumber={10}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            nextPagination={nextPagination}
          />
        )}
        {confirmDelete && <span className="bg"></span>}
        {confirmDelete && (
          <div className="delete-employee">
            <p>Bạn có muốn xóa bộ phận này không?</p>
            <div className="confirm">
              <button>Có</button>
              <button onClick={() => setConfirmDelete(false)}>Không</button>
            </div>
          </div>
        )}
      </section>
      <Footer2 />
    </>
  );
};

export default OrganizationalStructure;
