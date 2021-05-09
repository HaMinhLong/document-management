import React, { useState, useEffect } from "react";

import Banner2 from "../../../../layout/Banner2";
import Footer2 from "../../../../layout/Footer2";

import { organizational } from "../../../../../data/organizational.json";

const AffiliatedDepartmentDetails = (props) => {
  const id1 = props.match.params.id1;
  const id2 = props.match.params.id2;
  const id3 = props.match.params.id3;

  useEffect(() => {
    const org = organizational.find((org) => org.id == id1);
    const department = org.departments.find((dpm) => dpm.id == id2);
    setData(department.affiliatedDepartment.find((aff) => aff.id == id3));
  }, []);

  const [data, setData] = useState({});

  return (
    <>
      {data && (
        <>
          <Banner2
            title={["Quản lý bộ phận trực thuộc phòng ban", `${data.name}`]}
          />
          <section className="affiliated-department-container padding">
            <h1>Giới thiệu về {data.name} của trường Đại học Thăng Long</h1>
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
          <Footer2 />
        </>
      )}
    </>
  );
};

export default AffiliatedDepartmentDetails;
