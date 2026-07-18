"use client";
import Link from "next/link";
import {  Home, Sparkles, ShoppingBag, ChevronRight } from "lucide-react";

export default function KurtiPage() {
  return (
    <main className="min-h-screen bg-[#faf6ef] flex flex-col items-center justify-center pt-24 pb-12 px-4">
      <div className="w-full max-w-3xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#d4c5a9]/20 p-6 sm:p-8 md:p-10 mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <Sparkles size={20} className="text-[#C49B5C]" />
            <span className="text-[#2C1810] font-semibold text-base sm:text-lg">
              Custom Made Just for You
            </span>
          </div>

          <p className="text-gray-600 text-center text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
            While we{"'"}re preparing model photos for our collection, 
            <span className="text-[#C49B5C] font-semibold block mt-1">
              you can still place your order!
            </span>
          </p>

          <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 bg-[#faf6ef] py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl">
            <ShoppingBag size={16} className="text-[#C49B5C]" />
            <span className="font-medium">Every kurti is stitched fresh on order</span>
          </div>

          <div className="mt-4 sm:mt-5 p-3 sm:p-4 bg-amber-50/80 rounded-xl border border-amber-200/30">
            <p className="text-[#2C1810] text-xs sm:text-sm text-center">
              📸 <span className="font-semibold">Model photos coming soon</span> — 
              but you can preview the fabric and design samples before ordering!
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#C49B5C] text-white rounded-xl hover:bg-[#8B6B3D] transition-all duration-300 font-semibold shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            <ShoppingBag size={18} />
            Order Now
            <ChevronRight size={16} />
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-[#2C1810] rounded-xl hover:bg-[#f8f3ea] transition-all duration-300 font-medium border-2 border-[#d4c5a9]/30 hover:border-[#C49B5C]/50 text-sm sm:text-base"
          >
            <Home size={18} />
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}