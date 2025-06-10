import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentstate,setcurrentstate]=useState("Sign up")
  const {token,settoken,navigate,backendurl}=useContext(ShopContext)
  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const onsubmithandeller=async(e)=>{
    e.preventDefault()
    try {
      if(currentstate==='Sign up'){
        const response=await axios.post(backendurl + '/api/user/register' ,{name,email,password})
        console.log(response)
       if(response.data.success){
        settoken(response.data.token)

        localStorage.setItem('token',response.data.token)
        toast.success("Successfully account created")
       }else{
        toast.error(response.data.message)
       }
      }else{
        const response=await axios.post(backendurl + '/api/user/login' , {email,password})
        console.log(response)
       if(response.data.success){
        settoken(response.data.token)
        localStorage.setItem('token',response.data.token)
         toast.success("Successfully loggedin")
       }else{
        toast.error(response.data.message)
       }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form onSubmit={onsubmithandeller} className="flex flex-col items-center w-[95%] sm:max-w-120 m-auto mt-20 gap-6 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="inline-flex items-center gap-3 mt-6 mb-4">
        <p className=" prata-regular text-3xl font-semibold ">{currentstate}</p>
        <hr className="border-none h-[2px] w-10 bg-gray-800 rounded" />
      </div>
      {currentstate==="Sign up"?<input onChange={(e)=>setname(e.target.value)} value={name} className='border border-gray-800 w-full py-2 px-3' type="text" placeholder='Name' />:""}
      <input onChange={(e)=>setemail(e.target.value)} value={email} className='border border-gray-800 py-2 w-full px-3' type="email" placeholder='Email' />
      <input onChange={(e)=>setpassword(e.target.value)} value={password} className='border border-gray-800 py-2 w-full px-3' type="Password" placeholder='Password' required />
      <div className='flex  w-full justify-between'>
        <p className='cursor-pointer'>Forget your password</p>
        {
          currentstate==="Login"?
          <p onClick={()=>setcurrentstate("Sign up")}  className='cursor-pointer'>Create Account</p>
          :<p onClick={()=>setcurrentstate("Login")}  className='cursor-pointer'>Login here</p>
        }
      </div>
      <button className='border w-20 rounded bg-black text-white px-2 py-2 mt-4'>{currentstate==="Sign up"?"Sign In":"Login"}</button>
      
    </form>
  )
}

export default Login
