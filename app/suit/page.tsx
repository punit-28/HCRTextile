"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, Heart, ShoppingBag } from "lucide-react";
import suitsData from "@/component/data/data.json";
import Popup from "@/component/pop_up";
import CurrencyPrice from "../../component/CurrencyPrice";
import { useCurrency } from "@/app/context/CurrencyContext";

interface SuitData {
  id: number;
  name: string;
  "Base color": string;
  Motifs: string[];
  "Border Detailing": string[];
  "Contrast Play": string;
  aprice: number;
  price: number;
  discount: number;
  image: string;
  category: string;
  rating: number;
  reviews?: number;
}

// Function to render product grid - accepts suits array as parameter
const renderProductGrid = (
  suits: SuitData[],
  wishlist: number[],
  toggleWishlist: (id: number) => void,
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>,
  collectionType?: string,
) => {
  if (!suits || suits.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl shadow-lg">
        <div className="text-6xl mb-4">👗</div>
        <h3 className="text-xl font-semibold text-[#2C1810] mb-2">
          No Products Available
        </h3>
        <p className="text-gray-500 text-sm">
          Check back soon for our new collection
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {suits.map((suit, index) => (
        <div
          key={`${collectionType || "suit"}-${suit.id}`}
          className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Image Container */}
          <div className="relative overflow-hidden bg-[#f8f3ea] aspect-square">
            {suit.image ? (
              <Image
                src={suit.image}
                alt={suit.name || "Suit"}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-400">No Image</span>
              </div>
            )}

            {/* Discount Badge */}
            {suit.discount && suit.discount > 0 && (
              <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white text-xs font-semibold rounded-full shadow-lg">
                {suit.discount}% OFF
              </span>
            )}

            {/* Wishlist Button */}
            <button
              title="Add to wishlist"
              onClick={() => toggleWishlist(suit.id)}
              className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <Heart
                className={`transition-colors ${
                  wishlist.includes(suit.id)
                    ? "fill-red-500 text-red-500"
                    : "text-[#2C1810] hover:text-red-500"
                }`}
                size={18}
              />
            </button>

            {/* Quick Add Button - Appears on Hover */}
            <button
              onClick={() => setShowPopup(true)}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-white/95 hover:bg-[#C49B5C] text-[#2C1810] hover:text-white rounded-full text-sm font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag size={16} />
                Add to Cart
              </div>
            </button>
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-2">
            <Link href={`/product/${suit.id}`}>
              <h3 className="font-semibold text-[#2C1810] hover:text-[#8B6B3D] transition-colors text-base leading-tight line-clamp-1">
                {suit.name || "Unnamed Suit"}
              </h3>
            </Link>

            {/* Category Tag */}
            {suit.category && (
              <span className="inline-block text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                {suit.category}
              </span>
            )}

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="fill-[#C49B5C] text-[#C49B5C]" size={14} />
                <span className="text-sm font-medium text-[#2C1810] ml-1">
                  {suit.rating || 4.5}
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {suit.reviews || 0} Reviews
              </span>
            </div>

            {/* Price - Updated with Currency Component */}
            <div className="flex items-center gap-2 pt-1">
              {/* Main Price with Currency Conversion */}
              <CurrencyPrice 
                priceINR={suit.price || suit.aprice || 0} 
                className="text-xl font-bold text-[#2C1810]"
                size="lg"
              />
              
              {/* Original Price (MRP) */}
              {suit.aprice && suit.aprice > (suit.price || 0) && (
                <>
                  <CurrencyPrice 
                    priceINR={suit.aprice} 
                    className="text-sm text-gray-400 line-through"
                    size="sm"
                  />
                  <span className="text-xs text-green-600 font-semibold">
                    Save{" "}
                    {Math.round(
                      ((suit.aprice - (suit.price || 0)) / suit.aprice) * 100,
                    )}
                    %
                  </span>
                </>
              )}
            </div>

            {/* Optional: Show original INR price when in different currency */}
            <PriceWithCurrencyHint priceINR={suit.price || suit.aprice || 0} />
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper component to show currency hint
function PriceWithCurrencyHint({ priceINR }: { priceINR: number }) {
  const { currency, symbol, getConvertedValue } = useCurrency();
  
  // Only show hint if currency is not INR
  if (currency === 'INR') return null;
  
  const convertedValue = getConvertedValue(priceINR);
  
  return (
    <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
      <span>≈</span>
      <span>₹{priceINR.toLocaleString('en-IN')}</span>
      <span className="text-[10px">(Original Price)</span>
    </div>
  );
}

export default function SuitPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { isLoading } = useCurrency();

  // Parse data from JSON
  const chanderiSuits: SuitData[] = Array.isArray(suitsData.suit)
    ? suitsData.suit
    : [];
  const cottonSuits: SuitData[] = Array.isArray(suitsData.suits)
    ? suitsData.suits
    : [];

  // Toggle wishlist
  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#faf6ef] via-white to-[#faf6ef]">
      {/* Hero Section - Premium Minimal */}
      <section className="relative w-full mt-20 h-[100vh] md:h-[90vh] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-no-repeat bg-center"
            style={{
              backgroundImage: "url('/Suit_Page.png')",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundAttachment: "scroll",
              filter: "brightness(1.05) contrast(1.08) saturate(1.1)",
              transform: "scale(1.02)",
              transformOrigin: "center center",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center 60%, rgba(255,255,255,0.08), transparent 65%)",
              mixBlendMode: "screen",
              pointerEvents: "none",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#2C1810]/60 via-[#2C1810]/30 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-[#C49B5C]"></div>
                <span className="text-[#C49B5C] text-xs font-medium tracking-[0.3em] uppercase">
                  Luxury Collection
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.1] mb-6">
                <span className="font-serif italic">Timeless</span>
                <br />
                <span className="font-bold">Elegance</span>
              </h1>

              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl leading-relaxed">
                Exquisitely crafted suits where Indian heritage meets
                contemporary design.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-15 bg-gradient-to-t from-[#faf6ef] to-transparent"></div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-3 text-[#8B6B3D]">
              <div className="w-5 h-5 border-2 border-[#C49B5C] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Loading currency rates...</span>
            </div>
          </div>
        )}

        {/* Section 1 - Chanderi Suit Collection */}
        {chanderiSuits.length > 0 && (
          <>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-8 bg-[#C49B5C]"></div>
                <span className="text-[#C49B5C] text-xs font-medium tracking-[0.2em] uppercase">
                  Premium Collection
                </span>
                <div className="h-px w-8 bg-[#C49B5C]"></div>
              </div>

              <h2 className="text-3xl md:text-4xl font-light text-[#2C1810]">
                <span className="font-serif italic">Chanderi Suit</span> with
                Chanderi Dupatta
              </h2>

              <p className="text-gray-500 mt-2">
                Gracefully handcrafted for timeless elegance
              </p>
            </div>

            <section id="chanderi-collection">
              {renderProductGrid(
                chanderiSuits,
                wishlist,
                toggleWishlist,
                setShowPopup,
                "chanderi"
              )}
            </section>
          </>
        )}

        {/* Decorative Divider */}
        {chanderiSuits.length > 0 && cottonSuits.length > 0 && (
          <div className="my-16 flex items-center justify-center">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C49B5C] to-transparent"></div>
            <span className="px-6 text-[#C49B5C] text-xs font-medium tracking-[0.3em] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49B5C]"></span>
              New Arrivals
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49B5C]"></span>
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C49B5C] to-transparent"></div>
          </div>
        )}

        {/* Section 2 - Cotton Suit Collection */}
        {cottonSuits.length > 0 && (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-[#2C1810]">
                <span className="font-serif italic">Cotton Suit</span> with
                Jorjat Dupatta
              </h2>

              <p className="text-gray-500 mt-2">
                Lightweight and comfortable for everyday elegance
              </p>
            </div>

            <section id="cotton-collection">
              {renderProductGrid(
                cottonSuits,
                wishlist,
                toggleWishlist,
                setShowPopup,
                "cotton",
              )}
            </section>
          </>
        )}

        {/* Fallback when no data is available */}
        {chanderiSuits.length === 0 && cottonSuits.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <div className="text-7xl mb-4">👗</div>
            <h3 className="text-2xl font-semibold text-[#2C1810] mb-2">
              No Suits Available
            </h3>
            <p className="text-gray-500">
              Check back soon for our new collection
            </p>
          </div>
        )}
      </div>

      {/* Popup Component - Render here */}
      <Popup 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
      />
    </main>
  );
}