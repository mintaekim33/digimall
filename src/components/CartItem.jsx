import React, { useContext } from "react";
import "../styles/CartItem.css";
import { DataContext } from "../App";

function CartItem({ cartItem }) {
  const { deleteCartItem, incrementItemQuantity, decrementItemQuantity } =
    useContext(DataContext);

  return (
    <div className="cartItemsContainer">
      <h4>{cartItem.title}</h4>
      <h4>${cartItem.price}</h4>
      <div className="quantity">
        <button onClick={() => incrementItemQuantity(cartItem)}>+</button>
        <h5>{cartItem.quantity}</h5>
        <button onClick={() => decrementItemQuantity(cartItem)}>-</button>
      </div>
      <h5 onClick={() => deleteCartItem(cartItem.id)}>Remove</h5>
    </div>
  );
}

export default CartItem;
