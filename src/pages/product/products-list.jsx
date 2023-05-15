import Typography from "@mui/material/Typography";
import Table from "./products-table";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import { CurrencyContext } from "../../contex/currency";
import { stateValues } from "../../common/state-values";
import { fetchProducts, toIdleStatus,} from "../../app/product-list-slice";
import { Alert, AlertTitle } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

function ProductList() {
  const productListStatus = useSelector((state) => {
    return state.productList.status;
  });
  const products = useSelector((state) => {
    return state.productList.products;
  });
  const error = useSelector((state) => {
    return state.productList.error;
  });
  const dispatch = useDispatch();
  const context = useContext(CurrencyContext);
  useEffect(() => {
     dispatch(toIdleStatus());
  }, []);
  useEffect(() => {
    if (productListStatus === stateValues.idle) {
      dispatch(fetchProducts());
    }
  }, [dispatch, productListStatus]);
  let content;
  if (productListStatus === stateValues.loading) {
    content = <LinearProgress />;
  } else if (productListStatus === stateValues.succeeded) {
    content = <Table products={products} />;
  } else if (productListStatus === stateValues.failed) {
    content = (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    );
  }

  return (
    <article>
      <Typography variant="h3">Product List</Typography>
      <section>{content}</section>
    </article>
  );
}
export default ProductList;
