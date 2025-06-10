import React, { useContext, useEffect } from "react";
import { ShopContext } from "../Context/Shopcontext";
import Title from "./Title";
import Productitem from "./Productitem";

const Bestseller = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setBestseller] = React.useState([]);

  useEffect(() => {
    const bestproduct=products.filter((item)=>item.bestseller)
    setBestseller(bestproduct.slice(0, 5));
  },[products]);

  return <div className="my-10">
    <div className="text-center text-3xl py-8">
        <Title title1={"BEST"} title2={"SELLER"}/>
        <p className="w-2/3 m-auto text-xs text-gray-500 sm:text-sm md:text-base">Hot picks everyone’s talking about. Don’t miss out on our best sellers!</p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
        {
            bestseller&&bestseller.map((items,index)=>(
                <Productitem key={index} id={items._id} image={items.image} name={items.name} price={items.price}/>
            ))
        }
    </div>
  </div>;
};

export default Bestseller;
