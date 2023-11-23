import { useEffect, useState, createContext } from "react";
import "./App.css";
// import './styles/App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import Signup from "./components/Signup";
import Identify from "./components/Identify";

export const DataContext = createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // const [itemQuantity, setItemQuantity] = useState(new Array(30).fill(0));  // retrieve from backend
  // function incrementItemQuantity(cartItemId) {
  //   // setItemQuantity(itemQuantity[cartItemId - 1] + 1);
  //   const updatedQuantities = [...itemQuantity];
  //   updatedQuantities[cartItemId - 1] += 1;
  //   setItemQuantity(updatedQuantities);
  // }
  // console.log(itemQuantity)

  // console.log(cartItems)

  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    fetchCartData();
  },[])
  async function fetchCartData() {
    const response = await fetch(`${BASE_URL}/cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    const jsonData = await response.json();
    const fetchedCartData = jsonData.records.map((data) => ({
      ...data.fields,
      // id: data.id,
    }));
    setCartData(fetchedCartData);
    // console.log("fetching cart data from airtable...");
    // console.log(cartData);
    // console.log(jsonData.records)
  }
  
  // console.log(cartData)

  // function incrementItemQuantity(cartItemId) {
  //   cartData.map(item => {
  //     if (item.id === cartItemId) item.quantity++;
  //   })
  // }

  // fetch dummy products
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://dummyjson.com/products");
      const jsonData = await response.json();
      setProducts(jsonData.products);
    }
    fetchData();
  }, []);

  //use airtable for CRUD
  const TOKEN =
    "pat8pPTkg9mFBwoGR.c373b443fc47d4a8fb0a9ac5769a153bb78f9f4287b210b8852f6e7557fe5573";
  const BASE_URL = "https://api.airtable.com/v0/app2XUWkEqc6qfyPb";

  async function addToCart(itemData) {
    const response = await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(itemData),
    })
    const json = await response.json();
    fetchCartData();
    // const newCartData = [...cartData, itemData]; // unique key prop warning?
    // setCartData(newCartData);

    // const selectedProduct = products.find(item => item.id === itemId)
    // console.log(products)
    // console.log(itemId)
    // selectedProduct.quantity = 1;
  }

  async function incrementItemQuantity(cartItem) {
    console.log(cartItem);
    const quantityData = JSON.stringify({
      fields: {
        quantity: cartItem.quantity + 1,
      },
    });
    await updateItemQuantity(cartItem.id, quantityData);
    // updateItemQuantity should be asynchronous
    fetchCartData();
  }

  async function decrementItemQuantity(cartItem) {
    const quantityData = JSON.stringify({
          fields: {
        quantity: cartItem.quantity - 1,
      },
    });
    await updateItemQuantity(cartItem.id, quantityData);
    fetchCartData();
  }
 
  async function updateItemQuantity(cartItemId, quantityData) {
    const response = await fetch(
      `${BASE_URL}/cart?filterByFormula=id=${cartItemId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    const records = await response.json();
    // console.log(records.records);
      // if record exists, update it
      const existingRecordId = records.records[0].id;
      // console.log(existingRecordId);
      const res = await fetch(`${BASE_URL}/cart/${existingRecordId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: quantityData,
      });
      // update cart item with the returned item 

      // const selectedProduct = cartData.find(item => item.id === cartItemId)
      // selectedProduct.quantity++; // need to increment on the frontend too (seems like this will increment cart data state variable?)
      console.log("Record updated:", existingRecordId);
  }

  // function renderAddedCartItems(item) {
  //   const newCartItems = [...cartItems, item];
  //   if (cartItems.includes(item)) {
  //     return cartItems;
  //   }
  //   setCartItems(newCartItems);
  // }

  async function deleteCartItem(cartItemId) {

    const res = await fetch(
      `${BASE_URL}/cart?filterByFormula=id=${cartItemId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    const records = await res.json();
    console.log(records.records);

    const recordId = records.records[0].id;

    console.log(cartItemId) // this is number; should get record id 
    const response = await fetch(`${BASE_URL}/cart/${recordId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    console.log(cartData)
    setCartData((prevItems) =>
    prevItems.filter((item) => item.id !== cartItemId)
    );
  }
  console.log(cartData)

  return (
    <DataContext.Provider
      value={{
        products,
        cartData,
        cartItems,
        // upsertToCart,
        // renderAddedCartItems,
        deleteCartItem,
        // itemQuantity,
        // incrementItemQuantity,
        fetchCartData,
        addToCart,
        // updateItemQuantity
        incrementItemQuantity,
        decrementItemQuantity
      }}
    >
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={<Products products={products} setProducts={setProducts} />}
          />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/identify" element={<Identify />} />
          <Route
            path="/cart"
            element={<Cart cartData={cartData} cartItems={cartItems} setCartItems={setCartItems} fetchCartData={fetchCartData} />}
          />
        </Routes>
      </main>
    </DataContext.Provider>
  );
}

export default App;
