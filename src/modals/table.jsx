import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { deleteFromBasket } from "./modal-slice";

const columns = [
  { name: "Name", column: "name" },
  { name: "Category", column: "category.name" },
  { name: "Price", column: "price" },
  { name: "Order" },
  { name: "Amount", column: "amount" },
];

function getDescendantProp(obj, desc) {
  if (!desc) return;
  var arr = desc.split(".");
  while (arr.length && (obj = obj[arr.shift()]));
  return obj;
}
export function OrderTable(props) {
  const dispatch = useDispatch();
  const handleFactoryDelete = (product) => {
    return () => {
      dispatch (deleteFromBasket(product));
    };
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns.map((el) => (
              <TableCell key={el.name}>{el.name}</TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.products.map((product, indexRow) => (
            <TableRow
              key={product.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell key={"productRow" + column.name} component="th" scope="row">
                  {column.column ? (
                    getDescendantProp(product, column.column)
                  ) : (
                    <TextField
                      size="small"
                      error={
                        props.formik?.touched?.products?.[indexRow]?.order &&
                        props.formik?.errors?.products?.[indexRow]?.order
                      }
                      helperText={
                        props.formik?.touched?.products?.[indexRow]?.order &&
                        props.formik?.errors?.products?.[indexRow]?.order
                      }
                      id="order"
                      type="number"
                      {...props.formik.getFieldProps(
                        `products.${indexRow}.order`
                      )}
                    ></TextField>
                  )}
                </TableCell>
              ))}

              <TableCell>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleFactoryDelete(product)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
