import React from "react";
import { Link } from "react-router-dom";

const AddButton = ({ link, text }) => {
  return (
    <>
      <div className="add-button">
        <button>
          <Link to={`/${link}`}>
            {text} <i className="fas fa-user-plus"></i>
          </Link>
        </button>
      </div>
    </>
  );
};

export default AddButton;
