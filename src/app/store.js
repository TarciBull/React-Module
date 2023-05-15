import { configureStore } from "@reduxjs/toolkit";
import ProductListSlice from "./product-list-slice";
import CategoryListSlice from "../pages/category/category-list-slice";
import CurrencyListSlice from "../pages/currency/currency-list-slice";
import OrderSlice  from "../modals/modal-slice";
export default configureStore({
  reducer: {
    productList: ProductListSlice,
    categoryList : CategoryListSlice,
    currencyList : CurrencyListSlice,
    makeOrder: OrderSlice
  },
});
