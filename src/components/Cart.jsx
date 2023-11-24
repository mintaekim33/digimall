import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import "../styles/Cart.css";
import { Link } from "react-router-dom";

function Cart({ cartData }) {
  const calculatedTotal = cartData.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return cartData.length === 0 ? (
    <div className="blankCartContainer">
      <div className="empty">Your cart is empty</div>
      <Link to="/products" className="products-link">
        Go fill my cart
      </Link>
    </div>
  ) : (
    <div className="cartContainer">
      <div className="total">Total: {calculatedTotal}</div>
      {cartData &&
        cartData.map((cartItem) => {
          return <CartItem key={cartItem.id} cartItem={cartItem} />;
        })}
    </div>
  );
}

export default Cart;
