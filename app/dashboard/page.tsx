"use client";
import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import {
  FiHome,
  FiCalendar,
  FiClock,
  FiActivity,
  FiArrowUp,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiMail,
  FiMapPin,
  FiPhone,
  FiAward,
  FiLogOut,
  FiBox,
  FiCheckCircle,
} from "react-icons/fi";
import {
  FaShoppingCart,
  FaShieldAlt,
  FaGoogle,
  FaRegHeart,
} from "react-icons/fa";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("Good Morning");
  const [lastActive, setLastActive] = useState("Just now");
  const [memberSince, setMemberSince] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      setCurrentTime(`${formattedHours}:${minutes} ${ampm}`);

      if (hours < 12) setGreeting("Good Morning");
      else if (hours < 17) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      const date = new Date();
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ];
      setMemberSince(`${months[date.getMonth()]} ${date.getFullYear()}`);
    }
  }, [session]);

  useEffect(() => {
    const updateLastActive = () => {
      const now = new Date();
      const minutes = Math.floor(Math.random() * 10) + 1;
      setLastActive(`${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`);
    };

    updateLastActive();
    const interval = setInterval(updateLastActive, 60000);
    return () => clearInterval(interval);
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#faf6ef] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#C49B5C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#faf6ef] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-[#d4c5a9]/30 p-8 max-w-md w-full shadow-lg text-center">
          <div className="bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUser className="text-white text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-[#2C1810] mb-2">Welcome Back!</h2>
          <p className="text-gray-600 mb-6">Please sign in to access your dashboard</p>
          <Link
            href="/api/auth/signin"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <FaGoogle />
            Sign in with Google
          </Link>
        </div>
      </div>
    );
  }

  const user = {
    id: session.user?.id || session.user?.email?.split("@")[0]?.toUpperCase() || "GUEST",
    name: session.user?.name || "Guest User",
    email: session.user?.email || "guest@example.com",
    image: session.user?.image || `https://ui-avatars.com/api/?name=${session.user?.name || "User"}&background=C49B5C&color=fff&size=128`,
    provider: "Google",
    isVerified: true,
    totalOrders: 0,
    wishlistCount: 0,
    cartCount: 0,
    reviewsCount: 0,
    totalSpent: "₹0",
    favoriteCategory: "Not specified",
    phone: "Not provided",
    location: "Not provided",
  };

  // Get current date and time for last active
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-[#faf6ef] pt-16 md:pt-20">
      <div className="bg-white border-b border-[#d4c5a9]/30 shadow-sm top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] p-2.5 rounded-xl shadow-md">
                <FiHome className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#2C1810]">
                  Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  {greeting}, {user.name.split(" ")[0]}! 👋
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-[#f8f3ea] px-4 py-2 rounded-full flex items-center gap-2 border border-[#d4c5a9]/30">
                <FiCalendar className="text-[#8B6B3D]" />
                <span className="text-sm font-medium text-[#2C1810]">
                  {new Date().toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
                <FiActivity className="text-white" />
                <span className="text-sm font-medium text-white">Live</span>
              </div>
              <div className="bg-[#f8f3ea] px-4 py-2 rounded-full flex items-center gap-2 border border-[#d4c5a9]/30">
                <FiClock className="text-[#8B6B3D]" />
                <span className="text-sm font-medium text-[#2C1810]">
                  {currentTime}
                </span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-full flex items-center gap-2 transition-colors border border-red-200"
              >
                <FiLogOut size={16} />
                <span className="text-sm font-medium hidden sm:inline">
                  Sign Out
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="bg-white rounded-xl border border-[#d4c5a9]/30 p-6 mb-6 hover:shadow-lg transition-all duration-300">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-[#C49B5C] shadow-lg">
                <Image
                  src={user.image}
                  alt={user.name}
                  width={112}
                  height={112}
                  className="object-cover"
                  unoptimized
                />
              </div>
              {user.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white">
                  <FiCheckCircle className="text-white text-sm" />
                </div>
              )}
              {/* <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white">
                <FaGoogle className="text-white text-xs" />
              </div> */}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold text-[#2C1810]">
                  {user.name}
                </h2>
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                  Active
                </span>
                <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                  <FaGoogle size={10} />
                  {user.provider}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FiMail className="text-[#8B6B3D]" size={14} />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone className="text-[#8B6B3D]" size={14} />
                  <span className="text-gray-400">{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-[#8B6B3D]" size={14} />
                  <span className="text-gray-400">{user.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-2 text-sm">
                <span className="text-gray-500">
                  Member since:{" "}
                  <span className="font-medium text-[#2C1810]">
                    {memberSince || "Just joined"}
                  </span>
                </span>
                <span className="text-gray-500">
                  Last active:{" "}
                  <span className="font-medium text-[#2C1810]">
                    {getCurrentDateTime()}
                  </span>
                </span>
                <span className="text-gray-500">
                  Favorite:{" "}
                  <span className="font-medium text-[#C49B5C]">
                    {user.favoriteCategory}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#2C1810]">
                  {user.totalOrders}
                </div>
                <div className="text-xs text-gray-500">Total Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#2C1810]">
                  {user.totalSpent}
                </div>
                <div className="text-xs text-gray-500">Total Spent</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2 space-y-6">
    {/* Order History */}
    <div className="bg-white rounded-xl border border-[#d4c5a9]/30 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] p-2 rounded-lg">
            <FiShoppingCart className="text-white text-lg" />
          </div>
          <h2 className="text-lg font-semibold text-[#2C1810]">
            Order History
          </h2>
          <span className="bg-[#f8f3ea] px-2 py-0.5 rounded-full text-sm font-medium text-[#8B6B3D] border border-[#d4c5a9]/30">
            0 orders
          </span>
        </div>
      </div>
      <div className="text-center py-12">
        <div className="bg-gradient-to-r from-[#C49B5C]/10 to-[#8B6B3D]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#C49B5C]/30">
          <FiBox className="text-4xl text-[#C49B5C]" />
        </div>
        <h3 className="text-lg font-medium text-[#2C1810] mb-2">No orders yet</h3>
        <p className="text-sm text-gray-500 mb-4">
          Start shopping to see your orders here
        </p>
        <Link
          href="/saree"
          className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          Start Shopping
          <FiArrowUp className="rotate-45" />
        </Link>
      </div>
    </div>

    {/* Wishlist */}
    <div className="bg-white rounded-xl border border-[#d4c5a9]/30 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] p-2 rounded-lg">
            <FiHeart className="text-white text-lg" />
          </div>
          <h2 className="text-lg font-semibold text-[#2C1810]">
            Wishlist
          </h2>
          <span className="bg-[#f8f3ea] px-2 py-0.5 rounded-full text-sm font-medium text-[#8B6B3D] border border-[#d4c5a9]/30">
            0 items
          </span>
        </div>
      </div>
      <div className="text-center py-12">
        <div className="bg-gradient-to-r from-[#C49B5C]/10 to-[#8B6B3D]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#C49B5C]/30">
          <FiHeart className="text-4xl text-[#C49B5C]" />
        </div>
        <h3 className="text-lg font-medium text-[#2C1810] mb-2">
          Wishlist is empty
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Save your favorite items here
        </p>
        <Link
          href="/saree"
          className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          Explore Products
          <FiArrowUp className="rotate-45" />
        </Link>
      </div>
    </div>
  </div>

  <div className="lg:col-span-1 space-y-6">
    {/* Shopping Cart */}
    <div className="bg-white rounded-xl border border-[#d4c5a9]/30 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] p-2 rounded-lg">
            <FaShoppingCart className="text-white text-lg" />
          </div>
          <h2 className="text-lg font-semibold text-[#2C1810]">
            Shopping Cart
          </h2>
          <span className="bg-[#f8f3ea] px-2 py-0.5 rounded-full text-sm font-medium text-[#8B6B3D] border border-[#d4c5a9]/30">
            0 items
          </span>
        </div>
      </div>
      <div className="text-center py-12">
        <div className="bg-gradient-to-r from-[#C49B5C]/10 to-[#8B6B3D]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#C49B5C]/30">
          <FaShoppingCart className="text-4xl text-[#C49B5C]" />
        </div>
        <h3 className="text-lg font-medium text-[#2C1810] mb-2">
          Cart is empty
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Add items to your cart
        </p>
        <Link
          href="/saree"
          className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          Start Shopping
          <FiArrowUp className="rotate-45" />
        </Link>
      </div>
    </div>

    {/* Activity Summary */}
    <div className="bg-white rounded-xl border border-[#d4c5a9]/30 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] p-2 rounded-lg">
          <FiAward className="text-white text-lg" />
        </div>
        <h2 className="text-lg font-semibold text-[#2C1810]">
          Activity Summary
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-r from-[#C49B5C]/5 to-[#8B6B3D]/5 p-3 rounded-lg text-center border border-[#C49B5C]/20 hover:border-[#C49B5C]/50 transition-colors">
          <div className="text-2xl font-bold text-[#8B6B3D]">0</div>
          <div className="text-xs text-gray-500">Total Orders</div>
        </div>
        <div className="bg-gradient-to-r from-[#C49B5C]/5 to-[#8B6B3D]/5 p-3 rounded-lg text-center border border-[#C49B5C]/20 hover:border-[#C49B5C]/50 transition-colors">
          <div className="text-2xl font-bold text-[#8B6B3D]">0</div>
          <div className="text-xs text-gray-500">Wishlist Items</div>
        </div>
        <div className="bg-gradient-to-r from-[#C49B5C]/5 to-[#8B6B3D]/5 p-3 rounded-lg text-center border border-[#C49B5C]/20 hover:border-[#C49B5C]/50 transition-colors">
          <div className="text-2xl font-bold text-[#8B6B3D]">0</div>
          <div className="text-xs text-gray-500">Cart Items</div>
        </div>
        <div className="bg-gradient-to-r from-[#C49B5C]/5 to-[#8B6B3D]/5 p-3 rounded-lg text-center border border-[#C49B5C]/20 hover:border-[#C49B5C]/50 transition-colors">
          <div className="text-2xl font-bold text-[#8B6B3D]">0</div>
          <div className="text-xs text-gray-500">Reviews Given</div>
        </div>
      </div>
    </div>
  </div>
</div>

        <div className="mt-8 pt-6 border-t border-[#d4c5a9]/30 flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-[#8B6B3D]" size={14} />
            <span>All data is secure and private</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Last updated: {new Date().toLocaleString("en-IN")}</span>
            {/* <span className="w-1 h-1 bg-gray-300 rounded-full"></span> */}
            <span className="text-[#C49B5C]">● System operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}