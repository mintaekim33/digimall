import { Paper } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../App'

function ProductCard({ product,addButtonHandler }) {

    const [selectedProduct, setSelectedProduct] = useState(null);

    const { constructCartData,addToCart } = useContext(DataContext);
    // console.log(dataContext)

    function addButtonHandler() {
        console.log("pdt from prop passed down: ", product)
        // setSelectedProduct(product); // choose selected product
        // console.log("selectedProduct: ", selectedProduct);
    //    constructCartData(product); // create request body in a required format
    const cartData = {
        fields: {
          Id: product.id,
          Title: product.title,
          Quantity: 1,
          Image: product.images[0]
        }
      }
        addToCart(cartData); // send post request
    }
    
  return (
    <Paper>
        <Link to={"/products/" + product.id}>
            <img src={product.images[0]} />
            <h5>{product.title}</h5>
        </Link>
        <h5>${product.price}</h5>
        <button onClick={addButtonHandler}>Add to cart</button>
    </Paper>
  )
}

export default ProductCard
