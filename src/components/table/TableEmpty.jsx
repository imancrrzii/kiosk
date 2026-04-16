import React from "react";

const TableEmpty = ({ colSpan, message = "No records found." }) => {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="py-10 text-center text-neutral-400 text-sm font-medium"
      >
        {message}
      </td>
    </tr>
  );
};

export default TableEmpty;
