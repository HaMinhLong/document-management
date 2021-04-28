import React from "react";

import { Link } from "react-router-dom";

const toggleTasks = () => {
  const tasksLogo = document.querySelector(".tasks-logo");
  const tasks = document.querySelector(".tasks");
  tasks.classList.toggle("active");
  tasksLogo.classList.toggle("active");
};

const Navbar = () => {
  return (
    <header>
      <Link to="/" className="logo">
        <img src="https://thanglong.edu.vn/themes/md_tlu/img/logo.svg" alt="" />
      </Link>
      <span className="tasks-logo" onClick={() => toggleTasks()}></span>
      <div className="tasks active">
        <ul>
          <li>
            <Link to="/" onClick={() => toggleTasks()}>
              Trang chủ
            </Link>
            <span></span>
          </li>
          <li>
            <Link onClick={() => toggleTasks()}>Quản lí cơ cấu tổ chức</Link>
            <span></span>
          </li>
          <li>
            <Link to="/employees" onClick={() => toggleTasks()}>
              Quản lí nhân viên
            </Link>
            <span></span>
          </li>
          <li>
            <Link onClick={() => toggleTasks()}>Giới thiệu</Link>
            <span></span>
          </li>
          <li>
            <Link onClick={() => toggleTasks()}>Liên hệ</Link>
            <span></span>
          </li>
          <p>TLU</p>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
