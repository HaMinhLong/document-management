import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { departments } from "../../../data/departments.json";

import Banner2 from "../../layout/Banner2";
import Footer2 from "../../layout/Footer2";

import Pagination from "../../layout/Pagination";

const Departments = (props) => {
  const id = props.match.params.id;

  useEffect(() => {
    setData(
      departments.filter((department) => department.organizationalID == id)
    );
  }, []);

  const [data, setData] = useState({});

  const [currentIndex, setCurrentIndex] = useState(1);
  const nextPagination = (employeesNumber, currentIndex) => {};

  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      <Banner2 title={["Quản lí các phòng ban"]} />
      <section className="departments-container padding">
        <h1>Quản lý các bộ phận trực thuộc trường Đại học Thăng Long :</h1>
        <div className="search-box">
          <button>
            <input type="text" name="search" id="search" />
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="add-department-button">
          <button>
            <Link to="/add-department">
              Thêm phòng ban <i className="far fa-plus-square"></i>
            </Link>
          </button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Bộ phận</th>
                <th>Mô tả</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Bộ phận trực thuộc</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map((data) => (
                  <tr key={data.id}>
                    <td className="name">
                      <Link to={`/department-${id}/${data.id}`}>
                        {data.name}
                      </Link>
                    </td>
                    <td>{data.describe.slice(0, 30)}...</td>
                    <td>{data.email}</td>
                    <td>{data.phoneNumber}</td>
                    <td>
                      <Link to={`/affiliated-department-${data.id}}`}>
                        Xem bộ phận trực thuộc
                      </Link>
                    </td>
                    <td>
                      <Link to={`/add-department-${data.id}}`}>
                        <i className="fas fa-edit"></i>
                      </Link>
                      <i
                        className="fas fa-trash"
                        onClick={() => setConfirmDelete(true)}
                      ></i>
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
        <p onClick={() => window.history.back()}>Quay lại trang trước</p>
      </section>
      <Footer2 />
    </>
  );
};

export default Departments;
