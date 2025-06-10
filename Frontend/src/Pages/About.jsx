import React from 'react'
import { FaShippingFast, FaSmile, FaTshirt, FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="p-0 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12 flex flex-col items-center">
        <FaTshirt className="text-6xl mb-4" />
        <h1 className="text-5xl font-bold mb-4">About Forever</h1>
        <p className="max-w-2xl text-lg text-center">
          Your one-stop destination for stylish, affordable fashion for all ages. Shopping should be simple, fun, and accessible from anywhere!
        </p>
      </div>

      {/* Stats Section */}
      <div className="flex flex-wrap justify-center gap-8 my-10">
        <div className="flex flex-col items-center">
          <FaTshirt className="text-3xl text-blue-600 mb-2" />
          <span className="text-2xl font-bold">5000+</span>
          <span className="text-gray-600">Products</span>
        </div>
        <div className="flex flex-col items-center">
          <FaUsers className="text-3xl text-blue-600 mb-2" />
          <span className="text-2xl font-bold">100K+</span>
          <span className="text-gray-600">Happy Customers</span>
        </div>
        <div className="flex flex-col items-center">
          <FaShippingFast className="text-3xl text-blue-600 mb-2" />
          <span className="text-2xl font-bold">24hr</span>
          <span className="text-gray-600">Fast Delivery</span>
        </div>
        <div className="flex flex-col items-center">
          <FaSmile className="text-3xl text-blue-600 mb-2" />
          <span className="text-2xl font-bold">4.9/5</span>
          <span className="text-gray-600">Customer Rating</span>
        </div>
      </div>

      {/* About Content */}
      <div className="p-8 max-w-4xl mx-auto text-gray-800 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
        <p className="mb-4 text-lg">
          Our team curates trendy and high-quality clothing across categories like <span className="font-medium">Men, Women, and Kids</span>. Whether you're looking for everyday essentials or the latest trends, we’ve got you covered.
        </p>
        <p className="mb-4 text-lg">
          We are passionate about providing an excellent customer experience, with fast delivery, secure payments, and a seamless online interface.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-2">Why Choose Us?</h2>
        <ul className="list-disc pl-6 text-lg space-y-2">
          <li>Trendy collections updated regularly</li>
          <li>Easy returns and secure checkout</li>
          <li>Fast and reliable delivery</li>
          <li>Friendly customer support</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-2">Our Mission</h2>
        <p className="text-lg">
          To bring fashion-forward products to your doorstep with quality service and unmatched value.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-2">Contact Us</h2>
        <p className="text-lg">
          Have questions or feedback? Reach us at: <br />
          <a href="mailto:support@shopstyle.com" className="text-blue-600 hover:underline">
            support@shopstyle.com
          </a>
        </p>
        <div className="flex justify-center mt-8">
          <Link to="/collection" className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition">
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About