import Typography from "@mui/material/Typography";
import Table from "./products-table";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import { decrement,increment } from "../../app/counter-slice";
import { useContext } from "react";
import { CurrencyContext } from "../../contex/currency";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mappedProducts, setMappedProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const fetchProducts = await axios.get("http://localhost:3010/product");
      setProducts(fetchProducts.data.items);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const fetchCategories = await axios.get("http://localhost:3010/category");
      setCategories(fetchCategories.data.items);
    };
    fetchData();
  }, []);
  const context = useContext(CurrencyContext );
  console.log(context)
  useEffect(() => {
    if (products.length && categories.length) {
      const newProducts = products.map((el) => {
        const id = el.category;
        const category = categories.find((elC) => elC.id === id);
        return { ...el, category };
      });
      setMappedProducts(newProducts);
    }
  }, [categories, products]);

  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  return (
    <article>
      <Button  onClick={() => dispatch(increment())}>+1</Button>
      <Typography>{count}</Typography>
      <Button  onClick={() => dispatch(decrement())}>-1</Button>
      <Typography variant="h3">Product List</Typography>
      <section>
        <Table products={mappedProducts} />
      </section>
    </article>
  );
}
export default ProductList;
