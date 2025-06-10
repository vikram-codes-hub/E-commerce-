import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'

const List = ({token}) => {
  const [list, setlist] = useState([])

  const fetchlist = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/listproduct')
      if (response.data.success) {
        setlist(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const handeldelte=async(id)=>{
    try {
      const response=await axios.post(backendUrl + '/api/product/remove', {id},{headers:{token}})
      if(response.data.success){
        await fetchlist()
        toast.success("Product removed successfully")
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchlist()
  }, [])

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <p className='mb-6 font-bold text-3xl text-center text-gray-800'>
        All Products
        <span className="block w-20 h-1 bg-gray-500 mx-auto mt-2 rounded-full"></span>
      </p>
      
      {/* Desktop Table View */}
      <div className='hidden md:block overflow-hidden rounded-lg shadow-md mb-8'>
        {/* Headers */}
        <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-4 px-6  bg-gray-100   text-sm font-bold'>
          <span className='text-center'>Image</span>
          <span className='text-center'>Name</span>
          <span className='text-center'>Category</span>
          <span className='text-center'>Price</span>
          <span className='text-center'>Action</span>
        </div>

        {/* Product List */}
        <div className="bg-white divide-y divide-gray-200">
          {list.map((item, index) => (
            <div
              key={index}
              className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-4 px-6 hover:bg-blue-50 transition-colors duration-200'
            >
              <div className="flex justify-center">
                <img 
                  className='w-16 h-16 object-cover rounded-md border border-gray-200' 
                  src={item.image[0]} 
                  alt={item.name} 
                />
              </div>
              <p className='text-center font-medium text-gray-800'>{item.name}</p>
              <p className='text-center text-gray-600 capitalize'>{item.category || item.Category}</p>
              <p className='text-center font-semibold text-green-600'>{currency}{item.price.toLocaleString()}</p>
              <div className="flex justify-center">
                <button onClick={()=>handeldelte(item._id)} className="text-red-500 hover:text-red-700 font-bold cursor-pointer transition-colors duration-200 p-1 rounded-full hover:bg-red-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                   
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View Cards */}
      <div className="md:hidden space-y-4">
        {list.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center gap-4">
              <img 
                className="w-20 h-20 object-cover rounded-md border border-gray-200" 
                src={item.image[0]} 
                alt={item.name} 
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-lg">{item.name}</p>
                <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                <p className="font-bold text-green-600 mt-1">{currency}{item.price.toLocaleString()}</p>
              </div>
              <button className="text-red-500 hover:text-red-700 font-bold cursor-pointer transition-colors duration-200 p-1 rounded-full hover:bg-red-100 self-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      )}
    </div>
  )
}

export default List