import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar=()=>{
    return (
        <div className='w-[18%] min-h-screen shadow-xl'>
            <div className='flex flex-col gap-4 pt-6 pl-[20%]' >
                <NavLink to='/add' className='flex items-center gap-3 border p-2 px-4 border-gray-300 border-r-0 rounded-l'>
                <img className='w-5 h-5' src={assets.add_icon} alt="" />
                <p className='hidden md:block'>Add Items</p></NavLink>


                <NavLink to='/list' className='flex items-center gap-3 border p-2 px-4 border-gray-300 border-r-0 rounded-l'>
                <img className='w-5 h-5' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>List Items</p></NavLink>


                <NavLink to='/orders' className='flex items-center gap-3 border p-2 px-4 border-gray-300 border-r-0 rounded-l'>
                <img className='w-5 h-5' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>Orders</p></NavLink>

            </div>
        </div>
    )
}
export default Sidebar
