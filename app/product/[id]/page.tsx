"use client";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  id: string;
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

// Memoized Components
const FeatureCard = ({ icon: Icon, title, subtitle }: { 
  icon: React.ElementType; 
  title: string; 
  subtitle: string;
}) => (
  <div className="text-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="w-10 h-10 bg-[#C49B5C]/10 rounded-full flex items-center justify-center mx-auto mb-2">
      <Icon className="text-[#C49B5C]" size={20} />
    </div>
    <p className="text-xs font-medium text-[#2C1810]">{title}</p>
    <p className="text-[10px] text-gray-500">{subtitle}</p>
  </div>
);

const DetailSection = ({ title, items }: { title: string; items: string | string[] }) => {
  if (Array.isArray(items)) {
    return (
      <div>
        <h3 className="text-sm font-semibold text-[#2C1810] mb-2">{title}</h3>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-[#C49B5C] mt-1">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div>
      <h3 className="text-sm font-semibold text-[#2C1810] mb-1">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{items}</p>
    </div>
  );
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { currency, isLoading: currencyLoading } = useCurrency();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [product, setProduct] = useState<SuitData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWishlist, setIsWishlist] = useState(false);

  // Refs for zoom
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const zoomImageRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Memoized data
  const suits = useMemo(() => {
    const allSuits: SuitData[] = [];
    if (Array.isArray(suitsData?.suit)) allSuits.push(...suitsData.suit);
    if (Array.isArray(suitsData?.suits)) allSuits.push(...suitsData.suits);
    return allSuits;
  }, []);

  // Find product
  useEffect(() => {
    if (!params.id || !suits.length) {
      // schedule state update to avoid synchronous setState inside effect
      Promise.resolve().then(() => setLoading(false));
      return;
    }

    const foundProduct = suits.find((s) => s.id === params.id);
    // schedule state update to avoid synchronous setState inside effect
    Promise.resolve().then(() => {
      setProduct(foundProduct || null);
      setLoading(false);
    });
  }, [params.id, suits]);

  // Handlers with useCallback
  const toggleWishlist = useCallback(() => {
    setIsWishlist((prev) => !prev);
    setPopupMessage(isWishlist ? "Removed from Wishlist ❤️" : "Added to Wishlist ❤️");
    setShowPopup(true);
  }, [isWishlist]);

  const handleAddToCart = useCallback(() => {
    setPopupMessage("Added to Cart 🛍️");
    setShowPopup(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  // Zoom handler - no state updates
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = imageContainerRef.current;
    const zoomImg = zoomImageRef.current;
    if (!container || !zoomImg) return;

    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    zoomImg.style.transformOrigin = `${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`;
  }, []);

  // Loading state
  if (loading || currencyLoading) {
    return (
      <div className="min-h-screen bg-[#faf6ef] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#C49B5C] border-t-transparent"></div>
          <p className="mt-4 text-[#2C1810] font-medium">
            {currencyLoading ? "Loading..." : "Loading details..."}
          </p>
        </div>
      </div>
    );
  }

  // Not found
  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf6ef] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-[#2C1810] mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-6">The suit you&apos;re looking for doesn&apos;t exist.</p>
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

  // Calculate discount
  const discountPercentage = product.aprice && product.price
    ? Math.round(((product.aprice - product.price) / product.aprice) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#faf6ef] via-white to-[#faf6ef] pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[#2C1810] hover:text-[#C49B5C] transition-colors group"
          aria-label="Go back"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </button>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Image with Zoom */}
          <div className="space-y-4">
            <div
              ref={imageContainerRef}
              className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-xl group cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {product.image ? (
                <>
                  <div
                    ref={zoomImageRef}
                    className="absolute inset-0 transition-transform duration-200 ease-out"
                    style={{ transform: isHovering ? "scale(2.2)" : "scale(1)" }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name || "Suit"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      quality={85}
                    />
                  </div>

                  {/* Zoom Hint */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                    <span>🔍</span>
                    Hover to zoom
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}

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
                  onClick={toggleWishlist}
                  className={`flex-1 px-4 py-3 rounded-xl transition-all group flex items-center justify-center gap-2 ${
                    isWishlist
                      ? "bg-red-50 hover:bg-red-100 border-2 border-red-300"
                      : "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-[#C49B5C]"
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart
                    className={`transition-colors ${
                      isWishlist ? "fill-red-500 text-red-500" : "text-[#2C1810] group-hover:text-red-500"
                    }`}
                    size={20}
                  />
                  <span className={`text-sm font-medium ${isWishlist ? "text-red-500" : "text-[#2C1810]"}`}>
                    {isWishlist ? "In Wishlist" : "Add to Wishlist"}
                  </span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] hover:from-[#8B6B3D] hover:to-[#6B4F2E] text-white rounded-xl transition-all group flex items-center justify-center gap-2 shadow-md hover:shadow-xl"
                  aria-label="Add to cart"
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
                <span className="text-sm font-medium">Customize</span>
                <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {product.category && (
              <span className="inline-block px-4 py-1.5 bg-[#C49B5C]/10 text-[#C49B5C] text-sm font-medium rounded-full">
                {product.category}
              </span>
            )}

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

            {/* Price */}
            <div className="flex flex-wrap items-center gap-4">
              <CurrencyPrice
                priceINR={product.price || product.aprice || 0}
                className="text-4xl font-bold text-[#2C1810]"
                size="xl"
              />

              {product.aprice && product.aprice > (product.price || 0) && (
                <>
                  <CurrencyPrice
                    priceINR={product.aprice}
                    className="text-lg text-gray-400 line-through"
                    size="md"
                  />
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                    Save {discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {currency !== "INR" && (
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-xl">
                <span>≈</span>
                <span>₹{(product.price || product.aprice || 0).toLocaleString("en-IN")}</span>
                <span className="text-xs text-gray-400">(Original Price)</span>
              </div>
            )}

            {/* Product Details */}
            <div className="bg-white p-5 rounded-2xl shadow-sm space-y-4">
              {product["Base color"] && (
                <DetailSection title="Base Color" items={product["Base color"]} />
              )}
              {product.Motifs && product.Motifs.length > 0 && (
                <DetailSection title="Motifs & Design" items={product.Motifs} />
              )}
              {product["Border Detailing"] && product["Border Detailing"].length > 0 && (
                <DetailSection title="Border Detailing" items={product["Border Detailing"]} />
              )}
              {product["Contrast Play"] && (
                <DetailSection title="Contrast Play" items={product["Contrast Play"]} />
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <FeatureCard icon={Truck} title="Free Shipping" subtitle="Above ₹999" />
              <FeatureCard icon={RefreshCw} title="Easy Returns" subtitle="7 days policy" />
              <FeatureCard icon={Shield} title="Authentic" subtitle="100% genuine" />
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-[#2C1810] text-center">{popupMessage}</p>
              <button
                onClick={handleClosePopup}
                className="w-full mt-2 px-6 py-2.5 bg-[#C49B5C] hover:bg-[#8B6B3D] text-white rounded-full transition-colors text-sm font-medium"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}