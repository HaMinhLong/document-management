import React, { useState, useEffect } from "react";

import Banner2 from "../../../layout/Banner2";
import Footer2 from "../../../layout/Footer2";

import { departments } from "../../../../data/departments.json";

const AffiliatedDepartmentInformation = (props) => {
  const id1 = props.match.params.id1;
  const id2 = props.match.params.id2;

  useEffect(() => {
    const department = departments.find((department) => department.id == id1);
    setData(department.affiliatedDepartment.find((aff) => aff.id == id2));
  }, []);

  const [data, setData] = useState({});

  console.log(data);

  return (
    <>
      <Banner2
        title={["Quản lý bộ phận trực thuộc phòng ban", `${data.name}`]}
      />
      <section className="affiliated-department-container padding">
        <h1>Giới thiệu về {data.name} của trường Đại học Thăng Long</h1>
        <p onClick={() => window.history.back()}>Quay lại trang trước</p>
      </section>
      <Footer2 />
    </>
  );
};

export default AffiliatedDepartmentInformation;
