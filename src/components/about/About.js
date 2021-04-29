import React, { useEffect } from "react";

import Footer from "../layout/Footer";

const About = () => {
  useEffect(() => {
    document.title = "Giới thiệu";
  });
  return (
    <>
      <section className="about">Gioi thieu</section>
      <Footer />
    </>
  );
};

export default About;
