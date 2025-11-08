import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { dashboardData } from "../../data/dashboardData";
import TableHead from "@mui/material/TableHead";
import BasicSelect from "../ui/Select";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Calendar } from "lucide-react";

const transactions = dashboardData.transactions;

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => onPageChange(event, 0);
  const handleBackButtonClick = (event) => onPageChange(event, page - 1);
  const handleNextButtonClick = (event) => onPageChange(event, page + 1);
  const handleLastPageButtonClick = (event) =>
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sortDate, setSortDate] = React.useState("newToOld");
  const rowsPerPage = 5;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions.length) : 0;

  const handleChangePage = (event, newPage) => setPage(newPage);

  const sortedTransactions = [...transactions].sort((a, b) =>
    sortDate === "newToOld"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  const paginated = sortedTransactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  if (isMobile) {
    return (
      <div>
        <div className="flex justify-between">
          <p className="text-2xl font-semibold p-4">Transactions</p>
          <BasicSelect setSortDate={setSortDate} />
        </div>
        <Box display="grid" p={2} gap={2}>
          {paginated.map((trans) => {
            const changeBg =
              trans.status === "Completed"
                ? "bg-green-500"
                : trans.status === "Pending"
                ? "bg-yellow-500"
                : trans.status === "Failed"
                ? "bg-red-500"
                : "";
            return (
              <div
                className="flex flex-col rounded-md p-4 shadow-md gap-2"
                key={trans.id}
              >
                <div className="flex text-lg font-semibold justify-between">
                  <span>{trans.user}</span>
                  <span>{trans.amount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="flex" />
                  <span>{trans.date}</span>
                </div>
                <div className="flex">
                  <span
                    className={` justify-center flex rounded-lg p-1 ${changeBg}`}
                  >
                    {trans.status}
                  </span>
                </div>
              </div>
            );
          })}

          <TablePagination
            component="div"
            rowsPerPageOptions={[]}
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            ActionsComponent={TablePaginationActions}
          />
        </Box>
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-2xl font-semibold p-4">Transactions</p>
        <BasicSelect setSortDate={setSortDate} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, fontSize: "16px" }}>
                User
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, fontSize: "16px" }}
                align="right"
              >
                Date
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, fontSize: "16px" }}
                align="right"
              >
                Amount
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, fontSize: "16px" }}
                align="right"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((trans) => {
              const changeBg =
                trans.status === "Completed"
                  ? "bg-green-500"
                  : trans.status === "Pending"
                  ? "bg-yellow-500"
                  : trans.status === "Failed"
                  ? "bg-red-500"
                  : "";
              return (
                <TableRow key={trans.id}>
                  <TableCell component="th" scope="row">
                    <span>{trans.user}</span>
                  </TableCell>
                  <TableCell align="right">
                    <div className="flex items-center justify-end gap-2">
                      <Calendar className="flex" />
                      <span>{trans.date}</span>
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <span className="font-bold text-[16px]">
                      {trans.amount}
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    <div className="w-full flex  justify-end">
                      <span
                        className={`w-[85px] justify-center flex rounded-lg p-2 ${changeBg}`}
                      >
                        {trans.status}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                colSpan={4}
                count={transactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
