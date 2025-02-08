// home order page
"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Sidebar from "@/components/Sidebar";
import { FaTrashAlt, FaEye } from "react-icons/fa";

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  total: number;
  status: string | null;
  orderDate: string;
  cartItems: { title: string; productImage: string }[];
}

const OrderedPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    client
      .fetch(
        `*[_type == "order"]{
          _id,
          firstName,
          lastName,
          email,
          total,
          status,
          orderDate,
          cartItems[]->{
            title,
            productImage
          }
        }`
      )
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    client
      .patch(orderId)
      .set({ status: newStatus })
      .commit()
      .then(() => {
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
      })
      .catch((error) => console.error("Error updating order status:", error));
  };

  const handleDeleteOrder = (orderId: string) => {
    client
      .delete(orderId)
      .then(() => {
        setOrders(orders.filter((order) => order._id !== orderId));
        console.log("Order deleted successfully");
      })
      .catch((error) => console.error("Error deleting order:", error));
  };

  const filteredOrders = orders.filter(
    (order) => statusFilter === "all" || order.status === statusFilter
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 md:ml-1/5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        </div>

        <div className="mb-4 flex items-center">
          <label htmlFor="statusFilter" className="text-lg text-gray-700 mr-2">Filter by Status:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-md">
          <table className="min-w-full table-auto">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{order._id}</td>
                  <td className="px-6 py-4">{order.firstName} {order.lastName}</td>
                  <td className="px-6 py-4">{order.email}</td>
                  <td className="px-6 py-4">${order.total}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status || "none"}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="none" disabled>Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td>
                  <td className="flex px-6 py-4">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-400 mr-2"
                      onClick={() => setSelectedOrderId(order._id)}
                    >
                      <FaEye className="mr-2" /> View
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-400"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      <FaTrashAlt className="mr-2" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Details */}
        {selectedOrderId && (
          <div className="order-details mt-8 bg-white p-4 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <button
              onClick={() => setSelectedOrderId(null)}
              className="text-green-500 underline"
            >
              Close
            </button>
            {orders
              .filter((order) => order._id === selectedOrderId)
              .map((order) => (
                <div key={order._id} className="mt-4">
                  <p><strong>Customer:</strong> {order.firstName} {order.lastName}</p>
                  <p><strong>Email:</strong> {order.email}</p>
                  <p><strong>Total:</strong> ${order.total}</p>
                  <p><strong>Status:</strong> {order.status || "N/A"}</p>
                  <h3 className="mt-4 font-semibold">Cart Items</h3>
                  <ul>
                    {order.cartItems && order.cartItems.length > 0 ? (
                      order.cartItems.map((item, index) => (
                        <li key={index} className="flex items-center mt-2">
                          <img
                            src={item.productImage}
                            alt={item.title}
                            width={50}
                            height={50}
                            className="mr-2"
                          />
                          <span>{item.title}</span>
                        </li>
                      ))
                    ) : (
                      <p>No items in the cart</p>
                    )}
                  </ul>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderedPage;
