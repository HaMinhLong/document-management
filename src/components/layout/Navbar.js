import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../redux/employees/employeesActions";

const Navbar = () => {
  const toggleTasks = (data) => {
    const tasksLogo = document.querySelector(".tasks-logo");
    const tasks = document.querySelector(".tasks");
    const tasksBg = document.querySelector(".tasks-bg");

    tasks.classList.toggle("active");
    tasksLogo.classList.toggle("active");
    tasksBg.classList.toggle("active");
    if (data) setCheck(check ? false : true);
  };
  const dispatch = useDispatch();
  const user = localStorage.getItem("username");
  const groupId = localStorage.getItem("groupId");
  const rights = JSON.parse(localStorage.getItem("rights"));

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

  const employees = useSelector((state) => state.employees);

  const logOut = () => {
    localStorage.setItem("username", "");
    localStorage.setItem("groupId", "1");
    localStorage.setItem("rights", []);
    window.location = "/";
  };

  const [check, setCheck] = useState(false);
  const [checkDoc, setCheckDoc] = useState(false);

  return (
    <header>
      <Link to="/" className="logo">
        <img src="https://thanglong.edu.vn/themes/md_tlu/img/logo.svg" alt="" />
      </Link>
      <div className="tasks-bg"></div>
      <span className="tasks-logo" onClick={() => toggleTasks(0)}></span>
      <div className="tasks active">
        {groupId === "321092042012262300" ? (
          <ul>
            {user !== "admin" && (
              <li>
                <Link
                  to={`/employees/${
                    employees &&
                    employees.length > 0 &&
                    employees.find((emp) => emp.username === user).id
                  }`}
                  onClick={() => toggleTasks(0)}
                >
                  <i className="far fa-user-circle"></i>
                  {employees &&
                    employees.length > 0 &&
                    employees.find((emp) => emp.username === user).name}
                </Link>
                <span></span>
              </li>
            )}

            <li>
              <Link to="/" onClick={() => toggleTasks(0)}>
                Trang chủ
              </Link>
              <span></span>
            </li>
            <li>
              <Link onClick={() => setCheckDoc(checkDoc ? false : true)}>
                Quản lý văn bản{" "}
                <i
                  className="fas fa-angle-down"
                  id={checkDoc ? "check-doc" : ""}
                ></i>
              </Link>
              <span></span>
            </li>

            {checkDoc && (
              <>
                <li className="child">
                  <Link to="/document-process" onClick={() => toggleTasks(1)}>
                    {" "}
                    Quản lý quy trình
                  </Link>
                </li>
              </>
            )}

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
                  <Link to="/group" onClick={() => toggleTasks(1)}>
                    {" "}
                    Quản lý chức vụ
                  </Link>
                </li>
                <li className="child">
                  <Link to="/right" onClick={() => toggleTasks(1)}>
                    {" "}
                    Quản lý quyền
                  </Link>
                </li>
                <li className="child">
                  <Link to="/group-right" onClick={() => toggleTasks(1)}>
                    {" "}
                    Quản lý nhóm quyền
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
            {/* <li>
              <Link to="/about" onClick={() => toggleTasks(0)}>
                Giới thiệu
              </Link>
              <span></span>
            </li> */}

            {/* <li>
              <Link to="/contact" onClick={() => toggleTasks(0)}>
                Liên hệ
              </Link>
              <span></span>
            </li> */}
            {/* <li>
              <Link to="/about-we" onClick={() => toggleTasks(0)}>
                Về chúng tôi
              </Link>
              <span></span>
            </li> */}
            <li>
              <Link onClick={() => logOut()}>Đăng xuất</Link>
              <span></span>
            </li>
            <p>TLU</p>
          </ul>
        ) : (
          <ul>
            {user !== "admin" && (
              <li>
                <Link
                  to={`/employees/${
                    employees &&
                    employees.length > 0 &&
                    employees.find((emp) => emp.username === user).id
                  }`}
                  onClick={() => toggleTasks(0)}
                >
                  <i className="far fa-user-circle"></i>
                  {employees &&
                    employees.length > 0 &&
                    employees.find((emp) => emp.username === user).name}
                </Link>
                <span></span>
              </li>
            )}

            <li>
              <Link to="/" onClick={() => toggleTasks(0)}>
                Trang chủ
              </Link>
              <span></span>
            </li>

            {rights &&
              rights.length > 0 &&
              rights.map((right) => (
                <li key={right.id}>
                  <Link to={`/${right.url}`} onClick={() => toggleTasks(0)}>
                    {right.name}
                  </Link>
                  <span></span>
                </li>
              ))}

            <li>
              <Link onClick={() => logOut()}>Đăng xuất</Link>
              <span></span>
            </li>
            <p>TLU</p>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Navbar;
