import React, { useState, useEffect } from "react";

import Banner2 from "../../layout/Banner2";
import Footer2 from "../../layout/Footer2";

import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../../../redux/organizational-structure/organizationalActions";

const OrganizationalDetails = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDepartments(id));
  }, []);

  const departmentDetails = useSelector((state) => state.organizational);

  const [data, setData] = useState({});
  useEffect(() => {
    setData(departmentDetails[0]);
  }, [departmentDetails]);

  return (
    <>
      {data ? (
        <>
          <Banner2 title={["Quản lý cơ cấu tổ chức", data.name]} />
          <section className="organizational-information-container padding">
            <h1>Giới thiệu về {data.name} của trường Đại học Thăng Long :</h1>
            <div className="information">
              <p>
                <span>Tên cơ cấu tổ chức :</span> {data.name}
              </p>
              <p>
                <span> Mô tả về {data.name} : </span>
                {data.description}
              </p>
              <p>
                <span>Email : </span>
                {data.email}
              </p>
              <p>
                <span>Số điện thoại : </span>
                {data.phoneNumber}
              </p>
              <p>
                <span>Ngày thành lập : </span>
                {data.startDate}
              </p>
            </div>
            <p onClick={() => window.history.back()}>Quay lại trang trước</p>
          </section>
        </>
      ) : (
        <>
          <Banner2 title={["Quản lý cơ cấu tổ chức"]} />
          <section className="organizational-information-container padding">
            <h1>Opps... Something went wrong</h1>
          </section>
        </>
      )}
      <Footer2 />
    </>
  );
};

export default OrganizationalDetails;