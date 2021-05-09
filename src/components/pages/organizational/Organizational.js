import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Banner2 from "../../layout/Banner2";
import Footer2 from "../../layout/Footer2";

import Pagination from "../../layout/Pagination";

import { organizational } from "../../../data/organizational.json";

const OrganizationalStructure = () => {
  useEffect(() => {
    document.title = "TLU | Quản lý cơ cấu tổ chức";
  }, []);

  const [data, setData] = useState(organizational);

  const [currentIndex, setCurrentIndex] = useState(1);
  const nextPagination = (employeesNumber, currentIndex) => {};

  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      <Banner2 title={["Quản lý cơ cấu tổ chức"]} />
      {data ? (
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
                  <th>Ngày thành lập</th>
                  <th>Bộ phận trực thuộc</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.length > 0 &&
                  data.map((data) => (
                    <tr key={data.id}>
                      <td className="name">
                        <Link to={`/organizational/${data.id}`}>
                          {data.name}
                        </Link>
                      </td>
                      <td>{data.describe.slice(0, 30)}...</td>
                      <td>{data.email}</td>
                      <td>{data.phoneNumber}</td>
                      <td>{data.startDate}</td>
                      <td>
                        <Link to={`/department-${data.id}`}>
                          Xem bộ phận trực thuộc
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {data && data.length > 0 && (
            <Pagination
              recordsTotal={data.length}
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
      ) : (
        <section className="organizational-structure-container padding">
          <h1>Opps... Something went wrong</h1>
        </section>
      )}
      <Footer2 />
    </>
  );
};

export default OrganizationalStructure;
