import React from "react";
import ProductCard from "./ProductCard";
import '../styles/Products.css';

function Products({ products, addButtonHandler }) {
  return (
    <div className="productContainer">
      
      {products.map((product) => {
        return <ProductCard key={product.id} product={product}  />;
      })}
    </div>
  );
}

export default Products;
