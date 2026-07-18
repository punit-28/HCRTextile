"use client";
import { useState, useMemo, } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, ShoppingBag, RefreshCw, ArrowLeft } from "lucide-react";
import suitsData from "@/component/data/data.json";
import CurrencyPrice from "../../component/CurrencyPrice";
import { useCurrency } from "@/app/context/CurrencyContext";

// Better blur data URL with actual color
const BLUR_DATA_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100%25' height='100%25' fill='%23f8f3ea'/%3E%3C/svg%3E";

type SareeData = {
  id: string;
  name: string; // Make required
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
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const { currency } = useCurrency();

  // Get all sarees from JSON with proper typing
  const sarees = useMemo(() => {
    return (suitsData?.saree as SareeData[])?.filter(
      (item) => item && item.id
    ) || [];
  }, []);
  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  if (!sarees.length) {
    return <EmptyState />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#faf6ef] via-white to-[#faf6ef] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C1810] mb-4">
            Our <span className="text-[#C49B5C]">Saree</span> Collection
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our exquisite collection of handcrafted sarees, perfect for
            every occasion.
          </p>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sarees.map((saree, index) => {
            const isLoaded = loadedImages.has(saree.id);
            const isPriority = index < 4; // First 4 images are priority
            const price = saree.price || saree.aprice || 0;
            const originalPrice = saree.aprice || saree.price || 0;
            const hasDiscount = saree.discount && saree.discount > 0;

            return (
              <Link
                key={saree.id}
                href={`/saree/${saree.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="relative w-full bg-[#f8f3ea] overflow-hidden"
                  style={{ aspectRatio: "1365/2048" }}
                >
                  {/* Skeleton Loader with shimmer effect */}
                  {!isLoaded && (
                    <div className="absolute inset-0 bg-[#f8f3ea]">
                      <div className="w-full h-full bg-gradient-to-r from-[#f8f3ea] via-[#ede5d8] to-[#f8f3ea] bg-[length:200%_100%] animate-shimmer"></div>
                    </div>
                  )}

                  {saree.mainImage ? (
                    <Image
                      src={saree.mainImage}
                      alt={saree.name || "Saree"}
                      fill
                      priority={isPriority}
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className={`object-cover group-hover:scale-105 transition-all duration-500 ${
                        isLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => handleImageLoad(saree.id)}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={90}
                      loading={isPriority ? "eager" : "lazy"}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400 text-sm">No Image</span>
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
                  {hasDiscount && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white text-xs font-semibold rounded-full shadow-md">
                      {saree.discount}% OFF
                    </span>
                  )}

                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white/90 backdrop-blur-sm text-[#2C1810] px-4 py-2 rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                      Quick View
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-[#2C1810] text-sm line-clamp-2 mb-1 group-hover:text-[#C49B5C] transition-colors">
                    {saree.name || "Unnamed Saree"}
                  </h3>

                  {saree.fabric && (
                    <p className="text-xs text-gray-500 mb-1 capitalize">
                      {saree.fabric}
                    </p>
                  )}

                  {/* Reviews */}
                  {saree.reviews && saree.reviews > 0 && (
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.round(saree.rating || 0)
                                ? "fill-[#C49B5C] text-[#C49B5C]"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({saree.reviews} {" "} reviews)
                      </span>
                    </div>
                  )}

                  {/* Price Section */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CurrencyPrice
                        priceINR={price}
                        className="text-lg font-bold text-[#2C1810]"
                        size="md"
                      />

                      {originalPrice > price && (
                        <CurrencyPrice
                          priceINR={originalPrice}
                          className="text-sm text-gray-400 line-through"
                          size="sm"
                        />
                      )}
                    </div>

                    {/* Rating Summary */}
                    {saree.rating && (
                      <div className="flex items-center gap-1 bg-[#faf6ef] px-2 py-1 rounded-full">
                        <Star className="fill-[#C49B5C] text-[#C49B5C]" size={12} />
                        <span className="text-xs font-medium text-[#2C1810]">
                          {saree.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Show INR price if different currency */}
                  {currency !== "INR" && (
                    <div className="text-[10px] text-gray-400 mt-1">
                      ₹{price.toLocaleString("en-IN")} INR
                    </div>
                  )}

                  {/* Add to Cart Button */}
                  <button className="w-full mt-3 py-2 bg-[#C49B5C] hover:bg-[#8B6B3D] text-white text-sm font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-sm hover:shadow-md">
                    <ShoppingBag size={16} className="group-hover/btn:scale-110 transition-transform" />
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf6ef] via-white to-[#faf6ef] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-[#C49B5C]/10 rounded-full flex items-center justify-center">
            <ShoppingBag className="text-[#C49B5C]" size={40} />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-[#2C1810] mb-2">
          No Sarees Found
        </h2>

        <p className="text-gray-500 text-sm md:text-base mb-6">
          We&apos;re curating our latest collection.
          <br />
          <span className="text-[#C49B5C] font-medium">Check back soon!</span>
        </p>

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