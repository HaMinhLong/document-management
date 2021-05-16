import React, { useState } from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  const [check, setCheck] = useState(false);

  const toggleTasks = (data) => {
    const tasksLogo = document.querySelector(".tasks-logo");
    const tasks = document.querySelector(".tasks");
    const tasksBg = document.querySelector(".tasks-bg");

    tasks.classList.toggle("active");
    tasksLogo.classList.toggle("active");
    tasksBg.classList.toggle("active");
    if (data) setCheck(check ? false : true);
  };

  const logOut = () => {
    localStorage.setItem("status", "");
    window.location = "/";
  };

  return (
    <header>
      <Link to="/" className="logo">
        <img src="https://thanglong.edu.vn/themes/md_tlu/img/logo.svg" alt="" />
      </Link>
      <div className="tasks-bg"></div>
      <span className="tasks-logo" onClick={() => toggleTasks(0)}></span>
      <div className="tasks active">
        <ul>
          <li>
            <Link to="/" onClick={() => toggleTasks(0)}>
              Trang chủ
            </Link>
            <span></span>
          </li>
          <li>
            <Link to="/organizational" onClick={() => toggleTasks(0)}>
              Quản lý cơ cấu tổ chức
            </Link>
            <span></span>
          </li>
          <li>
            <Link onClick={() => setCheck(check ? false : true)}>
              Quản lý người dùng{" "}
              <i className="fas fa-angle-down" id={check ? "check" : ""}></i>
            </Link>
            <span></span>
          </li>
          {check && (
            <>
              <li className="child">
                <Link to="/user" onClick={() => toggleTasks(1)}>
                  {" "}
                  Quản lý tài khoản
                </Link>
              </li>
              <li className="child">
                <Link to="/role" onClick={() => toggleTasks(1)}>
                  {" "}
                  Quản lý chức vụ
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to="/employees" onClick={() => toggleTasks(0)}>
              Quản lý nhân viên
            </Link>
            <span></span>
          </li>
          <li>
            <Link to="/about" onClick={() => toggleTasks(0)}>
              Giới thiệu
            </Link>
            <span></span>
          </li>

          {/* <li>
            <Link to="/contact" onClick={() => toggleTasks(0)}>
              Liên hệ
            </Link>
            <span></span>
          </li> */}
          <li>
            <Link to="/about-we" onClick={() => toggleTasks(0)}>
              Về chúng tôi
            </Link>
            <span></span>
          </li>
          <li>
            <Link onClick={() => logOut()}>Đăng xuất</Link>
            <span></span>
          </li>
          <p>TLU</p>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
