import { Paper } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Paper>
        <Link to={"/products/" + product.id}>
            <img src={product.images[1]} />
            <h5>{product.title}</h5>
        </Link>
        <h5>${product.price}</h5>
    </Paper>
  )
}

export default ProductCard
