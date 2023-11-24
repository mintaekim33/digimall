import React, { useContext } from "react";
import { DataContext } from "../App";
import { Link, useParams } from "react-router-dom";
import "../styles/ProductDetails.css";

function ProductDetails() {
  const { productId } = useParams();

  const { products } = useContext(DataContext);
  const product = products.find(
    (product) => product.id === parseInt(productId)
  );

  return (
    <div className="productDetailsBody">
      {product && (
        <>
          <div className="productDetailsCard">
            <div className="productDetailsCard-title">
              <img src={product.thumbnail} width={400} height={250} />
              <h2>{product.title}</h2>
            </div>
            <div className="productDetailsCard-desc">
              <h2>{product.brand}</h2>
              <h2>{product.category}</h2>
              <h2>{product.description}</h2>
              <h2>${product.price}</h2>
              <h2>{product.rating} stars received</h2>
              <h2>{product.stock} Left!</h2>
            </div>
          </div>
          <Link to="/products">Back</Link>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
