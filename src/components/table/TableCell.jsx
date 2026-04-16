import React from "react";

const TableCell = ({ children, className = "", isLastRow = false, ...props }) => {
  return (
    <td
      className={`py-5 px-6 first:rounded-l-xl last:rounded-r-xl text-sm text-gray-800 font-medium ${
        !isLastRow ? "border-b-2 border-neutral-100" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </td>
  );
};

export default TableCell;
