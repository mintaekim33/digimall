import { Paper } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../App";

function ProductCard({ product, addButtonHandler, itemQuantity, incrementItemQuantity }) {
  const { upsertToCart, renderAddedCartItems, cartItems } = useContext(DataContext);
  // console.log(dataContext)

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
      // quantity: itemQuantity,
      quantity: itemQuantity,
    },
};
  
  function addButtonHandler() {
    // cartData.fields.quantity++
      incrementItemQuantity();
      console.log(itemQuantity)
      // console.log("pdt from prop passed down: ", product);
    // setSelectedProduct(product); // choose selected product
    // console.log("selectedProduct: ", selectedProduct);
    //    constructCartData(product); // create request body in a required format
    //   performUpsert: {
        //     fieldsToMergeOn: [
            //         "title"
            //     ]
            //   }
    // add logic to not update airtable if product already in the airtable
    // if (cartItems.includes(product)) { // perform upsert
    //   // only update the qty in the airtable (also need to sync up airtable and cart UI page)
    //   console.log(cartItems)
    //   console.log(product)
    //   console.log("there is a duplicate")
    // //   incrementItemQuantity();
    //   return;
    // } else {
    //     console.log(cartItems)
    //     console.log(product)
    //     console.log("no duplicate")
    //  addToCart(cartData); // send post request
  upsertToCart(product.id, cartData); // send post request
      renderAddedCartItems(product); // display cart items
    // }
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
