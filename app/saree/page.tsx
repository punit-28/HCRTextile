"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, ShoppingBag, RefreshCw, ArrowLeft } from "lucide-react";
import suitsData from "@/component/data/data.json";
import CurrencyPrice from "../../component/CurrencyPrice";
import { useCurrency } from "@/app/context/CurrencyContext";

type SareeData = {
  id: number;
  name?: string;
  mainImage?: string;
  images?: string[];
  discount?: number;
  category?: string;
  rating?: number;
  reviews?: number;
  price?: number;
  aprice?: number;
  fabric?: string;
};

export default function SareePage() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { currency } = useCurrency();

  // Get all sarees from JSON
  const sarees = useMemo(() => {
    return (suitsData?.saree as SareeData[]) || [];
  }, []);

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  if (!sarees.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#faf6ef] via-white to-[#faf6ef] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-[#C49B5C]/10 rounded-full flex items-center justify-center">
              <ShoppingBag className="text-[#C49B5C]" size={40} />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#2C1810] mb-2">
            No Sarees Found
          </h2>

          {/* Description */}
          <p className="text-gray-500 text-sm md:text-base mb-6">
            We{"'"}re curating our latest collection.
            <br />
            <span className="text-[#C49B5C] font-medium">Check back soon!</span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-[#C49B5C] text-white rounded-full hover:bg-[#8B6B3D] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group text-sm"
            >
              <RefreshCw
                size={16}
                className="group-hover:rotate-180 transition-transform duration-500"
              />
              Refresh
            </button>
            <Link
              href="/"
              className="px-6 py-2.5 bg-white text-[#2C1810] rounded-full hover:bg-gray-50 transition-all shadow-md hover:shadow-lg border border-gray-200 flex items-center justify-center gap-2 text-sm"
            >
              <ArrowLeft size={16} />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#faf6ef] via-white to-[#faf6ef] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C1810] mb-4">
            Our <span className="text-[#C49B5C]">Saree</span> Collection
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our exquisite collection of handcrafted sarees, perfect for
            every occasion.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sarees.map((saree) => (
            <Link
              key={saree.id}
              href={`/saree/${saree.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="relative w-full bg-gray-50"
                style={{ aspectRatio: "1365/2048" }}
              >
                {saree.mainImage ? (
                  <Image
                    src={saree.mainImage}
                    alt={saree.name || "Saree"}
                    fill
                    priority={sarees.indexOf(saree) < 4}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={90}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                {/* Wishlist Button */}
                <button
                  onClick={(e) => toggleWishlist(saree.id, e)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-md z-10"
                  aria-label="Toggle wishlist"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      wishlist.includes(saree.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600 hover:text-red-500"
                    }`}
                  />
                </button>

                {/* Discount Badge */}
                {saree.discount && saree.discount > 0 && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white text-xs font-semibold rounded-full">
                    {saree.discount}% OFF
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-[#2C1810] text-sm line-clamp-2 mb-1">
                  {saree.name || "Unnamed Saree"}
                </h3>

                {saree.fabric && (
                  <p className="text-xs text-gray-500 mb-2">{saree.fabric}</p>
                )}

                {/* Price Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <CurrencyPrice
                      priceINR={saree.price || saree.aprice || 0}
                      className="text-lg font-bold text-[#2C1810]"
                      size="md"
                    />

                    {saree.aprice && saree.aprice > (saree.price || 0) && (
                      <CurrencyPrice
                        priceINR={saree.aprice}
                        className="text-sm text-gray-400 line-through"
                        size="sm"
                      />
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star className="fill-[#C49B5C] text-[#C49B5C]" size={14} />
                    <span className="text-sm text-gray-600">
                      {saree.rating || 4.5}
                    </span>
                  </div>
                </div>

                {/* Show INR price if different currency */}
                {currency !== "INR" && (
                  <div className="text-[10px] text-gray-400 mt-1">
                    ₹
                    {(saree.price || saree.aprice || 0).toLocaleString("en-IN")}{" "}
                    INR
                  </div>
                )}

                <button className="w-full mt-3 py-2 bg-[#C49B5C] hover:bg-[#8B6B3D] text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                  <ShoppingBag size={16} />
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
