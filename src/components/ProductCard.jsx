import { Paper } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../App";
import "../styles/ProductCard.css";

function ProductCard({ product, addButtonHandler }) {
  const { incrementItemQuantity, cartData, addToCart } =
    useContext(DataContext);

  function addButtonHandler() {
    // if cart items includes product
    const chosenProduct = cartData.find((item) => {
      return item.id === product.id;
    });

    // if the product exists in the cart
    if (chosenProduct) {
      incrementItemQuantity(chosenProduct);
    } else {
      // if item doesn't already exist in cart
      const itemData = {
        fields: {
          id: product.id,
          brand: product.brand,
          category: product.category,
          description: product.description,
          discountPercentage: product.discountPercentage,
          image: product.images[0],
          price: product.price,
          rating: product.rating,
          stock: product.stock,
          thumbnail: product.thumbnail,
          title: product.title,
          quantity: 1,
        },
      };
      addToCart(itemData);
    }
  }

  return (
    <Paper className="productCard">
      <Link to={"/products/" + product.id}>
        <img src={product.images[0]} width="300" height="200" />
        <h5>{product.title}</h5>
      </Link>
      <h5>${product.price}</h5>
      <button onClick={addButtonHandler}>Add to cart</button>
    </Paper>
  );
}

export default ProductCard;
