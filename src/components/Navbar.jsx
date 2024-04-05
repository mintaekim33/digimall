import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { DataContext } from "../App";

function Navbar() {
  const { cartData } = useContext(DataContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          className="digimall"
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          <Link className="navlink" to="/">
            Digimall
          </Link>
        </Typography>
        <Stack direction="row" spacing={3}>
          <Link className="navlink" to="/">
            Home
          </Link>
          <Link className="navlink" to="/products">
            Products
          </Link>
          <Link className="navlink" to="/login">
            Login
          </Link>
          <div className="nav-cart">
            <span>{cartData.length}</span>
            <Link className="navlink" to="/cart">
              <ShoppingCartIcon />
            </Link>
          </div>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
