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
console.log('DataContent', DataContext);

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => setProducts(data.products));
    // storeData(products);
  },[]);

  console.log(products)

  //use airtable for CRUD(?)
  const TOKEN = 'pat8pPTkg9mFBwoGR.c373b443fc47d4a8fb0a9ac5769a153bb78f9f4287b210b8852f6e7557fe5573';
  const BASE_URL = 'https://api.airtable.com/v0/app2XUWkEqc6qfyPb';

  async function storeData(products) {
    const response = await fetch(`${BASE_URL}/productsTable`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`, 
      },
      body: JSON.stringify(products)
    })
    console.log(products)
    const json = await response.json();
    console.log(json)
  }
  // storeData(products);




  return (
    <DataContext.Provider value={products}>
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
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </main>
    </DataContext.Provider>
  )
}

export default App
