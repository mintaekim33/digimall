import React, { useState } from "react";
import ProductCard from "./ProductCard";
import "../styles/Products.css";
import {
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Products({ products, setProducts, addButtonHandler }) {

  async function search(e) {
    //   const filteredProducts = products.filter(searchProduct => {
    //     //   console.log(searchProduct)
    //     return searchProduct.title.toLowerCase().includes(e.target.value.toLowerCase());
    //   })
    //   setProducts(filteredProducts);

    const response = await fetch(`https://dummyjson.com/products/search?q=${e.target.value}`)
    const jsonData = await response.json();
    setProducts(jsonData.products);
  };

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
          onChange={search}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {products && products.map((product) => {
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
