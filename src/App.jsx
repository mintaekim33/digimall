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
  },[]);

  // console.log(products)

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
