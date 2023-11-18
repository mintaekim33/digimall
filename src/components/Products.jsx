import React, { useState } from "react";
import ProductCard from "./ProductCard";
import '../styles/Products.css';

function Products({ products, addButtonHandler }) {
    // declare quantity for products here so that each product card has individual quantity
    const [itemQuantity, setItemQuantity] = useState(1);
    function incrementItemQuantity() {
        setItemQuantity(itemQuantity + 1);
    }
  return (
    <div className="productContainer">
      
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} itemQuantity={itemQuantity} incrementItemQuantity={incrementItemQuantity} />;
      })}
    </div>
  );
}

export default Products;
