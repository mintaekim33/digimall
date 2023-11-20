import React, { useContext } from 'react'
import '../styles/CartItem.css';
import { DataContext } from "../App";

function CartItem({ cartItem }) {
    const { upsertToCart, incrementItemQuantity, deleteCartItem } = useContext(DataContext);

    // console.log(cartItem.id) // not number since it's from the airtable 

  return (
    <div className='cartItemsContainer'>
      <h4>{cartItem.title}</h4>
      <h4>{cartItem.price}</h4>
      <button>-</button>
      <h5> {cartItem.quantity}</h5>
      <button onClick={() => incrementItemQuantity()}>+</button>
      <h5 onClick={() => deleteCartItem(cartItem.id)}>Delete</h5>
    </div>
  )
}

export default CartItem
