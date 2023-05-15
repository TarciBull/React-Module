import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { stateValues } from "../../common/state-values";
import { DEFAULT_ITEMS_ON_PAGE, DEFAULT_START_PAGE } from "../../common/const";

export const fetchCategories = createAsyncThunk(
  "categoryList/getALL",
  async (payload, options) => {
    const state = options.getState();
    const page = state.categoryList.page;
    const amount = state.categoryList.amount;
    const url = new URL("http://localhost:3010/category");
    const pagination = {
      skip: (page - 1) * 2,
      take: amount,
    };
    url.searchParams.append("pagination", JSON.stringify(pagination));
    const response = await axios.get(url);
    return response.data;
  }
);
const CategorySlice = createSlice({
  name: "categoryList",
  initialState: {
    categories: [],
    error: null,
    status: stateValues.idle,
    page: DEFAULT_START_PAGE,
    amount: DEFAULT_ITEMS_ON_PAGE,
    totalCount: 0,
  },
  reducers: {
    setAmountOnPage: (state, action) => {
      state.amount = action.payload;
      state.page = DEFAULT_START_PAGE;
      state.status = stateValues.idle;
    },
    toIdleStatus: (state) => {
      if (stateValues.status !== stateValues.idle)
        state.status = stateValues.idle;
      state.status = stateValues.idle;
    },
    setPage: (state, action) => {
      state.page = action.payload;
      state.status = stateValues.idle;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = stateValues.loading;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = stateValues.succeeded;
        state.categories = [...action.payload.items];
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = stateValues.failed;
        state.error = action.error.message;
        state.totalCount = 0;
      });
  },
});
export const { toIdleStatus, setPage, setAmountOnPage } = CategorySlice.actions;

export default CategorySlice.reducer;
