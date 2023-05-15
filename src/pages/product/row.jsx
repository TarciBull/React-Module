import React, { useMemo } from "react";
import {
  Box,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Table,
  TableBody,
  Button,
} from "@mui/material";
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { useContext } from "react";
import { CurrencyContext } from "../../contex/currency";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../modals/modal-slice";

export function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const currencyContex = useContext(CurrencyContext);
  const exchangeRate = useMemo(() => {
    return currencyContex?.exchange_rate || 1;
  }, [currencyContex?.exchange_rate]);
  const handleFactoryBuy = (product) => {
return ()=>{
    dispatch(addToBasket(product))}
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.categoryName}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.products.length} products
        </TableCell>
        <TableCell component="th" scope="row"></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.products.map((productRow) => (
                    <TableRow key={productRow.id}>
                      <TableCell component="th" scope="row">
                        {productRow.name}
                      </TableCell>
                      <TableCell>{row.categoryName}</TableCell>
                      <TableCell align="right">
                        {productRow.price * exchangeRate}
                      </TableCell>
                      <TableCell align="right">{productRow.amount}</TableCell>
                      <TableCell align="right">
                        <Button onClick={handleFactoryBuy(productRow)}>Buy</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
