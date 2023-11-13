import React from 'react'
import ProductCard from './ProductCard'

function Products({ products }) {

  return (
    <div>
      Products
      {products.map(product => {
        return <ProductCard key={product.id} product={product} />
      })}
    </div>
  )
}

export default Products
