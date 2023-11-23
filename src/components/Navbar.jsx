import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

function Navbar() {
  return (
    // <nav className='navbar'>
    //   <Link to="/">Home</Link>
    //   <Link to="/products">Products</Link>
    //   <Link to="/about">About</Link>
    //   <Link to="/login">Login</Link>
    //   <Link to="/cart">Cart</Link>
    // </nav>
    <AppBar position="static">
      <Toolbar>
        <LocalOfferOutlinedIcon />
        <Typography  className='digimall' variant="h6" component='div' sx={{ flexGrow: 1 }}>
          Digimall
        </Typography>
        <Stack direction="row" spacing={3}>
          <Link className="navlink" to="/">
            Home
          </Link>
          <Link className="navlink" to="/products">
            Products
          </Link>
          <Link className="navlink" to="/cart">
            Cart
          </Link>
          <Link className="navlink" to="/login">
            Login
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
