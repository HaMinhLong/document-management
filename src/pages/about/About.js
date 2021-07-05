import React, { useEffect } from "react";

import Banner2 from "../../layouts/Banner2";
import Footer from "../../layouts/Footer";

const About = () => {
  useEffect(() => {
    document.title = "TLU | Giới thiệu về hệ thống";
  });
  return (
    <>
      <Banner2 title={["Giới thiệu về hệ thống"]} />
      <section className="about padding">Gioi thieu</section>
      <Footer />
    </>
  );
};

export default About;
