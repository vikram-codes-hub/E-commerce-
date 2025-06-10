import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Add from './Pages/Add'
import List from './Pages/List'
import Orders from './Pages/Orders'
import Login from './Pages/Login'
import { ToastContainer} from 'react-toastify';


export const backendUrl=import.meta.env.VITE_BACKEND_URL
export const currency='$'

const App = () => {
  const [token,settoken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])
  return (
    
 
     <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token==="" ?<Login settoken={settoken}/>:  <>
       <Navbar settoken={settoken}/>
      
       <div className='flex w-full'>
        <Sidebar/>
        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
          <Routes>
            <Route path='/add'  element={<Add token={token} />}/>
            <Route path='/list'  element={<List token={token} />}/>
            <Route path='/orders' element={<Orders token={token}/>}/>
          </Routes>
        </div>
       </div>
     
       </>}
    
   
 
    </div>
  )
}

export default App
