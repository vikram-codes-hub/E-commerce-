import { createContext,  useEffect,  useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const deliveryfees = 10;
  const [search,setsearch]=useState('')
  const [showSearch,setshowSearch]=useState(false)
  const [cartItems,setcartItems]=useState({})
  const [products,setproducts]=useState([])
  const [token,settoken]=useState('')
  const navigate=useNavigate()
  const backendurl=import.meta.env.VITE_BACKEND_URL
  

   useEffect(() => {
    getProductsdata();
  }, []);
  

  useEffect(()=>{
    if(!token&&localStorage.getItem('token')){
      settoken(localStorage.getItem('token'))
      getUsercart(localStorage.getItem('token'))
    }
  })
  
  const addTocart=async(itemId,size)=>{
    if(!size){
      toast.error("Please select any size")
      return
    }
    let cartdata=structuredClone(cartItems)
    if(cartdata[itemId]){
      if(cartdata[itemId][size]){
        cartdata[itemId][size]+=1
      }else{
        cartdata[itemId][size]=1
      }
    }else{
      cartdata[itemId]={}
      cartdata[itemId][size]=1
    }
    setcartItems(cartdata)
    if(token){
      try { 
        await axios.post(backendurl + '/api/cart/add' , {itemId,size} , {headers:{token}} )
      } catch (error) {
        console.log(error)
        toast.error(error.message )
      }
    }
  }
 
  const getcount=()=>{
    let totalc=0;
    for (const items in cartItems){
      for(const item in cartItems[items]){
        try {
          if(cartItems[items][item]>0){
            totalc+=cartItems[items][item]
          }
        } catch (error) {console.log(error)}
      }
    }
    return totalc
  }

const updateQuantity=async(itemId,size,quantity)=>{
  let cartData=structuredClone(cartItems);
  cartData[itemId][size]=quantity
  setcartItems(cartData)

  try {
    if(token){
      await axios.post(backendurl + '/api/cart/update',{itemId,size,quantity},{headers:{token}})
    }
  } catch (error) {
    console.log(error)
        toast.error(error.message )
  }
}

const getUsercart=async(token)=>{
  try {
    const response=await axios.post(backendurl + '/api/cart/get',{},{headers:{token}})
    if(response.data.success){
        setcartItems(response.data.cartData)
    }
  } catch (error){
     console.log(error)
        toast.error(error.message )
}
}

  const removeitem = (itemId, size) => {
  let productcopy = structuredClone(cartItems);
  if (productcopy[itemId] && productcopy[itemId][size]) {
    delete productcopy[itemId][size];
    // If no sizes left for this product, remove the product key
    if (Object.keys(productcopy[itemId]).length === 0) {
      delete productcopy[itemId];
    }
    setcartItems(productcopy);
  }
};

const getcartAmount = () => {
  let total = 0;
  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      const quantity = cartItems[productId][size];
      if (quantity > 0) {
        // Find the product by ID
        const product = products.find(p => p._id === productId);
        if (product) {
          total += product.price * quantity;
        }
      }
    }
  }
  return total;
};

const getProductsdata=async()=>{
try {
  const response=await axios.get(backendurl + '/api/product/listproduct')
if(response.data.success){
  setproducts(response.data.products)

}else{
  toast.error(response.data.message)
}
} catch (error) {
  console.log(error)
  toast.error(error.message)
}
}
  const value = {
    products,
    currency,
    deliveryfees,
    search,setsearch,showSearch,updateQuantity,setshowSearch,cartItems,setcartItems,addTocart,getcount,removeitem,getcartAmount,navigate,backendurl,token,settoken
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
