import React, { useState, useEffect } from "react";

import Footer from "../layout/Footer";

const Home = () => {
  useEffect(() => {
    document.title = "Trường Đại học Thăng Long";
  });

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
      <section className="home-container">
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
            <a href="#study" className="down-icon"></a>
          </div>
          <div className="slider-banner">
            <div className="box1">
              <div className="content">
                <p>
                  Tư duy là <br />
                  sức mạnh của <br />
                  sự sáng tạo
                </p>
              </div>
              <div className="image-box">
                <img src={imagesBanner[0]} alt="" />
              </div>
            </div>
            <div className="box2">
              <div className="content">
                <p>
                  Tư duy là <br />
                  sức mạnh của <br />
                  sự sáng tạo
                </p>
              </div>
              <div className="image-box">
                <img src={imagesBanner[0]} alt="" />
              </div>
            </div>
            <div className="box3">
              <div className="content">
                <p>
                  Tư duy là <br />
                  sức mạnh của <br />
                  sự sáng tạo
                </p>
              </div>
              <div className="image-box">
                <img src={imagesBanner[0]} alt="" />
              </div>
            </div>
            <div className="box4">
              <div className="content">
                <p>
                  Tư duy là <br />
                  sức mạnh của <br />
                  sự sáng tạo
                </p>
              </div>
              <div className="image-box">
                <img src={imagesBanner[0]} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="study-program-container">
          <div id="study"></div>
          <div className="introduce">
            <p>Hãy bắt đầu tương lai ngay bây giờ</p>
            <div className="research">
              <p>Tìm hiểu theo khoa - ngành</p>
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="39"
                  height="39"
                  viewBox="0 0 39 39"
                >
                  <g
                    id="Group_1"
                    data-name="Group 1"
                    transform="translate(-1629 -1059)"
                  >
                    <rect
                      id="Rectangle"
                      width="39"
                      height="3"
                      transform="translate(1629 1077)"
                      fill="#d91e1e"
                    />
                    <rect
                      id="Rectangle-2"
                      data-name="Rectangle"
                      width="39"
                      height="3"
                      transform="translate(1647 1098) rotate(-90)"
                      fill="#d91e1e"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="study-program">
            <p>
              Chương trình <br /> học tại TLU
            </p>
            <div className="majors-container">
              <ul>
                <li>
                  <p>Khoa Toán - Tin học</p>
                </li>
                <li>
                  <p>Khoa Kinh tế - Quản lý</p>
                </li>
                <li>
                  <p>Khoa Khoa học sức khỏe</p>
                </li>
                <li>
                  <p>Khoa Ngoại Ngữ</p>
                </li>
                <li>
                  <p>Khoa Khoa học xã hội và nhân văn</p>
                </li>
                <li>
                  <p>Khoa Du lịch</p>
                </li>
                <li>
                  <p>Khoa Truyền thông Đa phương tiện</p>
                </li>
                <li>
                  <p>Khoa Âm nhạc ứng dụng</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="thanglong-life">
          <p>
            Đời sống
            <br /> Thăng Long
          </p>
          <p>
            Trở thành một thành viên trong cộng đồng TLU, nơi bạn không chỉ học
            tập mà còn được kết nối với một cộng đồng trẻ trung, nhiệt huyết, đa
            dạng đầy màu sắc. Nơi bạn được đặt trong mối quan hệ với mọi người
            xung quanh và không ngừng vận động để có khả năng thích ứng với môi
            trường hoạt động thực tế sau này.
          </p>
          <ul>
            <li>
              <p>Một ngày tại TLU</p>
            </li>
            <li>
              <p>Câu lạc bộ sinh viên</p>
            </li>
            <li>
              <p>Người truyền cảm hứng</p>
            </li>
            <li>
              <p>Tổ chức xã hội</p>
            </li>
          </ul>
          <div className="image-box">
            <img
              src="https://thanglong.edu.vn/sites/default/files/2020-05/home-doi-song-01.jpg"
              alt=""
            />
            <img
              src="https://thanglong.edu.vn/sites/default/files/2020-05/home-doi-song-04.jpg"
              alt=""
            />
            <img
              src="https://thanglong.edu.vn//sites/default/files/2020-05/home-doi-song-05.jpg"
              alt=""
            />
            <img
              src="https://thanglong.edu.vn/sites/default/files/2020-05/home-doi-song-02.jpg"
              alt=""
            />
            <img
              src="https://thanglong.edu.vn/sites/default/files/2020-05/home-doi-song-06.jpg"
              alt=""
            />
            <img
              src="https://thanglong.edu.vn/sites/default/files/2020-05/home-doi-song-03.jpg"
              alt=""
            />
          </div>
        </div>

        <div className="news-container">
          <div className="news">
            <div className="news-box1">
              <div className="image-box">
                <img
                  src="https://thanglong.edu.vn//sites/default/files/inline-images/hoi-truong-31-08.jpg"
                  alt=""
                />
              </div>
              <div className="content">
                <p>tin tức {"&"} sự kiện</p>
                <p>
                  1988: Thêm một đêm đại nhạc hội thành công của Đại học Thăng
                  Long
                </p>
                <button>Xem thêm</button>
              </div>
            </div>
            <div className="news-box23">
              <div className="news-box2">
                <div className="image-box">
                  <img
                    src="https://thanglong.edu.vn/sites/default/files/2020-05/chao-k32-01.jpg"
                    alt=""
                  />
                </div>
                <div className="content">
                  <p>
                    Bất ngờ với độ sáng tạo và hoành tráng của Chương trình Chào
                    tân sinh viên - Đại học Thăng Long
                  </p>
                  <p>Xem thêm ...</p>
                </div>
              </div>
              <div className="news-box3">
                <p>Thủ tục xác nhận nhập học và nhập học khóa K33</p>
                <p>Xem thêm ...</p>
              </div>
            </div>
          </div>
          <div className="other-news">
            <div>
              <p>
                THÔNG BÁO Thay đổi phòng thi môn Ngôn ngữ lập trình (CS121) Học
                kỳ II, nhóm 3, năm học 2020 - 2021
              </p>
              <p>Chi tiết</p>
            </div>
            <div>
              <p>
                THÔNG BÁO Lịch kiểm tra trình độ đầu khóa dành cho sinh viên
                đăng ký học Tiếng Anh trung cấp 1 Học kỳ III, nhóm 2, năm học
                2020 - 2021
              </p>
              <p>Chi tiết</p>
            </div>
            <div>
              <p>THÔNG BÁO Hình thức và đề tài thi nói Tiếng Anh cơ sở 3</p>
              <p>Chi tiết</p>
            </div>
            <div>
              <p>THÔNG BÁO Hình thức và đề tài thi nói Tiếng Anh cơ sở 2</p>
              <p>Chi tiết</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
