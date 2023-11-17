import React from 'react'
import CartItem from './CartItem'

function Cart({cartItems}) {
  return (
    <div>
      {cartItems.map(cartItem => {
        return <CartItem key={cartItem.id} cartItem={cartItem} />
      })}
    </div>
  )
}

export default Cart
