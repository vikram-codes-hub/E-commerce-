import React, { useState } from 'react'
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center">
      {/* Hero */}
      <div className="bg-blue-600 text-white py-10 flex flex-col items-center mb-8 shadow">
        <FaPaperPlane className="text-5xl mb-3" />
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="max-w-xl text-lg text-center">
          We'd love to hear from you! Whether you have a question, feedback, or need help with your order, our team is here to help.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-10 max-w-4xl mx-auto w-full bg-white rounded-lg shadow-lg p-8">
        {/* Contact Info */}
        <div className="flex-1 flex flex-col gap-6 justify-center mb-8 md:mb-0">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-blue-600 text-2xl" />
            <span className="text-md">Email: <a href="mailto:support@shopstyle.com" className="text-blue-600 hover:underline">support@shopstyle.com</a></span>
          </div>
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-blue-600 text-2xl" />
            <span className="text-md">Phone: +91 98765 43210</span>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-blue-600 text-2xl" />
            <span className="text-md">123 Fashion Street, Mumbai, India</span>
          </div>
          <div className="mt-6 text-gray-600 text-sm">
            <p>Customer support available: <span className="font-medium text-blue-700">Mon-Sat, 9am - 8pm</span></p>
            <p>We usually reply within 24 hours!</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <h2 className="text-2xl font-semibold mb-2 text-blue-700">Send us a message</h2>
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="How can we help you?"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
          >
            <FaPaperPlane /> Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact