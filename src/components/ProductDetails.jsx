import React, { useContext } from 'react'
import { DataContext } from '../App'

function ProductDetails() {

    const dataContext = useContext(DataContext);

    console.log(dataContext)

  return (
    <div>
      {dataContext.map(data => {
        return (
            data.title
        )
      })}
    </div>
  )
}

export default ProductDetails
