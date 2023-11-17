import React from 'react'
import '../styles/CartItem.css';

function CartItem({ cartItem }) {
  return (
    <div className='cartItemsContainer'>
      <h3>{cartItem.title}</h3>
      <h3>{cartItem.category}</h3>
      <h3>{cartItem.price}</h3>
    </div>
  )
}

export default CartItem
