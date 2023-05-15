import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { stateValues } from "../../common/state-values";

export const fetchCurrency = createAsyncThunk(
  "currencyList/getALL",
  async () => {
   const response = await axios.get("http://localhost:3010/currency");
  return response.data.items}
);
 const currencySlice = createSlice({
  name: "currencyList",
  initialState: {
    currency: [],
    error: null,
    status: stateValues.idle,
  },
  reducers: {
    toIdleStatus: (state) => {
      if (stateValues.status !== stateValues.idle)
        state.status = stateValues.idle;
      state.status = stateValues.idle;
    },
},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrency.pending, (state, action) => {
        state.status = stateValues.loading;
      })
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.status = stateValues.succeeded;
        state.currency = [...action.payload];
      })
      .addCase(fetchCurrency.rejected, (state, action) => {
        state.status = stateValues.failed;
        state.error = action.error.message;
      });
  },
});
export const { toIdleStatus } =  currencySlice.actions;

export default currencySlice.reducer;
