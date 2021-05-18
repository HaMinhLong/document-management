import React, { useEffect } from "react";

import { Link } from "react-router-dom";

import Banner from "../../layout/Banner";
import Footer from "../../layout/Footer";
import { useSelector, useDispatch } from "react-redux";

import { fetchEmployees } from "../../../redux/employees/employeesActions";

const HomePage = () => {
  const dispatch = useDispatch();
  const roleId = localStorage.getItem("status");
  const username = localStorage.getItem("username");
  useEffect(() => {
    document.title = "TLU | Hệ thống quản lý văn bản";
  }, []);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);
  const employees = useSelector((state) => state.employees);

  const employee =
    employees &&
    employees.length > 0 &&
    employees.find((employee) => employee.username === username);
  localStorage.setItem("id", employee && employee.id);

  return (
    <>
      <section className="home-container">
        <Banner title={"Home"} />
        <div className="system-introduce padding">
          <div id="introduce"></div>
          <p className="text-header">
            Hãy tìm hiểu về hệ thống Quản lý văn bản trường Đại học Thăng Long
            ngay bây giờ
          </p>
          <div className="introduce">
            <div className="content">
              <h1>Giới thiệu</h1>
              <p>
                Để thực hiện công tác đào tạo tại trường Đại học Thăng Long nhà
                tường cần ban hành các văn bản. Hằng năm trường Đại học Thăng
                Long nhận và ban hành số lượng văn bản rất lớn gồm các văn bản
                trao đổi với các tổ chức bên ngoài và những văn bản gửi trong
                nội bộ nhà trường. Vì thế rất khó trong việc quản lý tất cả các
                loại văn bản trong nhà trường...
              </p>
              <p>
                Phần mền giúp nhà trường theo dõi quá trình xử lý văn bản từ lúc
                tiếp nhận, chờ xử lý, cho đến khi hoàn thành xử lý, lưu trữ hoặc
                gửi đi. Hệ thống giúp các đơn vị có thẩm quyền quản lý văn bản
                hiệu quả, giảm chi phí, thời gian, công sức, thuận tiện trong
                việc tra cứu, tìm kiếm, xử lý thông tin. Hệ thống phân quyền đến
                từng phòng ban được phép dùng các chức năng khác nhau của phần
                mềm đảm bảo tính bảo mật...
              </p>
              <button>
                <Link to="/about">Xem thêm ...</Link>
              </button>
            </div>
            <div className="image-box">
              <img
                src="https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/ngoclinh/2015_09_15/newfolder3/kien-truc-nhu-mo-cua-ngoi-truong-dep-nhat-nhi-viet-nam.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="system-advantages-container padding">
          <div id="advantages"></div>
          <div className="introduce">
            <p className="text-header">
              Tại sao nên sử dụng hệ thống Quản lý văn bản?
            </p>
          </div>
          <div className="system-advantages">
            <p>
              Tại sao nên sử dụng
              <br />
              Hệ thống Quản lý
              <br />
              văn bản
            </p>
            <div className="advantages">
              <ul>
                <li>
                  <p>Thiết lập môi trường riêng tư cho văn bản</p>
                </li>
                <li>
                  <p>Tính bảo mật tuyệt đối</p>
                </li>
                <li>
                  <p>Thiết lập được quy trình quản lý chặt chẽ</p>
                </li>
                <li>
                  <p>Hỗ trợ sao lưu – phục hồi dữ liệu</p>
                </li>
                <li>
                  <p>Cải thiện quy trình làm việc</p>
                </li>
                <li>
                  <p>Hỗ trợ tìm kiếm, phân loại văn bản</p>
                </li>
                <li>
                  <p>Lưu trữ được số lượng lớn văn bản</p>
                </li>
                <li>
                  <p>Tiết kiệm nhân công, chi phí, thời gian</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="system-function-container padding">
          <p className="text-header">
            Các chức năng của hệ thống Quản lý văn bản
          </p>
          <div className="system-function">
            <div className="content">
              <h1>Các chức năng của hệ thống</h1>
            </div>
            <div className="system-function-box">
              <div className="box">
                <p>Quản lý cơ cấu tổ chức</p>
                <Link to="/organizational">
                  <button>
                    Xem
                    <i className="fas fa-long-arrow-alt-right"></i>
                  </button>
                </Link>
              </div>

              <div className="box">
                <p>Quản lý tài khoản</p>
                <Link to="/user">
                  <button>
                    Xem
                    <i className="fas fa-long-arrow-alt-right"></i>
                  </button>
                </Link>
              </div>
              {roleId && roleId === "89" && (
                <>
                  <div className="box">
                    <p>Quản lý chức vụ</p>
                    <Link to="/role">
                      <button>
                        Xem
                        <i className="fas fa-long-arrow-alt-right"></i>
                      </button>
                    </Link>
                  </div>

                  <div className="box">
                    <p>Quản lý nhân viên</p>
                    <Link to="/employees">
                      <button>
                        Xem
                        <i className="fas fa-long-arrow-alt-right"></i>
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="evaluate-container padding">
          <p className="text-header">Đánh giá về hệ thống</p>
          <div className="evaluate-box">
            <div className="box">
              <p>5000+</p>
              <p>Người dùng</p>
            </div>
            <div className="box">
              <p>1000+</p>
              <p>Văn bản</p>
            </div>
            <div className="box">
              <p>100%</p>
              <p>Tuân thủ quy trình</p>
            </div>
            <div className="box">
              <p>95%</p>
              <p>Người dùng hài lòng</p>
            </div>
          </div>
        </div>
        <div className="image-container padding">
          <img
            src="https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/ngoclinh/2015_09_15/newfolder3/kien-truc-nhu-mo-cua-ngoi-truong-dep-nhat-nhi-viet-nam.jpg"
            alt=""
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
