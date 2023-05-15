import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { AttachMoney } from "@mui/icons-material";
import MainMenuItems from "./main-menu-items";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import style from "./app-bar.module.css";
import { IconButton } from "@mui/material";
import { OrderModal } from "./modals/order";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";

export default function ButtonAppBar(props) {
  const products = useSelector((state) => {
    return state.makeOrder.products;
  });
  const [anchoreMenu, setAnchorMenu] = React.useState(null);
  const [anchorCurrency, setAnchorCurrency] = useState(null);
  const open = Boolean(anchoreMenu);
  const openCurrency = Boolean(anchorCurrency);
  const handleClickCurrency = (event) => {
    setAnchorCurrency(event.currentTarget);
  };
  const FactoryHandleCloseCurrency = (id) => {
    return (event) => {
      console.log(id);
      setAnchorCurrency(null);
      const find = currency.find((el) => el.id === id);
      if (find) {
        props.context.setCurrentCurrency(find);
      }
    };
  };

  const [currency, SetCurrency] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get("http://localhost:3010/currency");
      SetCurrency(result.data.items);
      props.context.setCurrentCurrency(result.data.items[0]);
    };
    fetch();
  }, []);
  const handleBusketClick = () => {
    handleOpenOrder();
  };
  const [openOrder, setOpenOrder] = React.useState(false);
  const handleOpenOrder = () => setOpenOrder(true);
  const handleCloseOrder = () => setOpenOrder(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            component="img"
            sx={{
              height: 64,
            }}
            alt="Your logo."
            src="https://www.freepnglogos.com/uploads/shopee-logo/shopee-hd-logo-transparent-0.png"
          />
          <MainMenuItems />
          <AttachMoney
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClickCurrency}
          ></AttachMoney>
          {props.context?.CurrentCurrency?.symbol || ""}{" "}
          {props.context?.CurrentCurrency?.name || ""}
          <Menu
            id="currency-menu"
            anchorEl={anchorCurrency}
            open={openCurrency}
            onClose={FactoryHandleCloseCurrency}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {currency.map((el) => {
              return (
                <MenuItem
                  key={el.id}
                  onClick={FactoryHandleCloseCurrency(el.id)}
                >
                  {el.symbol}
                  {el.name}
                </MenuItem>
              );
            })}
          </Menu>
          <div className={style.space}></div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleBusketClick}
          >
            <Badge badgeContent={products.length ? products.length : undefined} color="warning"></Badge>
            <ShoppingBasketIcon />
            <Badge />
          </IconButton>
          <OrderModal open={openOrder} handleCloseOrder={handleCloseOrder} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
