"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
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
  Ruler,
  Layers,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import suitsData from "@/component/data/data.json";

type SareeData = {
  id: string;
  name?: string;
  mainImage?: string;
  images?: string[];
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
  blouse?: string;
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
      <p className="text-gray-600 text-sm">{items}</p>
    </div>
  );
};

// Memoized Thumbnail Component
const Thumbnail = ({ 
  image, 
  isSelected, 
  onClick 
}: { 
  image: string; 
  isSelected: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`relative rounded-lg overflow-hidden border-2 transition-all ${
      isSelected
        ? "border-[#C49B5C] shadow-lg shadow-[#C49B5C]/20"
        : "border-transparent hover:border-gray-300"
    }`}
    style={{ aspectRatio: "1365/2048" }}
  >
    <Image
      src={image}
      alt="Thumbnail"
      fill
      className="object-cover"
      sizes="(max-width: 768px) 20vw, 10vw"
      quality={80}
    />
  </button>
);

export default function SareeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { currency, isLoading: currencyLoading } = useCurrency();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isWishlist, setIsWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  // Memoized data
  const sarees = useMemo(() => {
    return Array.isArray(suitsData?.saree) ? suitsData.saree : [];
  }, []);

  const product = useMemo<SareeData | null>(() => {
    if (!params.id || !sarees.length) return null;
    return sarees.find((s) => s.id === params.id) || null;
  }, [params.id, sarees]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    timer = setTimeout(() => {
      if (product) {
        setSelectedImage(product.mainImage || product.images?.[0] || "");
      }
      setLoading(false);
    }, 0);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [product]);

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

  const handleImageSelect = useCallback((image: string) => {
    setSelectedImage(image);
  }, []);

  const openLightbox = useCallback((index: number) => {
    setCurrentLightboxIndex(index);
    setShowLightbox(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setShowLightbox(false);
    document.body.style.overflow = "auto";
  }, []);

  const navigateLightbox = useCallback((direction: "prev" | "next") => {
    if (!product?.images) return;
    const totalImages = product.images.length;
    setCurrentLightboxIndex((prev) =>
      direction === "prev"
        ? (prev - 1 + totalImages) % totalImages
        : (prev + 1) % totalImages
    );
  }, [product]);

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showLightbox) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateLightbox("prev");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateLightbox("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showLightbox, closeLightbox, navigateLightbox]);

  // Zoom handlers
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) });
    setIsZooming(true);
  }, []);

  const handleMouseLeave = useCallback(() => setIsZooming(false), []);

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
          <h2 className="text-2xl font-bold text-[#2C1810] mb-2">Saree Not Found</h2>
          <p className="text-gray-500 mb-6">The saree you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/saree"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C49B5C] text-white rounded-full hover:bg-[#8B6B3D] transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [];
  const hasMultipleImages = images.length > 1;
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
          {/* Left - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative w-full bg-white rounded-2xl overflow-hidden shadow-xl group cursor-zoom-in"
              style={{ aspectRatio: "1365/2048" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                const index = images.indexOf(selectedImage);
                if (index !== -1) openLightbox(index);
              }}
            >
              {selectedImage && (
                <>
                  <Image
                    src={selectedImage}
                    alt={product.name || "Saree"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    quality={85}
                  />

                  {/* Zoom Effect */}
                  {isZooming && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle 150px at ${zoomPosition.x}% ${zoomPosition.y}%, 
                          transparent 0%, transparent 40%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.15) 100%)`,
                      }}
                    />
                  )}

                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                    style={{
                      opacity: isZooming ? 1 : 0,
                      clipPath: isZooming
                        ? `circle(150px at ${zoomPosition.x}% ${zoomPosition.y}%)`
                        : "circle(0px at 50% 50%)",
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={selectedImage}
                        alt="Zoomed"
                        fill
                        className="object-cover"
                        style={{
                          transform: `scale(2.5)`,
                          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Controls */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const index = images.indexOf(selectedImage);
                      if (index !== -1) openLightbox(index);
                    }}
                    className="absolute bottom-4 right-4 p-2.5 bg-black/60 backdrop-blur-sm text-white rounded-full hover:bg-black/80 transition-colors z-20 opacity-0 group-hover:opacity-100"
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={20} />
                  </button>

                  {hasMultipleImages && (
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full z-20">
                      {images.indexOf(selectedImage) + 1} / {images.length}
                    </div>
                  )}

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    Hover to zoom • Click to enlarge
                  </div>
                </>
              )}

              {/* Discount Badge */}
              {product.discount && product.discount > 0 && (
                <span className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white text-sm font-semibold rounded-full shadow-lg z-20">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {hasMultipleImages && (
              <div className="grid grid-cols-5 gap-3">
                {images.map((image, index) => (
                  <Thumbnail
                    key={index}
                    image={image}
                    isSelected={selectedImage === image}
                    onClick={() => handleImageSelect(image)}
                  />
                ))}
              </div>
            )}

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
              {product.name || "Unnamed Saree"}
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

            {/* Product Details Grid */}
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
              {product.blouse && (
                <div className="bg-white p-3 rounded-xl shadow-sm text-center">
                  <div className="w-8 h-8 bg-[#C49B5C]/10 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Layers className="text-[#C49B5C]" size={16} />
                  </div>
                  <p className="text-xs font-medium text-[#2C1810]">Blouse</p>
                  <p className="text-[10px] text-gray-500">{product.blouse}</p>
                </div>
              )}
            </div>

            {/* Detailed Info */}
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

      {/* Lightbox Modal */}
      {showLightbox && product.images && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          <div className="absolute top-20 left-1/2 -translate-x-1/2 text-white/50 text-xs bg-black/30 px-4 py-2 rounded-full hidden sm:block">
            ← → to navigate • ESC to close
          </div>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {currentLightboxIndex + 1} / {product.images.length}
          </div>

          <div
            className="relative w-full max-w-4xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={product.images[currentLightboxIndex]}
              alt={`View ${currentLightboxIndex + 1}`}
              width={1365}
              height={2048}
              className="object-contain w-full h-full max-h-[90vh]"
              priority
              quality={90}
            />
          </div>

          {product.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox("prev");
                }}
                className="absolute left-4 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox("next");
                }}
                className="absolute right-4 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentLightboxIndex(index)}
                className={`relative w-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                  currentLightboxIndex === index
                    ? "border-[#C49B5C]"
                    : "border-transparent hover:border-gray-500"
                }`}
                style={{ aspectRatio: "1365/2048" }}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

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