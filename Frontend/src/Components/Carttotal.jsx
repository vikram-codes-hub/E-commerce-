import React, { useContext } from 'react'
import { ShopContext } from '../Context/Shopcontext'
import Title from './Title'

const Carttotal = () => {
    const {getcartAmount,currency,deliveryfees,}=useContext(ShopContext)
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title title1={"CART"} title2={"TOTAL"}/>
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{currency}{getcartAmount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Shipping Fees</p>
            <p>{currency}{deliveryfees}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Total</p>
            <p>{currency}{getcartAmount()===0?0:getcartAmount()+deliveryfees}.00</p>
        </div>
           
      </div>
    </div>
  )
}

export default Carttotal
