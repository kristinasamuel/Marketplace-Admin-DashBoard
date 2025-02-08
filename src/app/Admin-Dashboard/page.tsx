// Home // Dashboard
"use client";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function DashboardPage() {
  const [orderData] = useState({
    totalOrders: 35,
    pendingOrders: 12,
    completedOrders: 32,
  });

  return (
    <div className="flex flex-col md:flex-row bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard Content */}
      <div className="flex-1 p-6 space-y-8 mt-10  flex justify-center items-center">
        <div className="w-full max-w-6xl">
          {/* main heaading */}
          <div className="flex justify-center mb-8">
            <h1 className="text-[32px] md:text-[40px] font-bold text-yellow-500 text-center">
              Welcome to Funerio Dashboard
            </h1>
          </div>
          {/* Dashboard Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Total Orders Card */}
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center mb-2">
              <div>
                <h2 className="text-2xl font-semibold text-gray-700">
                  Total Orders
                </h2>
                <p className="text-xl text-gray-500">{orderData.totalOrders}</p>
              </div>
              <div className="bg-green-500 text-white p-4 rounded-full">
                <span className="text-3xl">{orderData.totalOrders}</span>
              </div>
            </div>

            {/* Pending Orders Card */}
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center mb-2">
              <div>
                <h2 className="text-2xl font-semibold text-gray-700">
                  Pending Orders
                </h2>
                <p className="text-xl text-gray-500">
                  {orderData.pendingOrders}
                </p>
              </div>
              <div className="bg-yellow-500 text-white p-4 rounded-full">
                <span className="text-3xl">{orderData.pendingOrders}</span>
              </div>
            </div>

            {/* Completed Orders Card */}
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center mb-2">
              <div>
                <h2 className="text-2xl font-semibold text-gray-700">
                  Completed Orders
                </h2>
                <p className="text-xl text-gray-500">
                  {orderData.completedOrders}
                </p>
              </div>
              <div className="bg-blue-500 text-white p-4 rounded-full">
                <span className="text-3xl">{orderData.completedOrders}</span>
              </div>
            </div>
          </div>
          {/* Progress/Small Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-[35px] font-semibold text-yellow-500 mb-4">
              Order Progress
            </h2>
            {/* A small progress bar */}
            <div className="space-y-4">
              {/* Total Orders Progress */}
              <div>
                <h3 className="text-lg font-medium text-gray-500">
                  Total Orders Progress
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <h3
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${(orderData.completedOrders / orderData.totalOrders) * 100}%`,
                    }}
                  ></h3>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {(
                    (orderData.completedOrders / orderData.totalOrders) *
                    100
                  ).toFixed(2)}
                  % completed
                </p>
              </div>

              {/* Pending Orders Progress */}
              <div>
                <h3 className="text-lg font-medium text-gray-700">
                  Pending Orders Progress
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <h3
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{
                      width: `${(orderData.pendingOrders / orderData.totalOrders) * 100}%`,
                    }}
                  ></h3>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {(
                    (orderData.pendingOrders / orderData.totalOrders) *
                    100
                  ).toFixed(2)}
                  % pending
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
