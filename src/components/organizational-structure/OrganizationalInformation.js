import React, { useState, useEffect } from "react";

import { organizational } from "../../data/organizational.json";

import Banner2 from "../layout/Banner2";
import Footer2 from "../layout/Footer2";

const OrganizationalInformation = (props) => {
  const id = props.match.params.id;

  useEffect(() => {
    setData(organizational.find((org) => org.id === id));
  }, []);

  const [data, setData] = useState({});

  return (
    <>
      <Banner2 title={["Quản lý cơ cấu tổ chức", data.name]} />
      <section className="organizational-information-container padding">
        <h1>Giới thiệu về {data.name} của trường Đại học Thăng Long :</h1>
        <p onClick={() => window.history.back()}>Quay lại trang trước</p>
      </section>
      <Footer2 />
    </>
  );
};

export default OrganizationalInformation;
