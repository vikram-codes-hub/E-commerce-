import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'

import Productitem from './Productitem'

const LatestCollection = () => {
    const {products}=useContext(ShopContext)
    const [lastestProducts,setlatestProducts]=useState([])

    useEffect(()=>{
        setlatestProducts(products.slice(0,10))
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>

      <Title title1={"LATEST"} title2={"COLLECTIONS"}/>
      <p className='text-xl w-3/4 m-auto sm:text-sm md:text-base text-gray-600'>Step into the season with our latest collection — fresh styles, bold looks, and unbeatable comfort just for you.</p>
        </div>

        {/*rendering products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6'>
                {lastestProducts && lastestProducts.map((items, index) => (
  <Productitem key={index} id={items._id} image={items.image} name={items.name} price={items.price}/>
))}
            </div>
    </div>
  )
}

export default LatestCollection
