"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, ShoppingBag } from "lucide-react";
import suitsData from "@/component/data/data.json";
import CurrencyPrice from "../../component/CurrencyPrice";
import { useCurrency } from "@/app/context/CurrencyContext";

// Type definition directly in the file
type DupattaData = {
  id: number;
  name?: string;
  image?: string;
  discount?: number;
  category?: string;
  rating?: number;
  reviews?: number;
  price?: number;
  aprice?: number;
  fabric?: string;
  [key: string]: unknown;
};

export default function DupattaPage() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { isLoading: currencyLoading } = useCurrency();

  // Get dupattas from JSON
  const dupattas = useMemo(() => {
    if (suitsData && typeof suitsData === 'object' && Array.isArray(suitsData.dupatta)) {
      return suitsData.dupatta as DupattaData[];
    }
    return [];
  }, []);

  // Load wishlist
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Error loading wishlist:", e);
      }
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Toggle wishlist
  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newWishlist = wishlist.includes(id)
      ? wishlist.filter((item) => item !== id)
      : [...wishlist, id];
    setWishlist(newWishlist);
  };

  // Loading state
  if (currencyLoading) {
    return (
      <div className="min-h-screen bg-[#faf6ef] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#C49B5C] border-t-transparent"></div>
          <p className="mt-4 text-[#2C1810] font-medium">Loading currency rates...</p>
        </div>
      </div>
    );
  }

  if (dupattas.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf6ef] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🧣</div>
          <h2 className="text-2xl font-bold text-[#2C1810] mb-2">No Dupattas Found</h2>
          <p className="text-gray-500">Check back later for new collections.</p>
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
            Our <span className="text-[#C49B5C]">Dupatta</span> Collection
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our exquisite collection of handcrafted dupattas, perfect for every occasion.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dupattas.map((dupatta) => (
            <Link
              key={dupatta.id}
              href={`/dupatta/${dupatta.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                {dupatta.image ? (
                  <Image
                    src={dupatta.image}
                    alt={dupatta.name || "Dupatta"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                
                {/* Wishlist Button */}
                <button
                  title="Add to wishlist"
                  onClick={(e) => toggleWishlist(dupatta.id, e)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-md z-10"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      wishlist.includes(dupatta.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600 hover:text-red-500"
                    }`}
                  />
                </button>

                {/* Discount Badge */}
                {dupatta.discount && dupatta.discount > 0 && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white text-xs font-semibold rounded-full">
                    {dupatta.discount}% OFF
                  </span>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-[#2C1810] text-sm line-clamp-2 mb-1">
                  {dupatta.name || "Unnamed Dupatta"}
                </h3>
                
                {dupatta.fabric && (
                  <p className="text-xs text-gray-500 mb-2">{dupatta.fabric}</p>
                )}

                {/* Price Section - Updated with Currency */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Main Price */}
                    <CurrencyPrice 
                      priceINR={dupatta.price || dupatta.aprice || 0} 
                      className="text-lg font-bold text-[#2C1810]"
                      size="md"
                    />
                    
                    {/* Original Price (MRP) */}
                    {dupatta.aprice && dupatta.aprice > (dupatta.price || 0) && (
                      <CurrencyPrice 
                        priceINR={dupatta.aprice} 
                        className="text-sm text-gray-400 line-through"
                        size="sm"
                      />
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star className="fill-[#C49B5C] text-[#C49B5C]" size={14} />
                    <span className="text-sm text-gray-600">{dupatta.rating || 4.5}</span>
                  </div>
                </div>

                {/* Original INR Price Hint (when in different currency) */}
                <OriginalPriceHint priceINR={dupatta.price || dupatta.aprice || 0} />

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

// Helper component to show original INR price
function OriginalPriceHint({ priceINR }: { priceINR: number }) {
  const { currency } = useCurrency();
  
  // Only show hint if currency is not INR
  if (currency === 'INR') return null;
  
  return (
    <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
      <span>≈</span>
      <span>₹{priceINR.toLocaleString('en-IN')}</span>
      <span className="text-[10px]">(INR)</span>
    </div>
  );
}