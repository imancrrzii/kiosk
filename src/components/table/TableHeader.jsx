import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const TableHeader = ({ columns = [], onSort }) => {
  return (
    <thead>
      <tr>
        {columns.map((col, idx) => (
          <th
            key={idx}
            className={`
              py-4 px-6 
              bg-sky-500 text-white
              text-xs uppercase font-bold tracking-wider
              ${idx === 0 ? "rounded-l-2xl" : ""}
              ${idx === columns.length - 1 ? "rounded-r-2xl" : ""}
              ${col.headerClassName || ""}
            `}
          >
            <div className={`flex items-center gap-2 ${col.headerClassName || ""}`}>
              {col.header}
              {col.sortable && (
                <button
                  type="button"
                  onClick={() => onSort && onSort(col.accessor)}
                  className="focus:outline-none hover:text-neutral-600 transition-colors"
                  aria-label={`Sort by ${col.header}`}
                >
                  <FontAwesomeIcon icon={faSort} />
                </button>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
