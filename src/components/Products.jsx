import React, { useState } from "react";
import ProductCard from "./ProductCard";
import '../styles/Products.css';

function Products({ products, addButtonHandler }) {
    // declare quantity for products here so that each product card has individual quantity
    const [quantity, setQuantity] = useState(1);
  return (
    <div className="productContainer">
      
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} quantity={quantity} />;
      })}
    </div>
  );
}

export default Products;
