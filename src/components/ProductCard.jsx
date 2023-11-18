import { Paper } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../App";

function ProductCard({ product, addButtonHandler, quantity }) {
  const { addToCart, renderAddedCartItems, cartItems } =
    useContext(DataContext);
  // console.log(dataContext)

  function addButtonHandler() {
    // console.log("pdt from prop passed down: ", product);
    // setSelectedProduct(product); // choose selected product
    // console.log("selectedProduct: ", selectedProduct);
    //    constructCartData(product); // create request body in a required format
    const cartData = { // data to SEND
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
    // add logic to not update airtable if product already in the airtable
    if (cartItems.includes(product)) {
      // ONLY update the qty in the airtable (also need to sync up airtable and cart UI page)
      console.log(cartItems)
      console.log(product)
      console.log("there is a duplicate")
      return;
    } else {
        console.log(cartItems)
        console.log(product)
        console.log("no duplicate")
      addToCart(cartData); // send post request
      renderAddedCartItems(product); // display cart items
    }
  }

  return (
    <Paper>
      <Link to={"/products/" + product.id}>
        <img src={product.images[0]} />
        <h5>{product.title}</h5>
      </Link>
      <h5>${product.price}</h5>
      <button onClick={addButtonHandler}>Add to cart</button>
    </Paper>
  );
}

export default ProductCard;
