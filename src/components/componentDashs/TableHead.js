import React from "react";

const TableHead = ({ fields, checkRight }) => {
  return (
    <>
      <thead>
        <tr>
          {fields &&
            fields.length > 0 &&
            fields.map((field) => <th key={field}>{field}</th>)}
          {checkRight && <th>Hành động</th>}
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
