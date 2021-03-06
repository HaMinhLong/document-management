import React, { useState, useEffect } from "react";

import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../redux/employees/employeesActions";
import { checkAdmin } from "../utils/utils";

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
  const isAdmin = checkAdmin(groupId);
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
      <div
        className="tasks-bg"
        style={{ cursor: "pointer" }}
        onClick={() => toggleTasks(0)}
      ></div>
      <span className="tasks-logo" onClick={() => toggleTasks(0)}></span>
      <div className="tasks active">
        {isAdmin ? (
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
                Trang ch???
              </Link>
              <span></span>
            </li>

            <li>
              <Link onClick={() => setCheckDoc2(checkDoc2 ? false : true)}>
                Qu???n l?? v??n b???n ?????n{" "}
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
                    Qu???n l?? v??n b???n ?????n
                  </Link>
                </li>
                <li className="child">
                  <Link to="/assigned" onClick={() => toggleTasks(3)}>
                    {" "}
                    Qu???n l?? ph??n c??ng c??ng vi???c
                  </Link>
                </li>
                <li className="child">
                  <Link to="/sender" onClick={() => toggleTasks(3)}>
                    {" "}
                    Qu???n l?? n??i ?????n
                  </Link>
                </li>
                <li className="child">
                  <Link to="/doc-type" onClick={() => toggleTasks(3)}>
                    {" "}
                    Qu???n l?? lo???i v??n b???n
                  </Link>
                </li>
                <li className="child">
                  <Link to="/statistical" onClick={() => toggleTasks(3)}>
                    {" "}
                    Th???ng k?? v??n b???n
                  </Link>
                </li>
              </>
            )}
            {/* 
            <li>
              <Link onClick={() => setCheckDoc(checkDoc ? false : true)}>
                Qu???n l?? v??n b???n n???i b???{" "}
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
                    Qu???n l?? v??n b???n n???i b???
                  </Link>
                </li>
                <li className="child">
                  <Link to="/assigned" onClick={() => toggleTasks(2)}>
                    {" "}
                    Qu???n l?? ph??n c??ng c??ng vi???c
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/organizational" onClick={() => toggleTasks(0)}>
                Qu???n l?? c?? c???u t??? ch???c
              </Link>
              <span></span>
            </li>
            <li>
              <Link onClick={() => setCheck(check ? false : true)}>
                Qu???n l?? ng?????i d??ng{" "}
                <i className="fas fa-angle-down" id={check ? "check" : ""}></i>
              </Link>
              <span></span>
            </li>

            {check && (
              <>
                <li className="child">
                  <Link to="/user" onClick={() => toggleTasks(1)}>
                    {" "}
                    Qu???n l?? t??i kho???n
                  </Link>
                </li>
                <li className="child">
                  <Link to="/group" onClick={() => toggleTasks(1)}>
                    {" "}
                    Qu???n l?? ch???c v???
                  </Link>
                </li>
                <li className="child">
                  <Link to="/right" onClick={() => toggleTasks(1)}>
                    {" "}
                    Qu???n l?? quy???n
                  </Link>
                </li>
                <li className="child">
                  <Link to="/group-right" onClick={() => toggleTasks(1)}>
                    {" "}
                    Qu???n l?? nh??m quy???n
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/employees" onClick={() => toggleTasks(0)}>
                Qu???n l?? nh??n vi??n
              </Link>
              <span></span>
            </li>
            {/* <li>
              <Link to="/about" onClick={() => toggleTasks(0)}>
                Gi???i thi???u
              </Link>
              <span></span>
            </li> */}

            {/* <li>
              <Link to="/contact" onClick={() => toggleTasks(0)}>
                Li??n h???
              </Link>
              <span></span>
            </li> */}
            {/* <li>
              <Link to="/about-we" onClick={() => toggleTasks(0)}>
                V??? ch??ng t??i
              </Link>
              <span></span>
            </li> */}
            <li>
              <Link onClick={() => logOut()}>????ng xu???t</Link>
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
                Trang ch???
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
              <Link onClick={() => logOut()}>????ng xu???t</Link>
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
