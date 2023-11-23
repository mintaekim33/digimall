import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'

function Cart({ cartData, cartItems, setCartItems, fetchCartData }) {

  return (
    <div>
      {cartData && cartData.map(cartItem => {
        return <CartItem key={cartItem.id} cartItem={cartItem} />
      })}
    </div>
  )
}

export default Cart
