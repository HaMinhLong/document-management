import React, { useState, useEffect } from "react";

const Banner2 = ({ title }) => {
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const iconSlider = document.querySelectorAll(".icon-slider");
      const activeIcon = document.getElementsByClassName("sticky");
      const slider = document.querySelector(".slider-banner");

      if (activeIcon) {
        activeIcon[0].classList.remove("sticky");
      }
      iconSlider[index].classList.add("sticky");

      slider.style.marginLeft = -(index * 100) + "%";

      if (index > 2) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  const imagesBanner = [
    ["https://thanglong.edu.vn/sites/default/files/2020-04/banner.png"],
  ];

  const sliderBanner = () => {
    const iconSlider = document.querySelectorAll(".icon-slider");
    const activeIcon = document.getElementsByClassName("sticky");

    const slider = document.querySelector(".slider-banner");

    for (let index = 0; index < iconSlider.length; index++) {
      iconSlider[index].addEventListener("click", () => {
        if (activeIcon) {
          activeIcon[0].classList.remove("sticky");
        }
        iconSlider[index].classList.add("sticky");
        slider.style.marginLeft = -(index * 100) + "%";
      });
    }
  };
  return (
    <>
      <div className="banner">
        <div id="banner"></div>
        <span
          className="icon-slider sticky"
          onClick={() => sliderBanner()}
        ></span>
        <span className="icon-slider" onClick={() => sliderBanner()}></span>
        <span className="icon-slider" onClick={() => sliderBanner()}></span>
        <span className="icon-slider" onClick={() => sliderBanner()}></span>
        <div className="down-box">
          <a
            href={title === "Home" ? "#introduce" : "#study"}
            className="down-icon"
          ></a>
        </div>
        <div className="slider-banner">
          <div className="box1">
            <div className="content">
              {title === "Home" ? (
                <p>
                  Hệ thống <br />
                  Quản lí văn bản <br />
                  trường Đại học <br />
                  Thăng Long
                </p>
              ) : (
                <p>
                  Tư duy là <br />
                  sức mạnh của <br />
                  sự sáng tạo
                </p>
              )}
            </div>
            <div className="image-box">
              <img src={imagesBanner[0]} alt="" />
            </div>
          </div>
          <div className="box2">
            <div className="content">
              {title === "Home" ? (
                <p>
                  Hệ thống <br />
                  Quản lí văn bản <br />
                  trường Đại học <br />
                  Thăng Long
                </p>
              ) : (
                <p>
                  Tư duy là <br />
                  sức mạnh của <br />
                  sự sáng tạo
                </p>
              )}
            </div>
            <div className="image-box">
              <img src={imagesBanner[0]} alt="" />
            </div>
          </div>
          <div className="box3">
            <div className="content">
              {title === "Home" ? (
                <p>
                  Hệ thống <br />
                  Quản lí văn bản <br />
                  trường Đại học <br />
                  Thăng Long
                </p>
              ) : (
                <p>
                  Tư duy là <br />
                  sức mạnh của <br />
                  sự sáng tạo
                </p>
              )}
            </div>
            <div className="image-box">
              <img src={imagesBanner[0]} alt="" />
            </div>
          </div>
          <div className="box4">
            <div className="content">
              {title === "Home" ? (
                <p>
                  Hệ thống <br />
                  Quản lí văn bản <br />
                  trường Đại học <br />
                  Thăng Long
                </p>
              ) : (
                <p>
                  Tư duy là <br />
                  sức mạnh của <br />
                  sự sáng tạo
                </p>
              )}
            </div>
            <div className="image-box">
              <img src={imagesBanner[0]} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner2;
