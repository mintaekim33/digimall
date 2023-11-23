import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import '../styles/Cart.css';

function Cart({ cartData, cartItems, setCartItems, fetchCartData }) {

  return (
    <div className='cartContainer'>
      {cartData && cartData.map(cartItem => {
        return <CartItem key={cartItem.id} cartItem={cartItem} />
      })}
    </div>
  )
}

export default Cart
