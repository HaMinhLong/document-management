import React, { useState, useEffect } from "react";

import Banner2 from "../layout/Banner2";
import Footer2 from "../layout/Footer2";

import { organizational } from "../../data/organizational.json";
import { departments } from "../../data/departments.json";

const AddDepartment = (props) => {
  const [organizationalId, setOrganizationalId] = useState(
    organizational[0].id
  );

  useEffect(() => {
    setDepartment({ ...department, organizationalID: organizationalId });
  }, [organizationalId]);

  const url = props.match.url === "/add-department" ? 1 : 2;

  const [department, setDepartment] = useState({
    id: Math.floor(Math.random() * 1000000000000000000).toString(),
    name: "",
    describe: "",
    email: "",
    phoneNumber: "",
    organizationalID: organizationalId,
  });

  const changeDepartment = () => {
    var selectBox = document.getElementById("department");
    var selectedValue = selectBox.options[selectBox.selectedIndex].id;
    setOrganizationalId(selectedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(department);
  };

  return (
    <>
      <Banner2 title={[url === 1 ? "Thêm phòng ban" : "Cập nhật phòng ban"]} />
      <section className="add-department-container padding">
        {url === 1 ? (
          <h1>Thêm phòng ban :</h1>
        ) : (
          <h1>Cập nhật thông tin phòng ban:</h1>
        )}
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="name">Tên bộ phận: </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={department.name}
            onChange={(e) =>
              setDepartment({ ...department, name: e.target.value })
            }
          />
          <label htmlFor="describe">Mô tả: </label>
          <textarea
            type="text"
            name="describe"
            id="describe"
            required
            value={department.describe}
            onChange={(e) =>
              setDepartment({ ...department, describe: e.target.value })
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={department.email}
            onChange={(e) =>
              setDepartment({ ...department, email: e.target.value })
            }
          />
          <label htmlFor="phoneNumber">Số điện thoại:</label>
          <input
            type="number"
            name="phoneNumber"
            id="phoneNumber"
            required
            value={department.phoneNumber}
            onChange={(e) =>
              setDepartment({ ...department, phoneNumber: e.target.value })
            }
          />
          <input type="submit" value="Thêm phòng ban" />
        </form>
        <p onClick={() => window.history.back()}>Quay lại trang trước</p>
      </section>
      <Footer2 />
    </>
  );
};

export default AddDepartment;
