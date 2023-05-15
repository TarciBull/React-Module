import ProductList from "./pages/product/products-list";
import store from "./app/store";
import { Provider } from "react-redux";
import AppBar from "./app-bar";
import { useState } from "react";
import { CurrencyContext } from "./contex/currency";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoryList from "./pages/category/category-list";
import CurrencyList from "./pages/currency/currency-list";
import {Main} from "./pages/main/main";

function App() {
  const [CurrentCurrency, setCurrentCurrency] = useState(null);

  return (
    <Provider store={store}>
      <CurrencyContext.Provider value={CurrentCurrency}>
        <BrowserRouter>
          <AppBar context={{ CurrentCurrency, setCurrentCurrency }} />
          <Routes>
            <Route path="" element={<Main />} />
            <Route path="products" element={<ProductList />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="currency" element={<CurrencyList />} />
          </Routes>
        </BrowserRouter>
      </CurrencyContext.Provider>
    </Provider>
  );
}


export default App;
