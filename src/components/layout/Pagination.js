import React, { useEffect } from "react";

const Pagination = ({
  recordsTotal,
  recordsNumber,
  currentIndex,
  setCurrentIndex,
  nextPagination,
}) => {
  useEffect(() => {
    let thumbnails = document.getElementsByClassName("thumbnail");
    thumbnails[currentIndex - 1].classList.add("activePagination");
  });

  const paginationNumber = [];

  const handleClick = (recordsNumber, currentIndex) => {
    let thumbnails = document.getElementsByClassName("thumbnail");
    let activeSpans = document.getElementsByClassName("activePagination");
    if (currentIndex > 0 && currentIndex < recordsTotal / recordsNumber + 1) {
      nextPagination(recordsNumber, currentIndex);
      setCurrentIndex(currentIndex);
      if (activeSpans.length) {
        for (let index = 0; index < activeSpans.length; index++) {
          activeSpans[index].classList.remove("activePagination");
        }
      }
      thumbnails[currentIndex - 1].classList.add("activePagination");
    }
  };

  for (let index = 0; index < recordsTotal / recordsNumber; index++) {
    paginationNumber.push(index + 1);
  }

  return (
    <div className="pagination-container">
      <span onClick={() => handleClick(recordsNumber, currentIndex - 1)}>
        &laquo;
      </span>
      {paginationNumber.map((paginationNumber) => (
        <span
          key={paginationNumber}
          className={"thumbnail"}
          onClick={() => handleClick(recordsNumber, paginationNumber)}
        >
          {paginationNumber}
        </span>
      ))}
      <span onClick={() => handleClick(recordsNumber, currentIndex + 1)}>
        &raquo;
      </span>
    </div>
  );
};

export default Pagination;
