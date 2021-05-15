import React from "react";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <a href="#banner"></a>
      <div className="content">
        <h1>Thăng Long University</h1>
        <div className="footer-container">
          <div className="footer-list">
            <ul>
              <li>
                <Link to="/organizational">Quản lý cơ cấu tổ chức</Link>
              </li>
              <li>
                <Link to="/user">Quản lý tài khoản</Link>
              </li>
              <li>
                <Link to="/role">Quản lý chức vụ</Link>
              </li>
              <li>
                <Link to="/employees">Quản lý nhân viên</Link>
              </li>
              <li>
                <Link to="/about">Giới thiệu</Link>
              </li>
              {/* <li>
                <Link to="/contact">Liên hệ</Link>
              </li> */}
              <li to="/about-we">
                <Link>Về chúng tôi</Link>
              </li>
            </ul>
          </div>
          <div className="footer-contact">
            <div className="list-contact">
              <p>Điện thoại</p>
              <p>Fax</p>
              <p>Email</p>
              <p>Địa chỉ</p>
            </div>
            <div className="contact-details">
              <p>024 3858 7346</p>
              <p>024 3563 6775</p>
              <p>info@thanglong.edu.vn</p>
              <p>homthuhopy@thanglong.edu.vn</p>
              <p>Đường Nghiêm Xuân Yêm - Đại Kim - Hoàng Mai - Hà Nội</p>
            </div>
          </div>
        </div>
      </div>
      <div className="links">
        <p>Copyright &copy; 2021 Thăng Long University. All right reserved</p>
        <div className="links-list">
          <ul>
            <li>
              <a
                href="https://www.facebook.com/thanglonguniversity"
                target="blank"
              >
                <i className="fab fa-facebook" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/thanglonguniversity/"
                target="blank"
              >
                <i className="fab fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UClrfICnLonC_sEF5TVEKc3A"
                target="blank"
              >
                <i className="fab fa-youtube" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@thanglonguniversity?"
                target="blank"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
