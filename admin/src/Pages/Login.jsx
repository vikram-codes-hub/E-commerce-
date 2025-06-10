import React, { useState } from "react";
import axios from 'axios'
import { backendUrl } from "../App";
 import { toast } from 'react-toastify';

const Login = ({settoken}) => {
    const [email,setemail]=useState('')
    const [password, setPassword]=useState('')
    const onsubmithandeler=async(e)=>{
        try {
            e.preventDefault()
            const response=await axios.post(backendUrl + '/api/user/admin',{ email , password })
           if(response.data.success){
            settoken(response.data.token)
           }else{
            toast.error(response.data.message)
           }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Admin Panel
        </h1>

        <form onSubmit={onsubmithandeler} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
            onChange={(e)=>setemail(e.target.value)}
              className="border border-gray-300 text-sm p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              value={email}
              id="email"
              name="email"
              placeholder="your@email.com"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="pass">
              Password
            </label>
            <input  onChange={(e)=>setPassword(e.target.value)}
              className="border border-gray-300 text-sm p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              value={password}
              id="pass"
              name="pass"
              placeholder="Enter Your Password"
            />
          </div>

          <button 
            className="bg-black hover:scale-105 text-white py-2 rounded-xl transition duration-300 font-semibold"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
