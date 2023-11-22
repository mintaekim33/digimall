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
    cartData,
    fetchCartData,
    addToCart
  } = useContext(DataContext);

  //   const [itemQuantity, setItemQuantity] = useState(1);
  //     function incrementItemQuantity() {
  //         setItemQuantity(itemQuantity + 1);
  //     }

  // console.log(product.id)
  // console.log(itemQuantity)
  // console.log(itemQuantity[product.id - 1])
  //   console.log(cartData)

  // const [chosenProductId, setChosenProductId] = useState(null);
  // const chosenProduct = cartData.find(item => {
  //     // console.log(item.id)
  //     // console.log(product.id)
  //     return item.id === chosenProductId;
  // })

  //     console.log(cartData)
  //   console.log(product)
  // console.log(chosenProductId)

  //   // if item doesn't already exist in cart
  //   const itemData = {
  //     fields: {
  //       id: product.id,
  //       brand: product.brand,
  //       category: product.category,
  //       description: product.description,
  //       discountPercentage: product.discountPercentage,
  //       image: product.images[0],
  //       price: product.price,
  //       rating: product.rating,
  //       stock: product.stock,
  //       thumbnail: product.thumbnail,
  //       title: product.title,
  //       //   quantity: itemQuantity[product.id - 1] + 1,
  //       quantity: 1, // need to get the quantity of the correct product (using chosenProduct?)
  //       //   quantity: chosenProduct.quantity// need to get the quantity of the correct product (using chosenProduct?)
  //     },
  //   };

  // console.log(cartData)
  //   console.log(product.id)

  function addButtonHandler() {
    // if cart items includes product
    console.log(cartData)
    // console.log(product)
    // if (cartData.forEach(item => {
    //     if (item.id === product.id) {

    //     }
    // })) {
    const chosenProduct = cartData.find((item) => {
      //   console.log(item.id);
      //   console.log(product.id);
      return item.id === product.id;
    });
      console.log(chosenProduct)

    // if the product exists in the cart
    if (chosenProduct) {
      const quantityData = {
        fields: {
          //   quantity: itemQuantity[product.id - 1] + 1,
          //   quantity: chosenProduct ? chosenProduct.quantity + 1 : 0// need to get the quantity of the correct product (using chosenProduct?)
          // quantity: 1 // need to get the quantity of the correct product (using chosenProduct?)
          quantity: chosenProduct.quantity + 1, // need to get the quantity of the correct product (using chosenProduct?)
        },
      };
      console.log(product)
      incrementItemQuantity(product);
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
          quantity: 1
        },
      };
      addToCart(itemData);
      fetchCartData();
    }

    // } else {
    //     console.log("second")
    //     // post request here
    // }

    // if item already exists in cart
    // console.log(itemQuantity);
    // setChosenProductId(product.id) // get the product id of the product whose button is clicked
    // console.log(cartData);
    // console.log(chosenProductId)
    // console.log(chosenProduct)

    // upsertToCart(product.id, itemData, quantityData); // send post request

    // fetch cart data again to update the item quantity
    // fetchCartData();
    // console.log(itemData.fields.quantity);
    // console.log(quantityData.fields.quantity);
      renderAddedCartItems(product); // display cart items
    //   console.log(cartItems)
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
