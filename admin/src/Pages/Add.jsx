import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {
  const [image1,setimage1]=useState(false)
  const [image2,setimage2]=useState(false)
  const [image3,setimage3]=useState(false)
  const [image4,setimage4]=useState(false)

  const[name,setname]=useState('')
  const[description,setdescription]=useState('')
  const[price,setprice]=useState('25')
  const[catogory,setcatogory]=useState('Men')
  const[subcatogory,setsubcatogory]=useState('Topwear')
  const[bestseller,setbestseller]=useState('')
  const[sizes,setsizes]=useState([])

   const toggleSize = (size) => {
    if (sizes.includes(size)) {
      setsizes(sizes.filter((s) => s !== size));
    } else {
      setsizes([...sizes, size]);
    }
  };

  const onsubmithandeller=async (e)=>{
     e.preventDefault();
   try {
      const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("category", catogory);
    formdata.append("subCategory", subcatogory);
    formdata.append("bestseller", bestseller);
    formdata.append("sizes", JSON.stringify(sizes));
    if (image1) formdata.append("image1", image1);
    if (image2) formdata.append("image2", image2);
    if (image3) formdata.append("image3", image3);
    if (image4) formdata.append("image4", image4);
    const response=await axios.post(backendUrl + "/api/product/add",formdata,{headers:{token:token,},})
    if(response.data.success){
      setdescription('')
      setname('')
        setimage1(false)
        setimage2(false)
        setimage3(false)
        setimage4(false)
      setprice('')
      toast.success("Product Addded")
    }else{
      toast.error(response.data.message)
    }
   } catch (error) {
    console.log(error)
    toast.error(error.message)
   }
  }

  const onclickhandeler=()=>{
    console.log("Clicked")
  }
  return (
    <form onSubmit={onsubmithandeller} className="flex flex-col w-full max-w-4xl mx-auto p-6 gap-6 bg-white shadow-lg rounded-2xl">

      <div>
      <p className="mb-3 text-lg font-semibold text-gray-700">Upload Product Images</p>
      <div className="flex flex-wrap gap-4">
        <label htmlFor="image1" className="cursor-pointer hover:scale-105 transition-transform">
          <img
            className="w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg bg-gray-50"
            src={!image1?assets.upload_area:URL.createObjectURL(image1)}
            alt=""
          />
          <input type="file" id="image1" hidden onChange={(e) => setimage1(e.target.files[0])} />
        </label>

        <label htmlFor="image2" className="cursor-pointer hover:scale-105 transition-transform">
          <img
            className="w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg bg-gray-50"
              src={!image2?assets.upload_area:URL.createObjectURL(image2)}
            alt=""
          />
          <input type="file" id="image2" hidden onChange={(e) => setimage2(e.target.files[0])} />
        </label>

        <label htmlFor="image3" className="cursor-pointer hover:scale-105 transition-transform">
          <img
            className="w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg bg-gray-50"
             src={!image3?assets.upload_area:URL.createObjectURL(image3)}
            alt=""
          />
          <input type="file" id="image3" hidden onChange={(e) => setimage3(e.target.files[0])} />
        </label>

        <label htmlFor="image4" className="cursor-pointer hover:scale-105 transition-transform">
          <img
            className="w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg bg-gray-50"
              src={!image4?assets.upload_area:URL.createObjectURL(image4)}
            alt=""
          />
          <input type="file" id="image4" hidden onChange={(e) => setimage4(e.target.files[0])} />
        </label>
      </div>
    </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
        <input onChange={(e)=>setname(e.target.value)}
          type="text"
          placeholder="Type here"
          required
          value={name}
          className="w-full max-w-md px-4 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
        <textarea onChange={(e)=>setdescription(e.target.value)} value={description}
          placeholder="Write content here"
          required
          className="w-full max-w-md px-4 py-2 rounded-md bg-gray-100 border border-gray-300 resize-none h-28 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
        <div className="flex flex-col w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Category</label>
          <select onChange={(e)=>setcatogory(e.target.value)} value={catogory} className="px-4 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="flex flex-col w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Subcategory</label>
          <select onChange={(e)=>setsubcatogory(e.target.value)} value={subcatogory} className="px-4 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Price (₹)</label>
        <input onChange={(e)=>setprice(e.target.value)} value={price}
          type="number"
          placeholder="25"
          required
          className="w-40 px-4 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

    <div>
      <p className="mb-2 font-medium text-gray-700">Product Sizes</p>
      <div className="flex gap-2 flex-wrap">
        {['S', 'M', 'L', 'XL'].map((size) => (
          <div
            key={size}
            onClick={() => toggleSize(size)}
            className={`px-4 py-2 rounded-md cursor-pointer border 
              ${
                sizes.includes(size)
                  ? 'bg-black text-white border-black'
                  : 'bg-gray-200 text-gray-800 border-gray-300'
              } transition`}
          >
            {size}
          </div>
        ))}
      </div>
    </div>
      <div className="flex items-center gap-2 mt-2">
        <input onChange={()=>setbestseller(prev=>!prev)} value={bestseller} className="cursor-pointer w-4 h-4 accent-black" type="checkbox" id="bestseller" />
        <label className="cursor-pointer text-gray-700" htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button
        type="submit"
        onClick={onclickhandeler}
        className="mt-4 border bg-black hover:bg-gray-800 transition text-white w-32 py-2 rounded-lg self-center"
      >

        ADD
      </button>
    </form>
  );
};

export default Add;
