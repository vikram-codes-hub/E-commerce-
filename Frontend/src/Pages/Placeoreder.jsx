import React, { useContext, useState } from 'react'
import Title from '../Components/Title'
import Carttotal from '../Components/Carttotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../Context/Shopcontext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Placeoreder = () => {
  const [method,setmethod]=useState('')
  const {navigate,cartItems,setcartItems,backendurl,token,getcartAmount , products,deliveryfees,}=useContext(ShopContext)

  const [formdata,setformdata]=useState({
    firstName:'',
    lastname:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onchangehandeler=(e)=>{
    const name=e.target.name
    const value=e.target.value
    setformdata(data=>({...data,[name]:value}))
  }

  const onsubmithandeler=async(e)=>{
    
    e.preventDefault()
    try {
      let orderitems=[]
      for(const items in cartItems){
        for (const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const iteminfo=structuredClone(products.find(product=>product._id===items))
            if(iteminfo){
              iteminfo.size=item
              iteminfo.quantity=cartItems[items][item]
              orderitems.push(iteminfo)
            }
          }
        }
      }
       const userId = localStorage.getItem("userId");
      
      let orderData={
       userId,
        address:formdata,
        items:orderitems,
        amount:getcartAmount()+deliveryfees
      }
     

      switch (method){
        //api for cod
        case 'cod':{
         

         const res = await axios.post(backendurl + '/api/order/place', orderData, { headers: { token } })
         
          if(res.data.success){
            setcartItems({})
            navigate('/orders')
          }else{
            toast.error(res.data.message)
          }
          break
        }

        case 'stripe':{
          const res = await axios.post(backendurl + '/api/order/place-stripe', orderData, { headers: { token } })
         
         console.log(res.data)
          if(res.data.success){
            const {session_url}=res.data
            window.location.replace(session_url)
            
          }else{
            toast.error(res.data.message)
          }
          break
        }
        case 'razor-pay':{
          const res = await axios.post(backendurl + '/api/order/place-razorpay', orderData, { headers: { token } })
          console.log(res)
         console.log(res)
         console.log(res.data)
          if(res.data.success){
            setcartItems({})
            navigate('/orders')
          }else{
            toast.error(res.data.message)
          }
          break
        }
        
          default:
            break;
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }
  return (
    <form onSubmit={onsubmithandeler} className='flex  flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title title1={"DELIVERY"} title2={"INFROMATION"}/>
           </div>
           <div className='flex  gap-3'>
<input
  className='border w-full py-1.5 px-3.5 border-gray-500 rounded'
  onChange={onchangehandeler}
  name='firstName' 
  value={formdata.firstName}
  type="text"
  placeholder='FIRST-NAME'
/>

<input
  className='border w-full py-1.5 px-3.5 border-gray-500 rounded'
  onChange={onchangehandeler}
  name='lastname' // <-- matches state
  value={formdata.lastname}
  type="text"
  placeholder='LAST-NAME'
/>
            <input className='border w-full py-1.5 px-3.5 border-gray-500 rounded' onChange={onchangehandeler} name='lastname' value={formdata.lastname} type="text" placeholder='LAST-NAME' />

           </div>
            <div className='flex gap-3 flex-col'>
              <input className='border w-full py-1.5 px-3.5 border-gray-500 rounded' onChange={onchangehandeler} name='email' value={formdata.email} type="email" placeholder='EMAIL' />

              <input className='border w-full py-1.5 px-3.5 border-gray-500 rounded' onChange={onchangehandeler} name='street' value={formdata.street} type="text" placeholder='STREET' />

            </div>

             <div className='flex  gap-3'>
            <input className='border w-full py-1.5 px-3.5 border-gray-500 rounded' onChange={onchangehandeler} name='city' value={formdata.city} type="text" placeholder='CITY' />
            <input className='border w-full py-1.5 px-3.5 border-gray-500 rounded' onChange={onchangehandeler} name='state' value={formdata.state} type="CITY" placeholder='STATE' />
           </div>
              <div className='flex  gap-3'>
            <input className='border w-full py-1.5 px-3.5 border-gray-500 rounded' onChange={onchangehandeler} name='zipcode' value={formdata.zipcode} type="number" placeholder='ZIPCODE' />
            <input className='border w-full py-1.5 px-3.5 border-gray-500 rounded' onChange={onchangehandeler} name='country' value={formdata.country} type="CITY" placeholder='COUNTRY' />
           </div>
           <input className='border w-full py-1.5 px-3.5 border-gray-500 rounded' onChange={onchangehandeler} name='phone' value={formdata.phone} type="number" placeholder='PHONE' />
      </div>
      <div className='mt-8'>
        <div className='w-60  p-2 mr-10 sm:w-90'>
        <Carttotal/>
      </div>
      <div className='mt-12'>
        <Title title1={"PAYMENT"} title2={"METHOD"}/>
        <div className='flex gap-3 flex-col sm:flex-row'>
          <div onClick={()=>setmethod('stripe')} className='border border-gray-500 h-10  cursor-pointer flex items-center'>
            <p className={`min-w-3.5 ml-2 h-3.5 rounded-full cursor-pointer ${method==='stripe' ?'bg-green-600':''}`}></p>
            <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
          </div>
          <div onClick={()=>setmethod('razor-pay')} className='border border-gray-500  h-10  cursor-pointer flex items-center'>
        <p className={`min-w-3.5 ml-2 h-3.5 rounded-full cursor-pointer ${method==='razor-pay' ?'bg-green-600':''}`}></p>
            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
          </div>
          <div onClick={()=>setmethod('cod')} className='border border-gray-500  h-10  cursor-pointer flex items-center'>
           <p className={`min-w-3.5 h-3.5 ml-2 rounded-full cursor-pointer ${method==='cod' ?'bg-green-600':''}`}></p>
           <p className='text-sm text-gray-500 font-medium mx-4'>CASH ON DELIVERY</p>
          </div>
        </div>

        <div className='flex items-center justify-center mt-8 '>
          <button type='submit'  className='border text-sm font-medium cursor-pointer bg-black text-white w-40 h-10 rounded'>PLACE ORDER</button>
        </div>
      </div>
      </div>
      
    </form>
  )
}

export default Placeoreder
