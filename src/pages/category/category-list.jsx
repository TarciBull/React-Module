import Typography from "@mui/material/Typography";
import Table from "./category-table";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import { CurrencyContext } from "../../contex/currency";
import { stateValues } from "../../common/state-values";
import {
  fetchCategories,
  setAmountOnPage,
  setPage,
  toIdleStatus,
} from "./category-list-slice";
import { Alert, AlertTitle } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

function CategoryList() {
  const onPaginationChange = (event, page) => {
    dispatch(setPage(page));
  };
  const amountSelector = useSelector((state) => {
    return state.categoryList.amount;
  });
  const totalAmountOfPageSelector = useSelector((state) => {
    return state.categoryList.totalCount;
  });
  const categorytListStatus = useSelector((state) => {
    return state.categoryList.status;
  });
  const pageSelector = useSelector((state) => {
    return state.categoryList.page;
  });
  const categories = useSelector((state) => {
    return state.categoryList.categories;
  });
  const error = useSelector((state) => {
    return state.categoryList.error;
  });
  const handleChange = (event) => {
    dispatch(setAmountOnPage(event.target.value));
  };
  const dispatch = useDispatch();
  const context = useContext(CurrencyContext);
  useEffect(() => {
    dispatch(toIdleStatus());
  }, []);
  useEffect(() => {
    if (categorytListStatus === stateValues.idle) {
      dispatch(fetchCategories(pageSelector));
    }
  }, [dispatch, categorytListStatus, pageSelector]);
  let content;
  if (categorytListStatus === stateValues.loading) {
    content = <LinearProgress />;
  } else if (categorytListStatus === stateValues.succeeded) {
    content = <Table categories={categories} />;
  } else if (categorytListStatus === stateValues.failed) {
    content = (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    );
  }

  return (
    <article>
      <Typography variant="h3">Categories List</Typography>
      <section>{content}</section>
      <Pagination
        page={pageSelector}
        count={totalAmountOfPageSelector /amountSelector}
        variant="outlined"
        color="primary"
        onChange={onPaginationChange}
      />
      <Box>
        <Select
          labelId="demo-simple-select-pagination"
          id="demo-simple-select-autowidth"
          value={amountSelector}
          onChange={handleChange}
          autoWidth
          label="pagination"
        >
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </Box>
    </article>
  );
}
export default CategoryList;
