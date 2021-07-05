import React from "react";

const TableHead = ({ fields, checkRight }) => {
  return (
    <>
      <thead>
        <tr>
          {fields.map((field) => (
            <th key={field}>{field}</th>
          ))}
          {checkRight && <th>Hành động</th>}
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
