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

export const DataContext = createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // const [itemQuantity, setItemQuantity] = useState(1);
  // function incrementItemQuantity(cartItemId) {
  //     setItemQuantity(prevQty => {
  //       return prevQty + 1;
  //     });
  // }

  // const [itemQuantity, setItemQuantity] = useState(new Array(30).fill(0));  // retrieve from backend
  // function incrementItemQuantity(cartItemId) {
  //   // setItemQuantity(itemQuantity[cartItemId - 1] + 1);
  //   const updatedQuantities = [...itemQuantity];
  //   updatedQuantities[cartItemId - 1] += 1;
  //   setItemQuantity(updatedQuantities);
  // }
  // console.log(itemQuantity)

  console.log(cartItems)

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
      // id: data.id, // will turn id from number to gibberish but need this for delete to work
    }));
    setCartData(fetchedCartData)
    console.log("fetching cart data from airtable...")
    console.log(cartData)
    // console.log(jsonData.records)
  }
  
  // console.log(cartData)

  // function incrementItemQuantity(cartItemId) {
  //   cartData.map(item => {
  //     if (item.id === cartItemId) item.quantity++;
  //   })
  // }


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

  async function incrementItemQuantity(cartItemId, quantityData) {
    console.log("first")
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
    console.log(records.records);
      // if record exists, update it
      const existingRecordId = records.records[0].id;
      console.log(existingRecordId);
      await fetch(`${BASE_URL}/cart/${existingRecordId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quantityData),
      });
      // console.log(cartItemId)
      // console.log(cartData)
      const selectedProduct = cartData.find(item => item.id === cartItemId)
      // console.log(selectedProduct.quantity)
      selectedProduct.quantity++; // need to increment on the frontend too
      // console.log(selectedProduct.quantity)

      // incrementItemQuantity(cartItemId);
      console.log("Record updated:", existingRecordId);
  }




  async function upsertToCart(cartItemId, itemData, quantityData) {
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

    if (records && records.records.length > 0) {
      // if record exists, update it
      const existingRecordId = records.records[0].id;
      // console.log(existingRecordId);
      await fetch(`${BASE_URL}/cart/${existingRecordId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quantityData),
      });
      // console.log(cartItemId)
      // console.log(cartData)
      const selectedProduct = cartData.find(item => item.id === cartItemId)
      // console.log(selectedProduct.quantity)
      selectedProduct.quantity++; // need to increment on the frontend too
      // console.log(selectedProduct.quantity)

      // incrementItemQuantity(cartItemId);
      console.log("Record updated:", existingRecordId);
    } else {
      // item is not already in the cart
      await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });
      console.log("New record inserted for ID: ", cartItemId);
    }
  }

  // function renderAddedCartItems(item) {
  //   const newCartItems = [...cartItems, item];
  //   if (cartItems.includes(item)) {
  //     return cartItems;
  //   }
  //   setCartItems(newCartItems);
  // }

  async function deleteCartItem(cartItemId) {
    console.log(cartItemId)
    const response = await fetch(`${BASE_URL}/cart/${cartItemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== cartItemId)
    );
  }

  return (
    <DataContext.Provider
      value={{
        products,
        cartData,
        cartItems,
        upsertToCart,
        // renderAddedCartItems,
        deleteCartItem,
        // itemQuantity,
        incrementItemQuantity,
        fetchCartData
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
