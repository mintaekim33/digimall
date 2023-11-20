import React, { useContext } from 'react'
import '../styles/CartItem.css';
import { DataContext } from "../App";

function CartItem({ cartItem }) {
    const { upsertToCart } = useContext(DataContext);
  return (
    <div className='cartItemsContainer'>
      <h4>{cartItem.title}</h4>
      <h4>{cartItem.price}</h4>
      <button>-</button>
      <h5> {cartItem.quantity}</h5>
      <button onClick={() => upsertToCart(cartItem.id,)}>+</button>
      <h5>Delete</h5>
    </div>
  )
}

export default CartItem
