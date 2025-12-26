import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "@mui/material/TablePaginationActions";

export default function CustomTable({
  sortedTransactions,
  columns,
  rows,
  rowsPerPage = 5,
  isItemSelected,
}) {
  const [page, setPage] = React.useState(0);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const paginated = sortedTransactions
    ? sortedTransactions.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    : rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 500,
          width: "100%",
          "& .checkbox-cell": {
            width: "40px",
            padding: "0",
            textAlign: "center",
          },
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.id}
                className={col.id === "checkbox" ? "checkbox-cell" : ""}
                align={col.align || "left"}
                sx={{ fontWeight: 600, width: "25%", fontSize: "16px" }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {paginated.map((row) => (
            <TableRow key={row.id}>
              {columns.map((col) => {
                const value = row[col.id];

                return (
                  <TableCell key={col.id} align={col.align || "left"}>
                    {col.render ? col.render(value, row) : value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={columns.length} />
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[]}
              colSpan={columns.length}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
