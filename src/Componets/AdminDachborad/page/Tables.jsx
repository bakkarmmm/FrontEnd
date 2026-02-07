import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Tables({ data, tableRow }) {
  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: 3, overflowX: "auto", width: "100%" }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ backgroundColor: "#F9FAFB" }}>
          <TableRow>
            {tableRow.map((column, index) => (
              <TableCell
                key={index}
                sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
              >
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, rowIndex) => {
            return (
              <TableRow key={rowIndex}>
                {tableRow.map((col, colIndex) => (
                  <TableCell key={colIndex} sx={{ whiteSpace: "nowrap" }}>
                    {col.render(item)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
