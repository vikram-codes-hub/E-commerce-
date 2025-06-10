import React, { useContext } from 'react'
import { Link, Links, NavLink } from 'react-router-dom'
import {assets} from "../assets/assets"
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = React.useState(false);
  const {setshowSearch,getcount,navigate,token,settoken,setcartItems}=useContext(ShopContext)
  
  const logout=()=>{
    localStorage.removeItem('token')
    setcartItems({})
    settoken('')
    navigate('/login')
  }
    
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <img onClick={()=>token?null:navigate('/')} src={assets.logo} className='w-36' alt="" />
       
           <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className="flex flex-col items-center gap-1">
            <p>Home</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

    </ul>

    <div className='flex items-center gap-6'>
        <img onClick={()=>setshowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
        <div className='group relative'>
  <Link to={'/login'}><img src={assets.profile_icon} className='w-5 cursor-pointer' alt=""/></Link>

  {token&&<div className='hidden group-hover:block absolute right-0 pt-4 '>
    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-blue-500 rounded'>
      <p className=' cursor-pointer hover:text-black'>MY PROFILE</p>
      <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>ORDERS</p>
      <p onClick={logout} className='cursor-pointer hover:text-black'>LOG OUT</p>
    </div>
  </div>}
</div>
<Link to='/cart' className='relative'>
<img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
<p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getcount()}</p>
</Link>
<img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />


    </div>

    {/* {Sidebar menu for small screen} */}
    <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible?'w-full':'w-0'}`}>
<div className='flex flex-col text-gray-600'>
  <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
    <img className='h-4 rotate-180 ' src={assets.dropdown_icon} alt="" />
    <p>Back</p>
  </div>
  <div className='flex gap-6 flex-col'>
    <NavLink onClick={()=>setVisible(false)} className='p-y  pl-6' to='/'>Home</NavLink>
  <NavLink onClick={()=>setVisible(false)} className='p-y  pl-6' to='/collection'>COLLECTION</NavLink>
  <NavLink onClick={()=>setVisible(false)} className='p-y  pl-6' to='/about'>ABOUT</NavLink>
  <NavLink onClick={()=>setVisible(false)} className='p-y  pl-6' to='/contact'>CONTACT</NavLink>

  </div>
</div>

    </div>
    </div>
 
  )
}

export default Navbar
