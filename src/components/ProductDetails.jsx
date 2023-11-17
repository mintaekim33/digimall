import React, { useContext } from 'react'
import { DataContext } from '../App'

function ProductDetails() {

    const { products } = useContext(DataContext);

    // console.log(dataContext)

  return (
    <div>
      {products.map(data => {
        return (
            data.title
            //need to filter only the matching product data
        )
      })}
    </div>
  )
}

export default ProductDetails
