import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../Context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../Components/Title'
import Productitem from '../Components/Productitem'

const Collection = () => {
  const {products,search,showSearch}=useContext(ShopContext)
  const [showFilter,SetshowFilter]=useState(false)
  const [Filterproducts,setFilterproducts]=useState([])
  const[categoryfilter,setcategoryfilter]=useState([])
  const[subcategory,setsubcategory]=useState([])
  const [sortType, setSortType] = useState("Relevant")

  // this sets the category into the array
   const toggelcategory=(e)=>{
    if(categoryfilter.includes(e.target.value)){
      setcategoryfilter(prev=>prev.filter(item=>item!==e.target.value))
    }else{
      setcategoryfilter(prev=>[...prev,e.target.value])
    } 
  }

  const subcategoryfilter=(e)=>{
    if(subcategory.includes(e.target.value)){
      setsubcategory(prev=>prev.filter(item=>item!==e.target.value))
    }else{
      setsubcategory(prev=>[...prev,e.target.value])
    }
  }

  const applyfilter=()=>{
    let productcopy=products.slice();
    if(search &&showSearch){
      productcopy=productcopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(categoryfilter.length>0){
       productcopy=productcopy.filter((item)=>categoryfilter.includes(item.category))
    }
     if(subcategory.length>0){
      productcopy=productcopy.filter((item)=>subcategory.includes(item.subCategory))
    }
    setFilterproducts(productcopy)
   
  }

const sortProduct=()=>{
    let productcopy=products.slice();
    switch(sortType){
      case 'low-high':
        setFilterproducts(productcopy.sort((a,b)=>(a.price-b.price)))
        break
      case 'high-low':
        setFilterproducts(productcopy.sort((a,b)=>(b.price-a.price)))
        break
      default:
        applyfilter()
        break
    }   
                                
}

useEffect(()=>{
  applyfilter()
},[categoryfilter,subcategory,search,showSearch,products])

useEffect(()=>{
  sortProduct()
},[sortType])



  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/*FIlter options*/}
      <div className='min-w-60'>
        <p  onClick={() => SetshowFilter(!showFilter)}  className='text-xl my-2 cursor-pointer flex items-center gap-2'>FILTERS<img className={`h-3 sm:hidden ${showFilter ?'rotate-90':''}`} src={assets.dropdown_icon} alt="" /></p>
      
        {/* Category filters */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ?'' :'hidden'} sm:block`}> 
          <p className='mb-3 text-sm font-medium'>CATEGORY</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggelcategory} />Men
            </p>
            <p className='flex gap-2'><input className='w-3' type="checkbox" value={"Women"} onChange={toggelcategory}/> Women</p>
            <p className='flex gap-2'><input className='w-3' type="checkbox" value={"Kids"} onChange={toggelcategory} /> Kids</p>
          </div>
        </div>

        {/* SUb category filter */}

        <div>
            <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ?'' :'hidden'} sm:block`}> 
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'}onChange={subcategoryfilter} />Topwear
            </p>
            <p className='flex gap-2'><input className='w-3' type="checkbox" value={"Bottomwear"}onChange={subcategoryfilter} /> Bottomwear</p>
            <p className='flex gap-2'><input className='w-3' type="checkbox" value={"Winterwear"}onChange={subcategoryfilter} /> Winterwear</p>
          </div>
        </div>
        </div>
      </div>

      {/* Right Side */}

<div className='flex-1'>
  <div className='flex justify-between text-base sm:text-2xl mb-4'>
    <Title title1={"ALL"} title2={"COLLECTIONS"}/>
    {/* //Product sort */}
    <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
      <option value="Relevant">Sort by : Relevant</option>
      <option value="low-high">Sort by : Low to high</option>
      <option value="high-low">Sort by : High to low</option>
    </select>
  </div>

  {/* Map  products */}
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6'>
    {
      Filterproducts&&Filterproducts.map((item,index)=>(
        <Productitem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
      ))
    }
  </div>

</div>

      
    </div>
  )
}

export default Collection

