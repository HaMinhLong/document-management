import React, { useEffect } from "react";

import Employee from "./employee/Employee";

const Employees = () => {
  useEffect(() => {
    document.title = "Quản lí nhân viên";
  });
  return (
    <div>
      <Employee />
      <Employee />
    </div>
  );
};

export default Employees;
