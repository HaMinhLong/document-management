import React, { useState, useEffect } from "react";

import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../redux/employees/employeesActions";

const Navbar = () => {
  const toggleTasks = (data) => {
    const tasksLogo = document.querySelector(".tasks-logo");
    const tasks = document.querySelector(".tasks");
    const tasksBg = document.querySelector(".tasks-bg");

    tasks.classList.toggle("active");
    tasksLogo.classList.toggle("active");
    tasksBg.classList.toggle("active");
    data === 1 && setCheck(check ? false : true);
    data === 2 && setCheckDoc(checkDoc ? false : true);
    data === 3 && setCheckDoc2(checkDoc2 ? false : true);
  };

  const dispatch = useDispatch();
  const user = localStorage.getItem("username");
  const groupId = localStorage.getItem("groupId");
  const rights = JSON.parse(localStorage.getItem("rights"));
  const employeeId = localStorage.getItem("employeeId");
  const employeeName = localStorage.getItem("employeeName");

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

  const employees = useSelector((state) => state.employees);

  const [employee, setEmployee] = useState();
  useEffect(() => {
    employees &&
      employees.length > 0 &&
      setEmployee(employees.find((emp) => emp.username === user));
  }, [employees]);

  employee && localStorage.setItem("employeeId", employee.id);
  employee && localStorage.setItem("employeeName", employee.name);
  employee && localStorage.setItem("departmentId", employee.departmentId);

  const logOut = () => {
    localStorage.setItem("username", "");
    localStorage.setItem("groupId", "1");
    localStorage.setItem("rights", []);
    localStorage.setItem("employeeId", "");
    localStorage.setItem("employeeName", "");
    window.location = "/";
  };

  const [check, setCheck] = useState(false);
  const [checkDoc, setCheckDoc] = useState(false);
  const [checkDoc2, setCheckDoc2] = useState(false);

  // 644317359247429400 admin
  // 461341600943357060 ban_giam_hieu
  // 222908158858354780 hanh_chinh

  return (
    <header>
      <Link to="/" className="logo">
        <img src="https://thanglong.edu.vn/themes/md_tlu/img/logo.svg" alt="" />
      </Link>
      <div className="tasks-bg"></div>
      <span className="tasks-logo" onClick={() => toggleTasks(0)}></span>
      <div className="tasks active">
        {groupId === "644317359247429400" ||
        groupId === "461341600943357060" ? (
          <ul>
            {user !== "admin" && (
              <li>
                <Link
                  to={`/employees/${employeeId && employeeId}`}
                  onClick={() => toggleTasks(0)}
                >
                  <i className="far fa-user-circle"></i>
                  {employeeName && employeeName}
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
              <Link onClick={() => setCheckDoc2(checkDoc2 ? false : true)}>
                Quản lý văn bản đến{" "}
                <i
                  className="fas fa-angle-down"
                  id={checkDoc ? "check-doc" : ""}
                ></i>
              </Link>
              <span></span>
            </li>
            {checkDoc2 && (
              <>
                <li className="child">
                  <Link to="/incoming-document" onClick={() => toggleTasks(3)}>
                    {" "}
                    Quản lý văn bản đến
                  </Link>
                </li>
                <li className="child">
                  <Link to="/assigned" onClick={() => toggleTasks(3)}>
                    {" "}
                    Quản lý phân công công việc
                  </Link>
                </li>
                <li className="child">
                  <Link to="/sender" onClick={() => toggleTasks(3)}>
                    {" "}
                    Quản lý nơi đến
                  </Link>
                </li>
                <li className="child">
                  <Link to="/doc-type" onClick={() => toggleTasks(3)}>
                    {" "}
                    Quản lý loại văn bản
                  </Link>
                </li>
                <li className="child">
                  <Link to="/statistical" onClick={() => toggleTasks(3)}>
                    {" "}
                    Thống kê văn bản
                  </Link>
                </li>
              </>
            )}
            {/* 
            <li>
              <Link onClick={() => setCheckDoc(checkDoc ? false : true)}>
                Quản lý văn bản nội bộ{" "}
                <i
                  className="fas fa-angle-down"
                  id={checkDoc ? "check-doc" : ""}
                ></i>
              </Link>
              <span></span>
            </li> */}

            {checkDoc && (
              <>
                <li className="child">
                  <Link to="/internal-document" onClick={() => toggleTasks(2)}>
                    {" "}
                    Quản lý văn bản nội bộ
                  </Link>
                </li>
                <li className="child">
                  <Link to="/assigned" onClick={() => toggleTasks(2)}>
                    {" "}
                    Quản lý phân công công việc
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
                  to={`/employees/${employeeId && employeeId}`}
                  onClick={() => toggleTasks(0)}
                >
                  <i className="far fa-user-circle"></i>
                  {employeeName && employeeName}
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
