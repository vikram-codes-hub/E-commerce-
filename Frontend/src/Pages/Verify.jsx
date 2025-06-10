import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { toast } from "react-toastify";
import { ShopContext } from "../Context/Shopcontext";

const Verify = () => {
   
  const location = useLocation();
  const {navigate,token,setcartItems,backendurl } =useContext(ShopContext)
  const [status, setStatus] = useState("Verifying payment...");
  const [searchparams,setsearchparams]=useSearchParams('')

  
   
    const orderId = searchparams.get("orderId");
    const success = searchparams.get("success");

    const verifyPayment=async()=>{
        try {
            if(!token){
                return null
            }

           const res = await axios.post(
  backendurl + '/api/order/verifyStripe',
  { orderId },
  { headers: { token } }
);
            console.log(res.data);
            if(res.data.success){
                setcartItems({})
                navigate('/orders')
            }else{
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

   useEffect(()=>{
    verifyPayment()
   },[token])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-4">Order Verification</h2>
      <p>{status}</p>
    </div>
  );
};

export default Verify;