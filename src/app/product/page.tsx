// Home // product page
"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client"; 
import Image from "next/image";
import Sidebar from "@/components/Sidebar";

interface Product {
  _id: string;
  title: string;
  price: number;
  discountPercentage: number;
  quantity: number;
  imageUrl: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = await client.fetch(
          `*[_type == "product"]{
            _id,
            title,
            price,
            discountPercentage,
            quantity,
            "imageUrl": productImage.asset->url + "?w=500&h=500&fit=crop"
          }`
        );
        setProducts(query || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); 

  return (
    <div className="flex flex-col md:flex-row bg-white">
      {/* Sidebar */}
      <Sidebar />
      {/* Product Table  */}
      <div className="flex-1 p-4 md:p-8  ">
        <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
        <div className="overflow-x-auto ">
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="px-3 py-2 text-left text-[22px]">Product Name</th>
                <th className="px-3 py-2 text-left text-[22px]">Price</th>
                <th className="px-3 py-2 text-left text-[22px]">Image</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-100">
                  <td className="px-3 py-2 text-[22px]">{product.title}</td>
                  <td className="px-3 py-2 text-[22px]">${product.price}</td>
                  <td className="px-3 py-2 text-[22px]">
                    <div className="w-16 h-16 relative mx-auto">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        width={64}
                        height={64}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}