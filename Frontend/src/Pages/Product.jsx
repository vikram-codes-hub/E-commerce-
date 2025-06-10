import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../Components/RelatedProducts'

const Product = () => {
  const { productId } = useParams()
  const { products,currency,addTocart } = useContext(ShopContext)
  const [productdata, setproductdata] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [clicked,setclicked]=useState()
  const [activeTab, setActiveTab] = useState("description");
  const [size,setSize]=useState('')


  const fetchProductData = () => {
    const found = products.find(item => item._id === productId)
    setproductdata(found)
    setCurrentIndex(0)
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  const handleNext = () => {
    if (productdata && productdata.image.length > 0) {
      setCurrentIndex((prevIndex) =>
        (prevIndex + 1) % productdata.image.length
      )
    }
  }

  const handlePrev = () => {
    if (productdata && productdata.image.length > 0) {
      setCurrentIndex((prevIndex) =>
        (prevIndex - 1 + productdata.image.length) % productdata.image.length
      )
    }
  }

  return productdata ? (
   <div>
     <div className='border-t-2 overflow-hidden p-4 flex'>
      <div className='relative w-fit group'>
        <img
          src={productdata.image[currentIndex]}
          alt='Product'
          className='w-120 h-100 object-contain'
        />

        {/* Previous button */}
        <button
          onClick={handlePrev}
          className='absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200'
        >
          &lt;
        </button>

        {/* Next button */}
        <button
          onClick={handleNext}
          className='absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200'
        >
          &gt;
        </button>
      </div>
      <div className='flex-1'>
        <div className='text-2xl font-medium mt-2 '>{productdata.name}</div>
        <div className='flex gap-2 my-3  items-center'>
          <img src={assets.star_icon} alt=""className='w-3 5'/>
          <img src={assets.star_icon} alt="" className='w-3 5'/>
          <img src={assets.star_icon} alt="" className='w-3 5'/>
          <img src={assets.star_icon} alt="" className='w-3 5'/>
          <img  src={assets.star_dull_icon} alt="" className='w-3 5'/>
          <p className='pl-2'>(122)</p>
        </div>
        <p className='mt-2 text-3xl fontg-medium'>{currency}{productdata.price}</p>
        <p className='mt-5 text-gray-500 md:w-4/5'>{productdata.description}</p>
        <div className='flex flex-col gap-4  my-8'>
          <p>Select size</p>
          <div>{productdata.sizes.map((item,index)=>(
            <button onClick={()=>{setclicked(item); setSize(item)} } className={`border ml-3 py-2 px-4 ${item===clicked?" border-2 border-blue-800 bg-gray-200":""}`} key={index}>{item}</button>
          ))}</div>
        </div>
        <button onClick={()=>addTocart(productdata._id,size)} className='border-2 w-40 h-10 bg-black text-white p-2 active:bg-gray-700'>ADD TO CART</button>
        <hr className='mt-8 sm:w-4/5' />
        <div className='flex gap-3 flex-col mt-6 text-sm text-gray-500'>
          <p>100% Original Product</p>
          <p>Cash on delivery is availabel on this product</p>
          <p>Easy return and exchange policy within 7days</p>
        </div>
      </div>
      {/* {descriptiona and review center} */}
      
    </div>
    <div className='mt-15 ml-20'>
      <div className='flex gap-2'>
  <div
    className={`border px-5 py-3 text-sm cursor-pointer ${activeTab === 'description' ? 'bg-gray-200 font-semibold text-black' : ''}`}
    onClick={() => setActiveTab("description")}
  >
    Description
  </div>
  <div
    className={`border px-5 py-3 text-sm cursor-pointer ${activeTab === 'reviews' ? 'bg-gray-200 font-semibold text-black' : ''}`}
    onClick={() => setActiveTab("reviews")}
  >
    Reviews (122)
  </div>
</div>
<div className='border border-gray-300 mt-2 p-4'>
  {activeTab === "description" && (
    <div className='flex flex-col gap-3 text-sm text-gray-500'>
      <p>An e-commerce website is a digital platform that facilitates the buying and selling of goods and services over the internet, allowing users to browse products, compare prices, and make secure transactions from the comfort of their homes.</p>
      <p>E-commerce websites typically display a wide range of products or services along with detailed descriptions, high-quality images, customer reviews, prices, and options to customize or select variations before adding them to a virtual shopping cart and proceeding to checkout.</p>
    </div>
  )}
  
  {activeTab === "reviews" && (
    <div className='text-sm text-gray-500'>
      <p><b>Customer Reviews:</b></p>
      <ul className='list-disc ml-5 mt-2'>
        <li>Great quality product! Highly recommended.</li>
        <li>Fast delivery and the item matched the description perfectly.</li>
        <li>Customer service was very helpful and responsive.</li>
      </ul>
    </div>
  )}
</div>

    </div>

    {/* {display related producst} */}
    <RelatedProducts category={productdata.category} subcategory={productdata.subcategory}/>
   </div>
  ) : (
    <div className='opacity-0'>Loading...</div>
  )
}

export default Product
