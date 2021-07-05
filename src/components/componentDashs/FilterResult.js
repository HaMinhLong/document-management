import React from "react";

const FilterResult = ({ text, data, dataAll }) => {
  return (
    <>
      <div className="filter-result">
        <p>
          Hiển thị{" "}
          {data && data.length > 0 && dataAll && dataAll.length > 0 ? (
            <span>
              {data.length}/{dataAll.length}
            </span>
          ) : (
            <span>0 </span>
          )}{" "}
          {text}
        </p>
      </div>
    </>
  );
};

export default FilterResult;
