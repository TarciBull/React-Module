import React from "react";
import { TableCell, TableRow } from "@mui/material";

export function Row(props) {
  const { row } = props;

  return (
    <TableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell component="th" scope="row">
        {row.symbol}
      </TableCell>
      <TableCell component="th" scope="row">
        {row.exchange_rate}
      </TableCell>
    </TableRow>
  );
}
