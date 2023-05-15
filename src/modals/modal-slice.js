import { createSlice } from "@reduxjs/toolkit";

export const OrderSlice = createSlice({
  name: "makeOrder",
  initialState: {
    products: [],
    error: null,
  },
  reducers: {
    addToBasket: (state, action) => {
      const found = state.products.findIndex(
        (el) => el.id === action.payload.id
      );
      if (found < 0)
        state.products = [...state.products, { ...action.payload, order: 1 }];
    },
    deleteFromBasket: (state, action) => {
      const found = state.products.findIndex(
        (el) => el.id === action.payload.id
      );
      if (found >= 0) state.products.splice(found, 1);
    },
    cleanup: (state) => {
      state.products = [];
    },
    // toIdleStatus: (state) => {
    //   if (stateValues.status !== stateValues.idle)
    //     state.status = stateValues.idle;
    //   state.status = stateValues.idle;
    // },
  },
});
export const { toIdleStatus, addToBasket, deleteFromBasket, cleanup } =
  OrderSlice.actions;
export default OrderSlice.reducer;
