"use client";
import { useState, useEffect, useMemo } from "react";
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
  Ruler,
  Layers,
} from "lucide-react";
import suitsData from "@/component/data/data.json";

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
  "Base color"?: string;
  Motifs?: string[];
  "Border Detailing"?: string[];
  "Contrast Play"?: string;
  fabric?: string;
  length?: string;
  width?: string;
  [key: string]: unknown;
};

export default function DupattaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { currency, isLoading: currencyLoading } = useCurrency();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [product, setProduct] = useState<DupattaData | null>(null);
  const [loading, setLoading] = useState(true);

  // Parse dupatta data from JSON
  const dupattas = useMemo(() => {
    let allDupattas: DupattaData[] = [];
    
    try {
      console.log("Raw suitsData:", suitsData);
      
      // Check if suitsData has 'dupatta' array
      if (suitsData && typeof suitsData === 'object') {
        if (Array.isArray(suitsData.dupatta)) {
          allDupattas = suitsData.dupatta;
          console.log("Dupattas found:", allDupattas);
        } else {
          console.warn("No dupatta array found in data");
        }
      }
    } catch (error) {
      console.error("Error loading dupatta data:", error);
    }
    
    return allDupattas;
  }, []);

  // Find product
  useEffect(() => {
    if (params.id && dupattas.length > 0) {
      const id = parseInt(params.id as string);
      console.log("Looking for dupatta with ID:", id);
      console.log("Available dupattas:", dupattas.map(d => ({ id: d.id, name: d.name })));
      
      const foundProduct = dupattas.find((d) => d.id === id);
      console.log("Found product:", foundProduct);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        console.warn(`Dupatta with ID ${id} not found`);
        setProduct(null);
      }
      setLoading(false);
    } else if (params.id && dupattas.length === 0) {
      setLoading(false);
      setProduct(null);
    } else {
      setLoading(false);
    }
  }, [params.id, dupattas]);

  // Handle button clicks - just show popup
  const handleWishlistClick = () => {
    setPopupMessage("Added to Wishlist ❤️");
    setShowPopup(true);
  };

  const handleAddToCart = () => {
    setPopupMessage("Added to Cart 🛍️");
    setShowPopup(true);
  };

  if (loading || currencyLoading) {
    return (
      <div className="min-h-screen bg-[#faf6ef] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#C49B5C] border-t-transparent"></div>
          <p className="mt-4 text-[#2C1810] font-medium">
            {currencyLoading ? "Loading currency rates..." : "Loading dupatta details..."}
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
          <h2 className="text-2xl font-bold text-[#2C1810] mb-2">Dupatta Not Found</h2>
          <p className="text-gray-500 mb-6">The dupatta you{`'`}re looking for doesn{`'`}t exist.</p>
          <Link
            href="/dupatta"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C49B5C] text-white rounded-full hover:bg-[#8B6B3D] transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

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
          {/* Left - Image */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-xl">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name || "Dupatta"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
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
                  onClick={handleWishlistClick}
                  className="flex-1 px-4 py-3 bg-white hover:bg-gray-50 rounded-xl transition-all group flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-[#C49B5C]"
                >
                  <Heart className="text-[#2C1810] group-hover:text-red-500 transition-colors" size={20} />
                  <span className="text-sm font-medium text-[#2C1810] group-hover:text-red-500 transition-colors">
                    Add to Wishlist
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
              {product.name || "Unnamed Dupatta"}
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

            {/* Size & Fabric Info */}
            <div className="grid grid-cols-3 gap-3">
              {product.fabric && (
                <div className="bg-white p-3 rounded-xl shadow-sm text-center">
                  <div className="w-8 h-8 bg-[#C49B5C]/10 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Layers className="text-[#C49B5C]" size={16} />
                  </div>
                  <p className="text-xs font-medium text-[#2C1810]">Fabric</p>
                  <p className="text-[10px] text-gray-500">{product.fabric}</p>
                </div>
              )}
              {product.length && (
                <div className="bg-white p-3 rounded-xl shadow-sm text-center">
                  <div className="w-8 h-8 bg-[#C49B5C]/10 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Ruler className="text-[#C49B5C]" size={16} />
                  </div>
                  <p className="text-xs font-medium text-[#2C1810]">Length</p>
                  <p className="text-[10px] text-gray-500">{product.length}</p>
                </div>
              )}
              {product.width && (
                <div className="bg-white p-3 rounded-xl shadow-sm text-center">
                  <div className="w-8 h-8 bg-[#C49B5C]/10 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Ruler className="text-[#C49B5C]" size={16} />
                  </div>
                  <p className="text-xs font-medium text-[#2C1810]">Width</p>
                  <p className="text-[10px] text-gray-500">{product.width}</p>
                </div>
              )}
            </div>

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