import { Paper } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../App";
import "../styles/ProductCard.css";

function ProductCard({ product, addButtonHandler }) {
  const {
    upsertToCart,
    renderAddedCartItems,
    cartItems,
    isInCart,
    itemQuantity,
    incrementItemQuantity,
    cartData
  } = useContext(DataContext);

  //   const [itemQuantity, setItemQuantity] = useState(1);
  //     function incrementItemQuantity() {
      //         setItemQuantity(itemQuantity + 1);
      //     }
      
      // console.log(product.id)
      // console.log(itemQuantity)
      // console.log(itemQuantity[product.id - 1])
      console.log(cartData)
      
  const chosenProduct = cartData.find(item => { // study this
    console.log(item.id)
    console.log(product.id)
    return item.id === product.id;
  })

  console.log(chosenProduct)

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
    //   quantity: itemQuantity[product.id - 1] + 1,
      quantity: 1 // need to get the quantity of the correct product (using chosenProduct?)
    },
  };

  // if item already exists in cart
  const quantityData = {
    fields: {
    //   quantity: itemQuantity[product.id - 1] + 1,
      quantity: 1 // need to get the quantity of the correct product (using chosenProduct?)
    },
  };

  function addButtonHandler() {
    console.log(itemQuantity);

    upsertToCart(product.id, itemData, quantityData); // send post request
    console.log(itemData.fields.quantity);
    console.log(quantityData.fields.quantity);
    //   renderAddedCartItems(product); // display cart items
  }

  return (
    <Paper className="productCard">
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
