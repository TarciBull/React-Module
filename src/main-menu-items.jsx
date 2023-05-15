import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MainMenuItem from "./main-menu-item";
import { useNavigate } from "react-router-dom";

const pages = [
  { name: "Products", path: "products" },
  { name: "Categories", path: "/categories" },
  { name: "Currency", path: "/currency" },
  { name: "Main", path: "/" },
];
export default function MainMenuItems() {
  const [anchoreMenu, setAnchorMenu] = React.useState(null);
  const open = Boolean(anchoreMenu);
  const navigate = useNavigate();

  const handleClickMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleCloseMenu = (event, selectedMenu) => {
    setAnchorMenu(null);
    if (selectedMenu) navigate(selectedMenu.path);
  };

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleClickMenu}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchoreMenu}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {pages.map((page) => {
          return (
            <MainMenuItem
              key={page.name}
              handleCloseMenu={handleCloseMenu}
              menu={page}
            >
              {page.name}
            </MainMenuItem>
          );
        })}
        {/* <MenuItem onClick={handleCloseMenu}>Products</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Category</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Currency</MenuItem> */}
      </Menu>
    </>
  );
}
