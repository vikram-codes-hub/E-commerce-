import React, { useContext } from "react";
import { ShopContext } from "../Context/Shopcontext";
import Title from "../Components/Title";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Orders = () => {
  const { products, currency, navigate, backendurl, token } =
    useContext(ShopContext);
  const [orderData, setorderData] = useState([]);

  const loaderData = async () => {
    try {
      // console.log(token)
      if (!token) {
        return null;
      }
      const userId = localStorage.getItem("userId");
      const res = await axios.post(
        backendurl + "/api/order/user",
        { userId },
        { headers: { token } }
      );
      console.log(res.data);
      // setorderData(res.data.orders); // Uncomment this to update your state
      if (res.data.success) {
        let arr = [];
        res.data.orders.map((order) =>
          order.items.map(
            (item) => (
              (item["status"] = order.status),
              (item["payment"] = order.payment),
              (item["paymentMethod"] = order.paymentMethod),
              (item["date"] = order.date),
              arr.push(item)
            )
          )
        );
        setorderData(arr.reverse());
      }
    } catch (error) {
      console.log(" in loader data", error);
    }
  };
  useEffect(() => {
    // console.log("Effect")
    loaderData();
  }, [token]);
  return (
    <div className="pt-16 border-t">
      <div className="text-2xl">
        <Title title1={"MY"} title2={"ORDERS"} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t mt-3 text-gray-700  flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className=" flex item-start gap-6 text-sm">
              <img className="w-20 sm:w-28" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="text-sm font-medium flex  flex-col gap-1">
                  <p>
                    {currency}
                    {item.price}.00
                  </p>
                  <p>Quantity : {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <div className="mt-2">
                  Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                 
                </div>
                 Payment Method: <span className="text-gray-400">{item.paymentMethod}</span>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2 justify-center">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p>{item.status}</p>
              </div>
              <button
                onClick={() => navigate("/track")}
                className="border bg-slate-100 tex-sm w-30 p-1 "
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
