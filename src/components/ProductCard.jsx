import { Paper } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../App";

function ProductCard({ product, addButtonHandler }) {
  const { upsertToCart, renderAddedCartItems, cartItems, isInCart, itemQuantity, incrementItemQuantity } = useContext(DataContext);

//   const [itemQuantity, setItemQuantity] = useState(1);
//     function incrementItemQuantity() {
//         setItemQuantity(itemQuantity + 1);
//     }

  const cartData = {
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
      quantity: itemQuantity,
    },
};
  
  function addButtonHandler() {
    
    // if (isInCart) incrementItemQuantity();

      const quantityData = {
        fields: {
            quantity: itemQuantity
        }
      }

      upsertToCart(product.id, cartData, quantityData); // send post request
      console.log(cartData.fields.quantity)
      console.log(quantityData.fields.quantity)
      renderAddedCartItems(product); // display cart items
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
