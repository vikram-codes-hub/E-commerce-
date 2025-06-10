import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
   <div>
     <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      <div>
        <img src={assets.logo} className='mb-5 w-32' alt="" />
        <p className='w-full md:w-2/3 text-gray-600'>Forever is dedicated to excellence — offering trusted products, fast delivery, and reliable customer service to make your experience smooth and enjoyable.</p>
      </div>

      <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <Link to="/"><li>HOME</li></Link>
            <Link to="/aboutus"><li>ABOUT US</li></Link>
            <Link to="delivery"><li>DELIVERY</li></Link>
            <Link to="/privacypolicy"><li>PRIVACY POLICY</li></Link>
        </ul>
      </div>

      <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
<li>+1-212-456-7890</li>
<li>contact@foreveryone.com</li>
        </ul>
      </div>
    </div>

    <div>
        <hr />
        <p className=' py-5 text-sm text-center'>Copyright 2024@ forever.com -ALL RIGHTS RESERVERD</p>
      </div>
   </div>
  )
}

export default Footer
