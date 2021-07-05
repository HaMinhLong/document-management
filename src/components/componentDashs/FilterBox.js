import React from "react";

const FilterBox = ({ text, selectData, filterFunction }) => {
  return (
    <>
      <div className="filter-department">
        <p>{text}: </p>
        <select onClick={(e) => filterFunction(e.target.value)}>
          <option value="">Tất cả</option>
          {selectData &&
            selectData.length > 0 &&
            selectData.map((data) => (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            ))}
        </select>
      </div>
    </>
  );
};

export default FilterBox;
