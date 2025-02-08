// Home // Sidebar
import Link from "next/link";
import { FaShoppingCart, FaUser, FaBox, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-full md:w-1/5  bg-gray-500 p-6 text-[#FFFFFF] h-auto md:h-screen  top-0 left-0 z-10">
      <h2 className="text-4xl font-bold mb-6 text-center">Admin Panel</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <Link
              href="/product"
              className="w-full text-left px-4 py-2 flex items-center bg-teal-500 hover:bg-teal-400"
            >
              <FaBox className="mr-2" /> Products
            </Link>
          </li>

          <li className="mb-4">
            <Link
              href="/order"
              className="w-full text-left px-4 py-2 flex items-center bg-teal-500 hover:bg-teal-400"
            >
              <FaShoppingCart className="mr-2" /> Orders
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/profile"
              className="w-full text-left px-4 py-2 flex items-center bg-teal-500 hover:bg-teal-400"
            >
              <FaUser className="mr-2" /> Profile
            </Link>
          </li>

          <Link href={"/"} className="mt-6">
            <button className="w-full text-left px-4 py-2 flex items-center rounded-md bg-red-500 hover:bg-red-400">
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
