import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Products from './components/Products';
import About from './components/About';

function App() {

  return (
    <>
    <Link to="/">Home</Link>
    <Link to="/products">Products</Link>
    <Link to="/about">About</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
