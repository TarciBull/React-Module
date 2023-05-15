import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Row } from "./row";

export default function CurrencyTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Currency</TableCell>
            <TableCell align="left">Symbol</TableCell>
            <TableCell align="left">Exchange Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.currency.map((row) => (
            <Row row={row} key={row.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
