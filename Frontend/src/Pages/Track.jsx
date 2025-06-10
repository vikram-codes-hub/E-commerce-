import React from "react";
import { FaShippingFast, FaCheckCircle, FaBoxOpen, FaMapMarkerAlt } from "react-icons/fa";

const orderStatus = [
  { label: "Order Placed", icon: <FaCheckCircle className="text-green-500" />, date: "25-Jul-2025" },
  { label: "Packed", icon: <FaBoxOpen className="text-yellow-500" />, date: "26-Jul-2025" },
  { label: "Shipped", icon: <FaShippingFast className="text-blue-500" />, date: "27-Jul-2025" },
  { label: "Out for Delivery", icon: <FaMapMarkerAlt className="text-purple-500" />, date: "28-Jul-2025" },
  { label: "Delivered", icon: <FaCheckCircle className="text-green-700" />, date: "29-Jul-2025" },
];

const Track = () => {
  // You can set the current step dynamically based on order status
  const currentStep = 3; // 0-based index, e.g., 3 means "Out for Delivery"

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center pt-16">
      <div className="bg-blue-600 text-white px-8 py-8 rounded-lg shadow mb-8 w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
        <p className="text-lg">Order #123456789</p>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-8">
        <h2 className="text-xl font-semibold mb-6 text-blue-700">Order Status</h2>
        <div className="flex flex-col gap-6">
          {orderStatus.map((step, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div>
                {step.icon}
              </div>
              <div>
                <span className={`font-semibold ${idx <= currentStep ? "text-blue-700" : "text-gray-400"}`}>
                  {step.label}
                </span>
                <div className="text-xs text-gray-500">{step.date}</div>
              </div>
              {idx < orderStatus.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${idx < currentStep ? "bg-blue-500" : "bg-gray-200"}`}></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
          <p className="text-gray-700">
            John Doe<br />
            123 Fashion Street<br />
            Mumbai, India<br />
            +91 98765 43210
          </p>
        </div>

        <div className="mt-8 text-center">
          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
            Estimated Delivery: <span className="font-bold">29-Jul-2025</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Track;