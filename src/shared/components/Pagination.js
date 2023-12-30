import React from "react";
import { Link } from "react-router-dom";
const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];
  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } 
  else {
    // Nếu tổng số trang lớn hơn 3 và trang hiện tại là trang cuối cùng
    if (currentPage === totalPages) {
      for (let i = currentPage - 2; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      for (let i = currentPage; i <= currentPage + 2; i++) {
        if (i < totalPages + 1)
          pageNumbers.push(i);
      }
    }
  }
  return (
    <div id="pagination">
      <ul className="pagination">
        {
          currentPage !== 1 ? <li className="page-item">
            <Link
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
            >
              <i className="fa-solid fa-angle-left" />
            </Link>
          </li> : null
        }
        {pageNumbers.map((number) => (
          <li
            className={`page-item ${currentPage === number ? "active" : ""}`}
            key={number}
          >
            <Link className="page-link" onClick={() => paginate(number)}>
              {number}
            </Link>
          </li>
        ))}
        {
          currentPage !== totalPages ? <li className="page-item">
            <Link
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
            >
              <i className="fa-solid fa-angle-right" />
            </Link>
          </li> : null 
        }
      </ul>
    </div>
  );
};

export default Pagination;
