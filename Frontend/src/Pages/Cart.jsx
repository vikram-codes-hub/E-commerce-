import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import { assets } from "../assets/assets";
import Carttotal from "../Components/Carttotal";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    removeitem,
    navigate,
  } = useContext(ShopContext);
  const [cartData, setcartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let tempdata = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempdata.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setcartData(tempdata);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title title1={"YOUR"} title2={"CART"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          if (!productData) {
            console.warn("Product not found for _id:", item._id);
            return null;
          }

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                />
                <div className="text-xl  mt-1 sm:text-lg font-medium">
                  {productData.name}
                  <div className=" flex items-center  gap-3 mt-3">
                    {currency}
                    {productData.price}
                    <p className="px-2 sm:px-3  sm;py-1 border bg-slate-50 text-sm ">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                className="border max-w-10 sm:max-w-20  px-3 sm;px-2 py-1"
                min={0}
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item._id, item.size, Number(e.target.value))
                }
              />
              <img
                onClick={() => removeitem(item._id, item.size)}
                className="w-6 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end">
        <div className="w-90 mt-10 sm:w[450px]">
          <Carttotal />
          <div className="border w-40 h-10 p-2 pl-3 bg-black text-white mt-7 m-auto text-sm cursor-pointer">
            <button onClick={() => navigate("/place-order")}>
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
