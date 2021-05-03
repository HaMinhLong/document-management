import React, { useState, useEffect } from "react";

import Banner2 from "../../../layout/Banner2";
import Footer2 from "../../../layout/Footer2";

import { organizational } from "../../../../data/organizational.json";
import { departments } from "../../../../data/departments.json";

const AddAffiliatedDepartment = (props) => {
  const [organizationalId, setOrganizationalId] = useState(
    organizational[0].id
  );

  const [departmentId, setDepartmentId] = useState();

  useEffect(() => {
    setAffiliatedDepartment({
      ...affiliatedDepartment,
      departmentID: departmentId,
    });
  }, [departmentId]);

  useEffect(() => {
    setDepartmentSelect(
      departments.filter((dpt) => dpt.organizationalID == organizationalId)
    );
  }, [organizationalId]);

  const [departmentSelect, setDepartmentSelect] = useState([]);
  const url = props.match.url === "/add-affiliated-department" ? 1 : 2;

  const [affiliatedDepartment, setAffiliatedDepartment] = useState({
    id: Math.floor(Math.random() * 1000000000000000000).toString(),
    name: "",
    describe: "",
    email: "",
    phoneNumber: "",
    departmentID: departmentId,
  });

  const changeDepartment = () => {
    var selectBox = document.getElementById("department");
    var selectedValue = selectBox.options[selectBox.selectedIndex].id;
    setOrganizationalId(selectedValue);
  };

  const changeDepartment2 = () => {
    var selectBox = document.getElementById("affiliatedDepartment");
    var selectedValue = selectBox.options[selectBox.selectedIndex].id;
    setDepartmentId(selectedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(affiliatedDepartment);
  };

  return (
    <>
      <Banner2 title={[url === 1 ? "Thêm bộ phận" : "Cập nhật bộ phận"]} />
      <section className="add-department-container padding">
        {url === 1 ? (
          <h1>Thêm bộ phận trực thuộc phòng ban :</h1>
        ) : (
          <h1>Cập nhật thông tin bộ phận trực thuộc phòng ban :</h1>
        )}
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="name">Tên bộ phận: </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={affiliatedDepartment.name}
            onChange={(e) =>
              setAffiliatedDepartment({
                ...affiliatedDepartment,
                name: e.target.value,
              })
            }
          />
          <label htmlFor="describe">Mô tả: </label>
          <textarea
            type="text"
            name="describe"
            id="describe"
            required
            value={affiliatedDepartment.describe}
            onChange={(e) =>
              setAffiliatedDepartment({
                ...affiliatedDepartment,
                describe: e.target.value,
              })
            }
          ></textarea>
          <div>
            <label htmlFor="department">Bộ phận: </label>
            <select
              required
              id="department"
              name="department"
              onChange={() => changeDepartment()}
            >
              {organizational.map((org) => (
                <option key={org.id} id={org.id} value={org.name}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="affiliatedDepartment">Bộ phận trực thuộc: </label>
            <select
              required
              id="affiliatedDepartment"
              name="affiliatedDepartment"
              onChange={() => changeDepartment2()}
            >
              {departmentSelect.map((dpm) => (
                <option key={dpm.id} value={dpm.name} id={dpm.id}>
                  {dpm.name}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={affiliatedDepartment.email}
            onChange={(e) =>
              setAffiliatedDepartment({
                ...affiliatedDepartment,
                email: e.target.value,
              })
            }
          />
          <label htmlFor="phoneNumber">Số điện thoại:</label>
          <input
            type="number"
            name="phoneNumber"
            id="phoneNumber"
            required
            value={affiliatedDepartment.phoneNumber}
            onChange={(e) =>
              setAffiliatedDepartment({
                ...affiliatedDepartment,
                phoneNumber: e.target.value,
              })
            }
          />
          <input type="submit" value="Thêm bộ phận" />
        </form>
        <p onClick={() => window.history.back()}>Quay lại trang trước</p>
      </section>
      <Footer2 />
    </>
  );
};

export default AddAffiliatedDepartment;
