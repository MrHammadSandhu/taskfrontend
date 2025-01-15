"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Cookie ka use
import { useRouter } from "next/navigation"; // For redirection

const page = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token"); // Token ko cookies se read karna
    console.log("token in frontend", token);

    if (!token) {
      // Agar token nahi hai, toh user ko login page pe redirect kar dena
      router.push("/auth/signin");
      return; // Redirect karne ke baad function ko terminate kar dena
    }

    // Agar token hai, toh backend se user data fetch karo
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://taskbackend-five.vercel.app/api/v1/getuser",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Token ko Authorization header mein bhejna
            },
          }
        );

        // Agar response successful hai, toh data ko state mein set karo
        setUserData(response.data);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  // Handle logout functionality
  const handleLogout = () => {
    Cookies.remove("token"); // Token ko cookie se remove kar dena
    router.push("/auth/signin"); // User ko login page par redirect kar dena
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Welcome, {userData.name}
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          <strong>Email:</strong> {userData.email}
        </p>
        {/* Add any additional user data here */}
        <button
          onClick={handleLogout}
          className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default page;
