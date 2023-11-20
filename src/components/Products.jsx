import React, { useState } from "react";
import ProductCard from "./ProductCard";
import "../styles/Products.css";
import {
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Products({ products, addButtonHandler }) {

  function search() {
    const input = document.querySelector(".search-bar").value;
    if (input === "") {
      return;
    } else {
      products.filter(searchProduct => {

      })
      document.querySelector(".search-bar").value = "";
    }
  };

  function keyHandler(e) {
    if (e.key === "Enter") {
      search();
    }
  }

  return (
    <div className="productContainer">

      <Paper
        component="form"
        sx={{ m: "30px auto", p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            product={product}
            // itemQuantity={itemQuantity}
            // incrementItemQuantity={incrementItemQuantity}
          />
        );
      })}
    </div>
  );
}

export default Products;
