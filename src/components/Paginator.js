import React from "react";

const Paginator = ({ pageIndex, totalItemLength, countPerPage, paginate }) => {
  const pages = [];
  for (let i = 0; i < Math.floor(totalItemLength / countPerPage); i++) {
    pages.push(i);
  }

  return (
    <nav
      className="pagination has-text-centered"
      role="navigation"
      aria-label="pagination"
    >
      <ul className="pagination-list">
        {pages.map((page, i) => (
          <li key={"pagenation-" + i}>
            <a
              className={`pagination-link ${
                page === pageIndex ? "is-current" : ""
              }`}
              aria-label={`Page ${page}`}
              aria-current="page"
              onClick={() => paginate(page)}
            >
              {page + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginator;
