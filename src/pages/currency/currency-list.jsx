import Typography from "@mui/material/Typography";
import Table from './currency-table'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stateValues } from "../../common/state-values";
import { fetchCurrency, toIdleStatus } from "./currency-list-slice";
import { Alert, AlertTitle,} from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress'

function CurrencyList() {
  const currencyListStatus = useSelector((state) => {
    return state.currencyList.status;
  });
  const currency = useSelector((state) => {
    return state.currencyList.currency;
  });
  const error = useSelector((state) => {
    return state.currencyList.error;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toIdleStatus());
 }, []);
  useEffect(() => {
    if (currencyListStatus === stateValues.idle) {
      dispatch(fetchCurrency());
    }
  }, [dispatch, currencyListStatus]);
  let content;
  if (currencyListStatus === stateValues.loading) {
    content = <LinearProgress />;
  } else if (currencyListStatus === stateValues.succeeded) {
    content = <Table currency={currency} />;
  } else if (currencyListStatus === stateValues.failed) {
    content = (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    );
  }

  return (
    <article>
      <Typography variant="h3">Currency List</Typography>
      <section>{content}</section>
    </article>
  );
}
export default CurrencyList;
