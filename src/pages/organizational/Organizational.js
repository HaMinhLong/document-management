import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import moment from "moment";

import Banner2 from "../../layouts/Banner2";
import Footer2 from "../../layouts/Footer2";
import DeleteBox from "../../components/componentDashs/DeleteBox";
import Pagination from "../../components/componentDashs/Pagination";
import FilterResult from "../../components/componentDashs/FilterResult";
import FilterBox from "../../components/componentDashs/FilterBox";
import AddButton from "../../components/componentDashs/AddButton";
import TableHead from "../../components/componentDashs/TableHead";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrganizational,
  deleteDepartment,
} from "../../redux/organizational-structure/organizationalActions";
import SearchBox from "../../components/componentDashs/SearchBox";

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

  const [confirmDelete, setConfirmDelete] = useState(false);

  const [orgId, setOrgId] = useState();
  const dlp = (id) => {
    setConfirmDelete(true);
    setOrgId(id);
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

        <SearchBox data={organizational} setData={setData} />
        {checkRight && (
          <AddButton link={"add-department"} text={"Thêm bộ phận"} />
        )}

        <div className="filter-container">
          <FilterResult text={"bộ phận"} data={data} dataAll={organizational} />

          <div className="filter">
            <FilterBox
              text={"Bộ phận"}
              selectData={organizational}
              filterFunction={filterDepartmentsChild}
            />
          </div>
        </div>
        <div className="table-container">
          <table>
            <TableHead
              fields={[
                "Tên bộ phận",
                "Bộ phận quản lý",
                "Mô tả",
                "Email",
                "Số điện thoại",
                "Ngày thành lập",
              ]}
              checkRight={checkRight}
            />
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
            setData={setData}
            data={organizational}
          />
        )}
        <DeleteBox
          text="bộ phận"
          setConfirm={setConfirmDelete}
          confirmDelete={confirmDelete}
          deleteFunction={deleteDepartment}
          id={orgId}
        />
      </section>
      <Footer2 />
    </>
  );
};

export default OrganizationalStructure;
