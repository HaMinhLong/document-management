import React, { useState, useEffect } from "react";

import Banner2 from "../../../layout/Banner2";
import Footer2 from "../../../layout/Footer2";

import { organizational } from "../../../../data/organizational.json";

const DepartmentDetails = (props) => {
  const id1 = props.match.params.id1;
  const id2 = props.match.params.id2;

  useEffect(() => {
    const data = organizational.find((org) => org.id == id1);
    if (data) setData(data.departments.find((dpm) => dpm.id == id2));
  }, []);

  const [data, setData] = useState({});

  return (
    <>
      {data ? (
        <>
          <Banner2 title={["Quản lý các phòng ban", `${data.name}`]} />
          <section className="department-information-container padding">
            <h1>Giới thiệu về {data.name} của trường Đại học Thăng Long :</h1>
            <div className="information">
              <p>
                <span>Tên bộ phận :</span> {data.name}
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
          <Banner2 title={["Quản lý các phòng ban"]} />
          <section className="department-information-container padding">
            <h1>Opps... Something went wrong</h1>
          </section>
        </>
      )}
      <Footer2 />
    </>
  );
};

export default DepartmentDetails;
