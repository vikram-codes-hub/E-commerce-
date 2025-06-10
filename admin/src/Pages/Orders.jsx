import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchOrders = useCallback(async () => {
    if (!token) return

    try {
      const res = await axios.get(`${backendUrl}/api/order/list`, {
        headers: { token }
      })
      if (res.data.success) {
        setOrders(res.data.orders)
      } else {
        toast.error(res.data.message || 'Failed to fetch orders')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }, [token])

  const handleStatusChange = async (e, orderId) => {
    const newStatus = e.target.value
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/update-status`,
        { orderId, status: newStatus },
        { headers: { token } }
      )
      if (res.data.success) {
        fetchOrders()
      } else {
        toast.error(res.data.message || 'Failed to update status')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const statusColors = {
    'Order Placed': 'bg-blue-100 text-blue-800',
    'Packing': 'bg-yellow-100 text-yellow-800',
    'Shipped': 'bg-purple-100 text-purple-800',
    'Out for delivery': 'bg-orange-100 text-orange-800',
    'Delivered': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800'
  }

  const statusOptions = Object.keys(statusColors)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h3 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Your Orders</h3>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <img src={assets.parcel_icon} alt="No orders" className="w-24 h-24 mx-auto mb-4 opacity-50" />
          <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex items-center justify-center bg-gray-100 p-4 rounded-lg w-16 h-16 md:w-20 md:h-20">
                    <img src={assets.parcel_icon} alt="Order" className="w-full h-full object-contain" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                          {order.status}
                        </span>

                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-800">${order.amount?.toFixed(2)}</p>
                          <p className={`text-xs ${order.payment ? 'text-green-600' : 'text-red-600'}`}>
                            {order.payment ? 'Paid' : 'Not Paid'} • {order.paymentMethod}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Shipping Address</h5>
                        <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600 space-y-1">
                          <p><strong>{order.address?.firstName} {order.address?.lastName}</strong></p>
                          <p>{order.address?.email}</p>
                          <p>{order.address?.phone}</p>
                          <p>{order.address?.street}</p>
                          <p>{order.address?.city}, {order.address?.state} {order.address?.zipcode}</p>
                          <p>{order.address?.country}</p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Order Items</h5>
                        <div className="border border-gray-100 rounded-md divide-y divide-gray-100">
                          {order.items.map((item) => (
                            <div key={item._id || item.name} className="flex justify-between items-center p-3">
                              <div>
                                <p className="font-medium">{item.name}</p>
                                {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                              </div>
                              <div className="text-right">
                                <p className="font-medium">× {item.quantity}</p>
                                <p className="text-sm text-gray-500">${item.price?.toFixed(2)} each</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-100">
                      <select
                        onChange={(e) => handleStatusChange(e, order._id)}
                        value={order.status}
                        className={`px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 cursor-pointer ${
                          statusColors[order.status]?.replace('100', '200') || 'bg-gray-200'
                        }`}
                      >
                        {statusOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
