import React, { useState, useEffect } from "react";

import Banner2 from "../../layout/Banner2";
import Footer2 from "../../layout/Footer2";

import { departments } from "../../../data/departments.json";

const DepartmentInformation = (props) => {
  const id2 = props.match.params.id2;

  useEffect(() => {
    setData(departments.find((department) => department.id == id2));
  }, []);

  const [data, setData] = useState({});

  return (
    <>
      <Banner2 title={["Quản lý các phòng ban", `${data.name}`]} />
      <section className="department-information-container padding">
        <h1>Giới thiệu về {data.name} của trường Đại học Thăng Long :</h1>
        <p onClick={() => window.history.back()}>Quay lại trang trước</p>
      </section>
      <Footer2 />
    </>
  );
};

export default DepartmentInformation;
