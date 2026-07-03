"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Popup from "@/component/pop_up";
import CurrencyPrice from "../../../component/CurrencyPrice";
import { useCurrency } from "@/app/context/CurrencyContext";
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  RefreshCw,
  MessageCircle,
} from "lucide-react";
import suitsData from "@/component/data/data.json";

type SuitData = {
  id: number;
  name?: string;
  image?: string;
  discount?: number;
  category?: string;
  rating?: number;
  reviews?: number;
  price?: number;
  aprice?: number;
  "Base color"?: string;
  Motifs?: string[];
  "Border Detailing"?: string[];
  "Contrast Play"?: string;
  [key: string]: unknown;
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { convertPrice, currency, symbol, isLoading: currencyLoading } = useCurrency();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [product, setProduct] = useState<SuitData | null>(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Parse suits data - merge both suit and suits arrays
  const suits = useMemo(() => {
    let allSuits: SuitData[] = [];
    
    try {
      console.log("Raw suitsData:", suitsData);
      
      // Check if suitsData has 'suit' array
      if (suitsData && typeof suitsData === 'object') {
        // Get 'suit' array
        if (Array.isArray(suitsData.suit)) {
          allSuits = [...allSuits, ...suitsData.suit];
        }
        
        // Get 'suits' array
        if (Array.isArray(suitsData.suits)) {
          allSuits = [...allSuits, ...suitsData.suits];
        }
        
        console.log("All suits merged:", allSuits);
      }
    } catch (error) {
      console.error("Error loading suits data:", error);
    }
    
    return allSuits;
  }, []);

  // Load wishlist from localStorage
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

  // Find product
  useEffect(() => {
    if (params.id && suits.length > 0) {
      const id = parseInt(params.id as string);
      console.log("Looking for product with ID:", id);
      console.log("Available suits:", suits.map(s => ({ id: s.id, name: s.name })));
      
      const foundProduct = suits.find((s) => s.id === id);
      console.log("Found product:", foundProduct);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        console.warn(`Product with ID ${id} not found`);
        setProduct(null);
      }
      setLoading(false);
    } else if (params.id && suits.length === 0) {
      setLoading(false);
      setProduct(null);
    } else {
      setLoading(false);
    }
  }, [params.id, suits]);

  // Toggle wishlist
  const toggleWishlist = (id: number) => {
    const isInWishlist = wishlist.includes(id);
    setWishlist((prev) =>
      isInWishlist ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setPopupMessage(isInWishlist ? "Removed from Wishlist ❤️" : "Added to Wishlist ❤️");
    setShowPopup(true);
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    setPopupMessage("Added to Cart 🛍️");
    setShowPopup(true);
  };

  // Handle mouse move for zoom effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = imageContainerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    container.style.setProperty("--mouse-x", x + "%");
    container.style.setProperty("--mouse-y", y + "%");
  };

  if (loading || currencyLoading) {
    return (
      <div className="min-h-screen bg-[#faf6ef] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#C49B5C] border-t-transparent"></div>
          <p className="mt-4 text-[#2C1810] font-medium">
            {currencyLoading ? "Loading currency rates..." : "Loading product details..."}
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf6ef] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-[#2C1810] mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-6">The suit you{`'`}re looking for doesn{`'`}t exist.</p>
          <Link
            href="/suits"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C49B5C] text-white rounded-full hover:bg-[#8B6B3D] transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlist.includes(product.id);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#faf6ef] via-white to-[#faf6ef] pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[#2C1810] hover:text-[#C49B5C] transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </button>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Image with Zoom */}
          <div className="space-y-4">
            <div 
              ref={imageContainerRef}
              className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-xl group"
              onMouseMove={handleMouseMove}
            >
              {product.image ? (
                <>
                  {/* Main Image */}
                  <Image
                    src={product.image}
                    alt={product.name || "Suit"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />

                  {/* Zoom Lens Effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle 120px at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                        transparent 0%, 
                        transparent 35%, 
                        rgba(0,0,0,0.2) 40%,
                        rgba(0,0,0,0.2) 100%)`,
                    }}
                  />

                  {/* Zoomed Image */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      clipPath: `circle(120px at var(--mouse-x, 50%) var(--mouse-y, 50%))`,
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name || "Suit"}
                      fill
                      className="object-cover scale-[2.5]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{
                        objectPosition: `${100 - parseFloat(getComputedStyle(imageContainerRef.current || document.createElement('div')).getPropertyValue('--mouse-x') || '50')}% ${100 - parseFloat(getComputedStyle(imageContainerRef.current || document.createElement('div')).getPropertyValue('--mouse-y') || '50')}%`,
                      }}
                    />
                  </div>

                  {/* Zoom Hint */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <span>🔍</span>
                    Hover to zoom
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}

              {/* Discount Badge */}
              {product.discount && product.discount > 0 && (
                <span className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white text-sm font-semibold rounded-full shadow-lg z-20">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex-1 px-4 py-3 rounded-xl transition-all group flex items-center justify-center gap-2 ${
                    isInWishlist
                      ? "bg-red-50 hover:bg-red-100 border-2 border-red-300"
                      : "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-[#C49B5C]"
                  }`}
                >
                  <Heart
                    className={`transition-colors ${
                      isInWishlist ? "fill-red-500 text-red-500" : "text-[#2C1810] group-hover:text-red-500"
                    }`}
                    size={20}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isInWishlist ? "text-red-500" : "text-[#2C1810]"
                    }`}
                  >
                    {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                  </span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] hover:from-[#8B6B3D] hover:to-[#6B4F2E] text-white rounded-xl transition-all group flex items-center justify-center gap-2 shadow-md hover:shadow-xl"
                >
                  <ShoppingBag size={20} />
                  <span className="text-sm font-medium">Add to Cart</span>
                </button>
              </div>

              <Link
                href="/contact"
                className="w-full px-4 py-3 bg-[#2C1810] hover:bg-[#1a0f0a] text-white rounded-xl transition-all group flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                <span className="text-sm font-medium">Contact for Customization</span>
                <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Category */}
            {product.category && (
              <span className="inline-block px-4 py-1.5 bg-[#C49B5C]/10 text-[#C49B5C] text-sm font-medium rounded-full">
                {product.category}
              </span>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#2C1810] leading-tight">
              {product.name || "Unnamed Suit"}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <Star className="fill-[#C49B5C] text-[#C49B5C]" size={20} />
                <span className="text-lg font-semibold text-[#2C1810] ml-1">
                  {product.rating || 4.5}
                </span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500 text-sm">
                {product.reviews || 100} Reviews
              </span>
            </div>

            {/* Price - Updated with Currency */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Main Price */}
              <CurrencyPrice 
                priceINR={product.price || product.aprice || 0} 
                className="text-4xl font-bold text-[#2C1810]"
                size="xl"
              />
              
              {/* Original Price (MRP) */}
              {product.aprice && product.aprice > (product.price || 0) && (
                <>
                  <CurrencyPrice 
                    priceINR={product.aprice} 
                    className="text-lg text-gray-400 line-through"
                    size="md"
                  />
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                    Save{" "}
                    {Math.round(
                      ((product.aprice - (product.price || 0)) / product.aprice) *
                        100
                    )}
                    %
                  </span>
                </>
              )}
            </div>

            {/* Currency Info - Show original INR when in different currency */}
            {currency !== 'INR' && (
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-xl">
                <span>≈</span>
                <span>₹{((product.price || product.aprice || 0)).toLocaleString('en-IN')}</span>
                <span className="text-xs text-gray-400">(Original Price in INR)</span>
              </div>
            )}

            {/* Product Details */}
            <div className="bg-white p-5 rounded-2xl shadow-sm space-y-4">
              {product["Base color"] && (
                <div>
                  <h3 className="text-sm font-semibold text-[#2C1810] mb-1">
                    Base Color
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {product["Base color"]}
                  </p>
                </div>
              )}

              {product.Motifs && product.Motifs.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-[#2C1810] mb-2">
                    Motifs & Design
                  </h3>
                  <ul className="space-y-2">
                    {product.Motifs.map((motif: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span className="text-[#C49B5C] mt-1">✦</span>
                        <span>{motif}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product["Border Detailing"] &&
                product["Border Detailing"].length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-[#2C1810] mb-2">
                      Border Detailing
                    </h3>
                    <ul className="space-y-2">
                      {product["Border Detailing"].map(
                        (detail: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <span className="text-[#C49B5C] mt-1">◆</span>
                            <span>{detail}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {product["Contrast Play"] && (
                <div>
                  <h3 className="text-sm font-semibold text-[#2C1810] mb-1">
                    Contrast Play
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {product["Contrast Play"]}
                  </p>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#C49B5C]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="text-[#C49B5C]" size={20} />
                </div>
                <p className="text-xs font-medium text-[#2C1810]">Free Shipping</p>
                <p className="text-[10px] text-gray-500">Above ₹999</p>
              </div>
              <div className="text-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#C49B5C]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <RefreshCw className="text-[#C49B5C]" size={20} />
                </div>
                <p className="text-xs font-medium text-[#2C1810]">Easy Returns</p>
                <p className="text-[10px] text-gray-500">7 days policy</p>
              </div>
              <div className="text-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#C49B5C]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="text-[#C49B5C]" size={20} />
                </div>
                <p className="text-xs font-medium text-[#C49B5C]">Authentic</p>
                <p className="text-[10px] text-gray-500">100% genuine</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      <Popup 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)}
        message={popupMessage}
      />
    </main>
  );
}