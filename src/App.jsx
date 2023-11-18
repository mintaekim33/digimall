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
// console.log('DataContent', DataContext);

function App() {

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  // const [selectedProduct, setSelectedProduct] = useState(null);
  // const product = products.find(x => x === selectedProduct);

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

  // console.log(products)

  //use airtable for CRUD
  const TOKEN = 'pat8pPTkg9mFBwoGR.c373b443fc47d4a8fb0a9ac5769a153bb78f9f4287b210b8852f6e7557fe5573';
  const BASE_URL = 'https://api.airtable.com/v0/app2XUWkEqc6qfyPb';

  // function constructCartData(selectedProduct) {
  //   const cartData = {
  //     fields: {
  //       Id: selectedProduct.id,
  //       Title: selectedProduct.title,
  //       Quantity: 1,
  //       Image: selectedProduct.images[0]
  //     }
  //   }
  //   return cartData;
  // }

  // const cartData = {
  //   fields: {
  //     // Name: products.map(product => product.title)
  //     Name: 'hdsdf'
  //   }
  // }
// console.log(products)

  // async function addToCart(cartData) {
  //   const response = await fetch(`${BASE_URL}/cart`, {
  //     method: "POST",
  //     // method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${TOKEN}`, 
  //     },
  //     body: JSON.stringify(cartData),
  //     // performUpsert: true
  //   })
  //   const json = await response.json();
  // }

  const quantityData = {
    fields: {
      quantity: 2
    }
  }

  async function upsertToCart(cartItemId, cartData) {
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
      const patchResponse = await fetch(`${BASE_URL}/cart/${existingRecordId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quantityData)
      });
      console.log(patchResponse)
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

  // addToCart();

  function renderAddedCartItems(item) {
    const newCartItems = [...cartItems, item];
    if (cartItems.includes(item)) {
      return cartItems;
    }
    setCartItems(newCartItems);
  }


  // pass this to productCard to prevent airtable from having duplicates
  async function updateCartItemQty(cartData) {
    // refer to update field docs
    const response = await fetch(`${BASE_URL}/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`, 
      },
      body: JSON.stringify(cartData)
    })
    const json = await response.json();

  }


  // console.log(selectedProduct);


  return (
    <DataContext.Provider value={{products, cartItems, upsertToCart, renderAddedCartItems}}>
    {/* <nav className='navbar'> 
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/about">About</Link>
      <Link to="/login">Login</Link>
      <Link to="/cart">Cart</Link>
    </nav> */}
    <Navbar />

    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products products={products} />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
      </Routes>
    </main>
    </DataContext.Provider>
  )
}

export default App
