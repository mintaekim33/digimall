import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import "../styles/Cart.css";
import { Link } from "react-router-dom";

function checkout() {
  fetch("/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Send along all the information about the items
    body: JSON.stringify({
      items: [
        {
          id: 1,
          quantity: 2,
        },
        {
          id: 2,
          quantity: 1,
        },
      ],
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      // If there is an error then make sure we catch that
      return res.json().then((e) => Promise.reject(e));
    })
    .then(({ url }) => {
      // On success redirect the customer to the returned URL
      // window.location = url;
      console.log(url);
    })
    .catch((e) => {
      console.error(e.error);
    });
}

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
    <>
      <div className="cartContainer">
        <div className="total">Total: ${calculatedTotal}</div>
        {cartData &&
          cartData.map((cartItem) => {
            return <CartItem key={cartItem.id} cartItem={cartItem} />;
          })}
      </div>
      <button className="checkoutBtn" onClick={checkout}>
        Checkout
      </button>
      {/* form action="/create-checkout-session" method="POST" */}
    </>
  );
}

export default Cart;
