import React, { useContext } from 'react'
import '../styles/CartItem.css';
import { DataContext } from "../App";

function CartItem({ cartItem }) {
    const { upsertToCart, deleteCartItem, updateItemQuantity, fetchCartData, incrementItemQuantity, decrementItemQuantity } = useContext(DataContext);

    // console.log(cartItem.id) // not number since it's from the airtable 
    console.log(cartItem)

    // async function incrementItemQuantity(cartItemId) {
    //     const quantityData = JSON.stringify({
    //         fields: {
    //             quantity: cartItem.quantity + 1,
    //           },
    //     })
    //     fetchCartData();
    //     updateItemQuantity(cartItemId, quantityData);
    //   }
   
    //   async function decrementItemQuantity(cartItemId) {
    //     const quantityData = JSON.stringify({
    //         fields: {
    //             quantity: cartItem.quantity - 1,
    //           },
    //     })
    //     fetchCartData();
    //     updateItemQuantity(cartItemId, quantityData);
    //   }

  return (
    <div className='cartItemsContainer'>
      <h4>{cartItem.title}</h4>
      <h4>{cartItem.price}</h4>
      <button onClick={() => decrementItemQuantity(cartItem)}>-</button>
      <h5> {cartItem.quantity}</h5>
      <button onClick={() => incrementItemQuantity(cartItem)}>+</button>
      <h5 onClick={() => deleteCartItem(cartItem.id)}>Delete</h5>
    </div>
  )
}

export default CartItem