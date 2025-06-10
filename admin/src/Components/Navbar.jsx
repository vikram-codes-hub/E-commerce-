import React from 'react'
import { assets } from '../assets/assets'
const Navbar = ({settoken}) => {
  return (
    <div className='flex justify-between items-center shadow-sm py-2 px-[4%]'>
      <img className='w-[max(10%,80px)]' src={assets.logo}/>
      <button onClick={()=>settoken('')} className='bg-gray-600 text-white  px-5 py-2 sm:px-7 sm:py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar
