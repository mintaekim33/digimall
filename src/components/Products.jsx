import React from "react";
import ProductCard from "./ProductCard";
import "../styles/Products.css";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Products({ products, setProducts }) {
  async function search(e) {
    // fetch products data using the search keyword
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${e.target.value}`
    );
    const jsonData = await response.json();
    // display filtered products
    setProducts(jsonData.products);
  }

  return (
    <div className="productContainer">
      <Paper
        component="form"
        sx={{
          m: "50px auto",
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          borderRadius: "10px",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
          onChange={search}
          className="searchBar"
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {products &&
        products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
    </div>
  );
}

export default Products;
