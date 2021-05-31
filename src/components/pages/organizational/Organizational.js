import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import moment from "moment";

import Banner2 from "../../layout/Banner2";
import Footer2 from "../../layout/Footer2";

import Pagination from "../../layout/Pagination";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrganizational,
  deleteDepartment,
} from "../../../redux/organizational-structure/organizationalActions";

const OrganizationalStructure = (props) => {
  const dispatch = useDispatch();
  const checkRight = props.match.url === "/organizational" ? true : false;

  useEffect(() => {
    document.title = "TLU | Quản lý cơ cấu tổ chức";
    dispatch(fetchOrganizational());
  }, []);

  const [currentIndex, setCurrentIndex] = useState(1);

  const organizational = useSelector((state) => state.organizational);

  const [data, setData] = useState();
  useEffect(() => {
    organizational &&
      organizational.length > 0 &&
      setData(organizational.slice((currentIndex - 1) * 10, currentIndex * 10));
  }, [organizational]);

  const nextPagination = (organizationalNumber, currentIndex) => {
    setData(
      organizational.slice(
        organizationalNumber * (currentIndex - 1),
        organizationalNumber * currentIndex
      )
    );
  };

  const [confirmDelete, setConfirmDelete] = useState(false);

  const [orgId, setOrgId] = useState();
  const dlp = (id) => {
    setConfirmDelete(true);
    setOrgId(id);
  };
  const deleteDpm = () => {
    dispatch(deleteDepartment(orgId));
    setConfirmDelete(false);
  };

  const searchDepartments = (value) => {
    const dataSearch = organizational.filter(
      (org) => org.name.toLowerCase().indexOf(value) !== -1
    );
    setData(dataSearch.slice(0, 10));
  };

  const filterDepartmentsChild = (orgId) => {
    if (orgId) {
      setData(
        organizational.filter((org) => org.belongto === orgId).slice(0, 10)
      );
    } else {
      setData(organizational.slice(0, 10));
    }
  };

  return (
    <>
      <Banner2 title={["Quản lý cơ cấu tổ chức"]} />
      <section className="organizational-structure-container padding">
        <h1>Quản lý cơ cấu tổ chức trường Đại học Thăng Long :</h1>

        <div className="search-box">
          <button>
            <input
              type="text"
              name="search"
              id="search"
              onChange={(e) => searchDepartments(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </button>
        </div>
        {checkRight && (
          <div className="add-button">
            <button>
              <Link to="/add-department">
                Thêm bộ phận <i className="far fa-plus-square"></i>
              </Link>
            </button>
          </div>
        )}

        <div className="filter-container">
          <div className="filter-result">
            <p>
              Hiển thị{" "}
              {data &&
              data.length > 0 &&
              organizational &&
              organizational.length > 0 ? (
                <span>
                  {data.length}/{organizational.length}
                </span>
              ) : (
                <span>0 </span>
              )}{" "}
              bộ phận
            </p>
          </div>
          <div className="filter">
            <div className="filter-department">
              <p>Bộ phận: </p>
              <select onClick={(e) => filterDepartmentsChild(e.target.value)}>
                <option value="">Tất cả</option>
                {organizational &&
                  organizational.length > 0 &&
                  organizational.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Cơ cấu tổ chức</th>
                <th>Bộ phận quản lý</th>
                <th>Mô tả</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Ngày thành lập</th>
                {checkRight && <th>Hành động</th>}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map((data) => (
                  <tr key={data.id}>
                    <td className="name">
                      <Link to={`/organizational/${data.id}`}>{data.name}</Link>
                    </td>
                    <td>
                      {data.id !== data.belongto
                        ? organizational.find((org) => org.id === data.belongto)
                            .name
                        : ""}
                    </td>
                    <td>{data.description.slice(0, 30)}...</td>
                    <td>{data.email}</td>
                    <td>{data.phoneNumber}</td>
                    <td>{moment(data.createdAt).format("L")}</td>
                    {checkRight && (
                      <td>
                        <Link to={`/add-department-${data.id}}`}>
                          <i className="fas fa-edit"></i>
                        </Link>
                        <i
                          className="fas fa-trash"
                          onClick={() => dlp(data.id)}
                        ></i>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {data && data.length > 0 && (
          <Pagination
            recordsTotal={organizational.length}
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
              <button onClick={() => deleteDpm()}>Có</button>
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
