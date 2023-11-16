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
  const [selectedProductId, setSelectedProductId] = useState(null);
  const product = products.find(x => x.id === selectedProductId);

  function addButtonHandler() {
    setSelectedProductId(product.id);
    constructCartData();
    addToCart();
}

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://dummyjson.com/products');
      const jsonData = await response.json();
      setProducts(jsonData.products);
    }
    fetchData();
  },[]);

  console.log(products)

  // search view and store view diff?

  //use airtable for CRUD
  const TOKEN = 'pat8pPTkg9mFBwoGR.c373b443fc47d4a8fb0a9ac5769a153bb78f9f4287b210b8852f6e7557fe5573';
  const BASE_URL = 'https://api.airtable.com/v0/app2XUWkEqc6qfyPb';

  function constructCartData(selectedProductId) {
    
  }

  const cartData = {
    fields: {
      // Name: products.map(product => product.title)
      Name: 'hdsdf'
    }
  }

  async function addToCart() {
    const response = await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`, 
      },
      body: JSON.stringify(cartData)
    })
    const json = await response.json();
  }
  addToCart();



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
