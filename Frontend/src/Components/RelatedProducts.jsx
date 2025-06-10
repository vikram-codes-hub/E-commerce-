import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'
import Productitem from './Productitem'

const RelatedProducts = ({category,subcategory}) => {
    const {products}=useContext(ShopContext)
    const [related,setRelated]=useState([])
useEffect(()=>{
    let productscopy=products.slice()
    productscopy=productscopy.filter((item)=>category===item.category)
productscopy = productscopy.filter((item) => subcategory === item.subcategory)
    setRelated(productscopy.slice(0,5))
},[products])

   return(
   <div className='my-24'>
    <div className='text-center text-3xl py-3'>
        <Title title1={"RELATED"} title2={"PRODUCTS"}/>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-3'>
            {
                related.map((item,index)=>(
                    <Productitem key={index} price={item.price} id={item._id} name={item.name} image={item.image}/>
                ))
            }

        </div>
    </div>
      
    </div>
  )
}

export default RelatedProducts
