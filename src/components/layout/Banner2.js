import React from "react";

import { Link } from "react-router-dom";
import svg from "../../images/Path 61.svg";

const Banner = ({ title }) => {
  return (
    <section className="banner-container padding">
      <div className="bg"></div>
      <div>
        <i className="fas fa-home"></i>
        <span>
          <Link to="/">Trang chủ</Link>
        </span>
        {title &&
          title.length > 0 &&
          title.map((tt) => (
            <span
              key={Math.floor(Math.random() * 1000000000000000000).toString()}
            >
              <img src={svg} alt="" />
              <span>{tt}</span>
            </span>
          ))}
      </div>
      <p>
        <span>{title[0]}</span>
        <img src={svg} alt="" />
      </p>
    </section>
  );
};

export default Banner;
