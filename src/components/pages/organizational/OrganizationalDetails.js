import React, { useState, useEffect } from "react";

import { organizational } from "../../../data/organizational.json";

import Banner2 from "../../layout/Banner2";
import Footer2 from "../../layout/Footer2";

const OrganizationalDetails = (props) => {
  const id = props.match.params.id;

  useEffect(() => {
    setData(organizational.find((org) => org.id === id));
  }, []);

  const [data, setData] = useState({});

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
                {data.describe}
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
