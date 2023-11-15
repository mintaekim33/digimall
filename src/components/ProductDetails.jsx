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
            //need to filter only the matching product data ! but how
        )
      })}
    </div>
  )
}

export default ProductDetails
