import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import FileBase from "react-file-base64";

import data from "../../../data/employees.json";

import Banner2 from "../../layout/Banner2";
import Footer2 from "../../layout/Footer2";

const AddEmployee = (props) => {
  const url = props.match.url;
  useEffect(() => {
    document.title =
      url === "/add-employee"
        ? "TLU | Thêm nhân viên"
        : "TLU | Cập nhật thông tin nhân viên";
    if (url !== "/add-employee") {
      const dt = data.employees.filter((dt) => dt.id === id);
      setEmployee(dt[0]);
    }
  });

  const id = url.slice(14, url.length);

  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    code: "",
    email: "",
    phoneNumber: "",
    department: "",
    affiliatedDepartment: "",
    position: "",
    startDate: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const back = () => {
    window.history.back();
  };

  return (
    <>
      <Banner2
        title={[
          url === "/add-employee" ? "Thêm nhân viên" : "Cập nhật thông tin",
        ]}
      />
      <section className="add-employee-container padding">
        <h1>
          {url === "/add-employee"
            ? "Thêm nhân viên :"
            : "Cập nhật thông tin nhân viên :"}
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Họ và tên: </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={employee.name}
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
          />
          <label htmlFor="code"> Mã nhân viên: </label>
          <input
            type="text"
            name="code"
            id="code"
            required
            value={employee.code}
            onChange={(e) => setEmployee({ ...employee, code: e.target.value })}
          />
          <div>
            <label htmlFor="department">Bộ phận: </label>
            <select required id="department" name="department">
              <option value="Toán - Tin">Toán - Tin</option>
            </select>
          </div>
          <div>
            <label htmlFor="affiliatedDepartment">Bộ phận trực thuộc: </label>
            <select
              required
              id="affiliatedDepartment"
              name="affiliatedDepartment"
            >
              <option value="Bộ môn Toán">Bộ môn Toán</option>
              <option value="Bộ môn Tin">Bộ môn Tin</option>
            </select>
          </div>
          <label htmlFor="position">Chức vụ:</label>
          <input
            type="text"
            name="position"
            id="position"
            required
            value={employee.position}
            onChange={(e) =>
              setEmployee({ ...employee, position: e.target.value })
            }
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={employee.email}
            onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value })
            }
          />
          <label htmlFor="phoneNumber">Số điện thoại:</label>
          <input
            type="number"
            name="phoneNumber"
            id="phoneNumber"
            required
            value={employee.phoneNumber}
            onChange={(e) =>
              setEmployee({ ...employee, phoneNumber: e.target.value })
            }
          />
          <div className="input-img">
            <FileBase
              type="file"
              required
              multiple={false}
              value={employee.image}
              onDone={({ base64 }) =>
                setEmployee({ ...employee, image: base64 })
              }
            />
          </div>

          <input
            type="submit"
            value={
              url === "/add-employee" ? "Thêm nhân viên" : "Cập nhật nhân viên"
            }
          />
        </form>
        <p onClick={() => back()}>Quay lại trang trước</p>
      </section>
      <Footer2 />
    </>
  );
};

export default AddEmployee;
