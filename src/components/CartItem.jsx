import React from 'react'
import '../styles/CartItem.css';

function CartItem({ cartItem }) {
  return (
    <div className='cartItemsContainer'>
      <h4>{cartItem.title}</h4>
      <h4>{cartItem.category}</h4>
      <h4>{cartItem.price}</h4>
    </div>
  )
}

export default CartItem
