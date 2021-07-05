import React from "react";
import { searchData } from "../../utils/utils";

const SearchBox = ({ data, setData }) => {
  return (
    <>
      <div className="search-box">
        <button>
          <input
            type="text"
            name="search"
            id="search"
            onChange={(e) => searchData(e.target.value, data, setData)}
          />
          <i className="fas fa-search"></i>
        </button>
      </div>
    </>
  );
};

export default SearchBox;
