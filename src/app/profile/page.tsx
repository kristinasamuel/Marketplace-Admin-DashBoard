// Home // profile page
"use client";
import { useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Kristina",
    email: "kristina@email.com",
    phone: "+923546932",
    location: "karachi, Pakistan",
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    setIsEditing(false); 
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#E0E0E0] min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Profile Content */}
      <div className="flex-1 flex justify-center items-center py-8 px-4">
        <div className="w-full max-w-3xl bg-[#fff] rounded-lg shadow-lg p-6">
          {" "}
          {/* profile page */}
          <div className="text-center mb-8">
            <Image
              src="/images/profile.png"
              alt="Kristina's Image"
              height={200}
              width={200}
              className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
            />
            <h2 className="text-[32px] font-bold">{profileData.name}</h2>
            <p className="text-[28px] text-gray-500">Front-End Developer</p>
            <button
              onClick={handleEditToggle}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-400 transition duration-200"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
          <div className="space-y-6">
            <div className={`${isEditing ? "hidden" : "block"} space-y-4`}>
              <div className="flex justify-center gap-12">
                <p className="font-medium text-gray-700 ">Email:</p>
                <p className="text-gray-500">{profileData.email}</p>
              </div>
              <div className="flex justify-center gap-20">
                <p className="font-medium text-gray-700">Phone:</p>
                <p className="text-gray-500">{profileData.phone}</p>
              </div>
              <div className="flex justify-center gap-14">
                <p className="font-medium text-gray-700">Location:</p>
                <p className="text-gray-500">{profileData.location}</p>
              </div>
            </div>
            <div className={`${isEditing ? "block" : "hidden"} space-y-4`}>
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-400 transition duration-200"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
