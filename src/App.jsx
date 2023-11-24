import { useEffect, useState, createContext } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import Signup from "./components/Signup";
import Identify from "./components/Identify";
import ReactSwitch from "react-switch";

export const DataContext = createContext();
export const ThemeContext = createContext(null);

function App() {
  const [products, setProducts] = useState([]);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    fetchCartData();
  }, []);

  async function fetchCartData() {
    const response = await fetch(`${BASE_URL}/cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const jsonData = await response.json();
    const fetchedCartData = jsonData.records.map((data) => ({
      ...data.fields,
      // id: data.id,
    }));
    setCartData(fetchedCartData);
  }

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
    });
    const json = await response.json();
    fetchCartData();
  }

  async function incrementItemQuantity(cartItem) {
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
    if (cartItem.quantity === 1) return;
    const quantityData = JSON.stringify({
      fields: {
        quantity: cartItem.quantity - 1,
      },
    });
    await updateItemQuantity(cartItem.id, quantityData); // backend
    fetchCartData(); // frontend
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
    // if record exists, update it
    const existingRecordId = records.records[0].id;
    const res = await fetch(`${BASE_URL}/cart/${existingRecordId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: quantityData,
    });
    // update cart item with the returned item (res will return the updated item so insert that to the cart data to be rendered)
    // console.log("Record updated:", existingRecordId);
  }

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
    const recordId = records.records[0].id;

    // console.log(cartItemId); // this is number; should get record id
    const response = await fetch(`${BASE_URL}/cart/${recordId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    setCartData((prevItems) =>
      prevItems.filter((item) => item.id !== cartItemId)
    );
  }

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <DataContext.Provider
          value={{
            products,
            cartData,
            deleteCartItem,
            fetchCartData,
            addToCart,
            incrementItemQuantity,
            decrementItemQuantity,
          }}
        >
          <Navbar />
          <div className="switch">
            <label>{theme === "light" ? "Light" : "Dark"}</label>
            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
          </div>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/products"
                element={
                  <Products products={products} setProducts={setProducts} />
                }
              />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/identify" element={<Identify />} />
              <Route
                path="/cart"
                element={
                  <Cart cartData={cartData} fetchCartData={fetchCartData} />
                }
              />
            </Routes>
          </main>
        </DataContext.Provider>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
