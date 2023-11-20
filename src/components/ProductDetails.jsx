import React, { useContext, useEffect } from "react";
import { DataContext } from "../App";
import { Link, useParams } from "react-router-dom";

function ProductDetails() {
  const { productId } = useParams();

  const { products } = useContext(DataContext);
  const product = products.find(
    (product) => product.id === parseInt(productId)
  );

  // useEffect(() => {
  //     const productData = products.filter(item => {
  //         return item.id === props.match.params.id;
  //     });
  //     console.log(props)
  // },[])

  return (
    <>
      {product && ( // why without this got error when refreshing the page? is it due to the asynchronousity so this part is waiting for the fetch to get the data to display first
        <div>
          <h2>{product.brand}</h2>
          <h2>{product.category}</h2>
          <h2>{product.title}</h2>
          <h2>{product.description}</h2>
          <h2>${product.price}</h2>
          <h2>{product.rating} stars received</h2>
          <h2>{product.stock} Left!</h2>
          <Link to="/products">Back</Link>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
