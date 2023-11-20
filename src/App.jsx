import { useEffect, useState, createContext } from 'react'
import './App.css'
// import './styles/App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Products from './components/Products';
import About from './components/About';
import Cart from './components/Cart';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ProductDetails from './components/ProductDetails';

export const DataContext = createContext();

function App() {

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  // const [isInCart, setIsInCart] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);

    function incrementItemQuantity() {
      // console.log('first')
        setItemQuantity(prevQty => {
          return prevQty + 1;
        });
    }

//   function addButtonHandler() {
//     console.log(product)
//     // setSelectedProduct(product); // choose selected product
//     // console.log(selectedProduct);
//     // constructCartData(); // create request body in a required format
//     // addToCart(); // send post request
// }

  // fetch dummy products
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://dummyjson.com/products');
      const jsonData = await response.json();
      setProducts(jsonData.products);
    }
    fetchData();
  },[]);

  //use airtable for CRUD
  const TOKEN = 'pat8pPTkg9mFBwoGR.c373b443fc47d4a8fb0a9ac5769a153bb78f9f4287b210b8852f6e7557fe5573';
  const BASE_URL = 'https://api.airtable.com/v0/app2XUWkEqc6qfyPb';

  // async function addToCart(cartData) {
  //   const response = await fetch(`${BASE_URL}/cart`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${TOKEN}`, 
  //     },
  //     body: JSON.stringify(cartData),
  //   })
  //   const json = await response.json();
  // }

  async function upsertToCart(cartItemId, cartData, quantityData) {
    const response = await fetch(`${BASE_URL}/cart?filterByFormula=id=${cartItemId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      // performUpsert: true
    })
    console.log(response)
    const records = await response.json();
    console.log(records.records)
    if (records && records.records.length > 0) {
      // if record exists, update it
      const existingRecordId = records.records[0].id;
      console.log(existingRecordId)
      await fetch(`${BASE_URL}/cart/${existingRecordId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quantityData)
      });
      incrementItemQuantity();
      // setIsInCart(true)
      console.log('Record updated:', existingRecordId);
    } else {
      await fetch(`${BASE_URL}/cart`, {
        method: 'POST',
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartData)
      });
      console.log('New record inserted for ID: ', cartItemId)
    }
  }

  function renderAddedCartItems(item) {
    const newCartItems = [...cartItems, item];
    if (cartItems.includes(item)) {
      return cartItems;
    }
    setCartItems(newCartItems);
  }

  async function deleteCartItem(cartItemId) {
    const response = await fetch(`${BASE_URL}/cart/${cartItemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
  }

  return (
    <DataContext.Provider value={{products, cartItems, upsertToCart, renderAddedCartItems, deleteCartItem, itemQuantity, incrementItemQuantity}}>
    
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products products={products} setProducts={setProducts} />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
      </Routes>
    </main>
    </DataContext.Provider>
  )
}

export default App
