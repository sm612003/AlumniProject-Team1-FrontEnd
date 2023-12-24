import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";

// material-ui
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function createData(newsID, title, author, date, description) {
  return { newsID, title, author, date, description };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: "newsID",
    align: "left",
    disablePadding: false,
    label: "News ID",
  },
  {
    id: "title",
    align: "left",
    disablePadding: true,
    label: "Title",
  },
  {
    id: "author",
    align: "left",
    disablePadding: false,
    label: "Author",
  },
  {
    id: "date",
    align: "left",
    disablePadding: false,
    label: "Date",
  },
  {
    id: "description",
    align: "left",
    disablePadding: false,
    label: "Description",
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable({ newsData }) {
  const [order] = useState("desc");
  const [orderBy] = useState("date");
  const [selected] = useState([]);
  const isSelected = (newsID) => selected.indexOf(newsID) !== -1;

  let rows = [];
  rows = Array.isArray(newsData)
    ? newsData.map((news) => {
        return createData(
          news.id,
          news.title,
          news.author,
          new Date(news.date).toISOString().split("T")[0],
          news.description
        );
      })
    : [];

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}>
        <Table
          aria-labelledby="tableTitle"
          sx={{
            "& .MuiTableCell-root:first-of-type": {
              pl: 2,
            },
            "& .MuiTableCell-root:last-of-type": {
              pr: 3,
            },
          }}>
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map(
              (row, index) => {
                const isItemSelected = isSelected(row.newsID);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.newsID}
                    selected={isItemSelected}>
                    <TableCell component="th" id={labelId} scope="row">
                      <Typography color="secondary">{row.newsID}</Typography>
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>
                      <Typography>{row.author}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.description}</Typography>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
