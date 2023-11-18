import React, { useEffect } from 'react'
import CartItem from './CartItem'

function Cart({ cartItems, setCartItems }) {

const TOKEN = 'pat8pPTkg9mFBwoGR.c373b443fc47d4a8fb0a9ac5769a153bb78f9f4287b210b8852f6e7557fe5573';
const BASE_URL = 'https://api.airtable.com/v0/app2XUWkEqc6qfyPb';

    useEffect(() => {
        // Fetch cart data from airtable
        async function fetchCartItems() {
          const response = await fetch(`${BASE_URL}/cart`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${TOKEN}`,
            },
          });
          const jsonData = await response.json();
        //   console.log(response)
        //   console.log(jsonData)
    
          const cartData = jsonData.records.map((data) => ({
            ...data.fields,
            id: data.id,
          }));
          setCartItems(cartData);
        //   console.log(cartItems)
        }
        fetchCartItems();
      }, []);

  return (
    <div>
      {cartItems.map(cartItem => {
        return <CartItem key={cartItem.id} cartItem={cartItem} />
      })}
    </div>
  )
}

export default Cart
