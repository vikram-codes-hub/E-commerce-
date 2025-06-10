import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const Searchbar = () => {
    const { search,setsearch,showSearch,setshowSearch}=useContext(ShopContext)
    const [visible,setVisible]=useState(false)

    const location=useLocation()

    useEffect(()=>{
      if(location.pathname.includes("/collection")){
        setVisible(true)
      }else{
        setVisible(false)
      }
    },[location])
  return showSearch && visible? (
    <div className='  border-t  border-b  bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5  py-2 my-5 rounded-full w-3/4 sm:w-1/2 mr-3'>
      <input value={search} onChange={(e)=>setsearch(e.target.value)} type="text" placeholder='Search' className='flex-1 outline-none  bg-inherit text-sm' />
      <img className='w-4' src={assets.search_icon} alt="" />
      </div>
      <img onClick={()=>{setshowSearch(false)
      setsearch("")
      }} className='inline w-3 cursor-pointer ' src={assets.cross_icon} alt="" />
    </div>
  ):null
}

export default Searchbar
