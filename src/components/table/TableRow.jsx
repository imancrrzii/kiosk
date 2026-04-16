import React from "react";

const TableRow = ({ children, className = "", ...props }) => {
  return (
    <tr
      className={`hover:bg-sky-50/50 rounded-l-2xl rounded-r-2xl transition-colors duration-150 group ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
};

export default TableRow;
