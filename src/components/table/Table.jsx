import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableCell from "./TableCell";
import TableEmpty from "./TableEmpty";
import TableLoading from "./TableLoading";
import TablePagination from "./TablePagination";

const Table = ({
  columns = [],
  data = [],
  className = "",
  isLoading = false,
  pagination = null, // Format: { currentPage: 1, totalPages: 5, onPageChange: (page) => {} }
  onSort,
}) => {
  return (
    <div className={`w-full flex flex-col ${className}`}>
      {/* ── Table Area ── */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0 min-w-max">
          <TableHeader columns={columns} onSort={onSort} />

          <tbody>
            {isLoading ? (
              <TableLoading colSpan={columns.length} />
            ) : data.length > 0 ? (
              data.map((row, rowIndex) => {
                const isLastRow = rowIndex === data.length - 1;
                return (
                  <TableRow key={rowIndex}>
                    {columns.map((col, colIndex) => (
                      <TableCell
                        key={colIndex}
                        isLastRow={isLastRow}
                        className={col.cellClassName}
                      >
                        {col.render
                          ? col.render(row[col.accessor], row, rowIndex)
                          : row[col.accessor]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableEmpty colSpan={columns.length} />
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination Area ── */}
      {pagination && !isLoading && data.length > 0 && (
        <TablePagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
};

export default Table;
