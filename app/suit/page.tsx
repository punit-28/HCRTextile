"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Star, Heart, ShoppingBag } from "lucide-react";
import suitsData from "@/component/data/data.json";
import Popup from "@/component/pop_up";
import CurrencyPrice from "../../component/CurrencyPrice";
import { useCurrency } from "@/app/context/CurrencyContext";
import Loader from "@/component/Loader";

const BLUR_DATA_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100%25' height='100%25' fill='%23f8f3ea'/%3E%3C/svg%3E";

interface SuitData {
  id: string;
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

const renderProductGrid = (
  suits: SuitData[],
  wishlist: number[],
  toggleWishlist: (id: number) => void,
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>,
  loadedImages: Set<number>,
  handleImageLoad: (id: number) => void,
  collectionType?: string,
) => {
  if (!suits || suits.length === 0) {
    return (
      <div className="text-center py-12 px-6 bg-white rounded-2xl shadow-lg max-w-sm mx-auto">
        <div className="w-16 h-16 mx-auto bg-[#C49B5C]/10 rounded-full flex items-center justify-center mb-3">
          <ShoppingBag className="text-[#C49B5C]" size={28} />
        </div>
        <h3 className="text-xl font-bold text-[#2C1810] mb-1">
          No Products Available
        </h3>
        <p className="text-gray-500 text-sm mb-5">
          Check back soon for our new collection
        </p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#C49B5C] text-white rounded-lg hover:bg-[#8B6B3D] transition-colors text-sm"
          >
            Refresh
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-100 text-[#2C1810] rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            Home
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-5 md:gap-6">
      {suits.map((suit, index) => {
        const isLoaded = loadedImages.has(parseInt(suit.id));
        return (
          <div
            key={`${collectionType || "suit"}-${suit.id}`}
            className="group bg-white rounded-lg sm:rounded-2xl overflow-hidden shadow-sm sm:shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Link
              href={`/product/${suit.id}`}
              className="block relative overflow-hidden bg-[#f8f3ea] aspect-square"
            >
              {!isLoaded && (
                <div className="absolute inset-0 bg-[#f8f3ea] animate-pulse z-10">
                  <div className="w-full h-full bg-gradient-to-r from-[#f8f3ea] via-[#ede5d8] to-[#f8f3ea] bg-[length:200%_100%] animate-shimmer"></div>
                </div>
              )}

              {suit.image ? (
                <Image
                  src={suit.image || "/placeholder.png"}
                  alt={suit.name || "Suit"}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className={`object-cover group-hover:scale-110 transition-all duration-700 brightness-110 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => handleImageLoad(parseInt(suit.id))}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}

              {suit.discount && suit.discount > 0 && (
                <span className="absolute top-1 left-1 sm:top-3 sm:left-3 px-1.5 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white text-[8px] sm:text-xs font-semibold rounded-full shadow-lg z-20">
                  {suit.discount}% OFF
                </span>
              )}

              <button
                title="Add to wishlist"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleWishlist(parseInt(suit.id));
                }}
                className="absolute top-1 right-1 sm:top-3 sm:right-3 p-1 sm:p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-20"
              >
                <Heart
                  className={`transition-colors w-3 h-3 sm:w-5 sm:h-5 ${
                    wishlist.includes(parseInt(suit.id))
                      ? "fill-red-500 text-red-500"
                      : "text-[#2C1810] hover:text-red-500"
                  }`}
                />
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowPopup(true);
                }}
                className="absolute bottom-1 sm:bottom-4 left-1/2 -translate-x-1/2 px-2 sm:px-6 py-0.5 sm:py-2.5 bg-white/95 hover:bg-[#C49B5C] text-[#2C1810] hover:text-white rounded-full text-[8px] sm:text-sm font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 shadow-lg z-20 whitespace-nowrap"
              >
                <div className="flex items-center gap-0.5 sm:gap-2">
                  <ShoppingBag size={10} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Add to Cart</span>
                  <span className="sm:hidden">Cart</span>
                </div>
              </button>
            </Link>

            <div className="p-1.5 sm:p-4 space-y-0.5 sm:space-y-2">
              <Link href={`/product/${suit.id}`}>
                <h3 className="font-semibold text-[#2C1810] hover:text-[#8B6B3D] transition-colors text-[10px] sm:text-base leading-tight line-clamp-1">
                  {suit.name || "Unnamed Suit"}
                </h3>
              </Link>

              {suit.category && (
                <span className="inline-block text-[6px] sm:text-xs text-gray-400 bg-gray-50 px-1 sm:px-2 py-0.5 rounded-full">
                  {suit.category}
                </span>
              )}

              <div className="flex items-center gap-0.5 sm:gap-2">
                <div className="flex items-center">
                  <Star className="fill-[#C49B5C] text-[#C49B5C] w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  <span className="text-[8px] sm:text-sm font-medium text-[#2C1810] ml-0.5 sm:ml-1">
                    {suit.rating || 4.5}
                  </span>
                </div>
                <span className="text-[6px] sm:text-xs text-gray-400">
                  {suit.reviews || 0}
                </span>
              </div>

              <div className="flex items-center gap-0.5 sm:gap-2 pt-0.5 sm:pt-1">
                <CurrencyPrice
                  priceINR={suit.price || suit.aprice || 0}
                  className="text-[10px] sm:text-xl font-bold text-[#2C1810]"
                  size="sm"
                />

                {suit.aprice && suit.aprice > (suit.price || 0) && (
                  <>
                    <CurrencyPrice
                      priceINR={suit.aprice}
                      className="text-[6px] sm:text-sm text-gray-400 line-through"
                      size="sm"
                    />
                    <span className="text-[6px] sm:text-xs text-green-600 font-semibold">
                      {Math.round(
                        ((suit.aprice - (suit.price || 0)) / suit.aprice) * 100,
                      )}
                      %
                    </span>
                  </>
                )}
              </div>
              <PriceWithCurrencyHint
                priceINR={suit.price || suit.aprice || 0}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

function PriceWithCurrencyHint({ priceINR }: { priceINR: number }) {
  const { currency } = useCurrency();

  if (currency === "INR") return null;

  return (
    <div className="text-[6px] sm:text-xs text-gray-400 mt-0.5 flex items-center gap-0.5 sm:gap-1">
      <span>≈</span>
      <span>₹{priceINR.toLocaleString("en-IN")}</span>
      <span className="text-[5px] sm:text-[10px]">(Original)</span>
    </div>
  );
}

export default function SuitPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { isLoading } = useCurrency();
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const hasDataInitially =
    Array.isArray(suitsData.suit) && suitsData.suit.length > 0;
  const [loading, setLoading] = useState(() => !hasDataInitially);

  useEffect(() => {
    if (hasDataInitially) return;
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [hasDataInitially]);

  const chanderiSuits: SuitData[] = Array.isArray(suitsData.suit)
    ? suitsData.suit
    : [];
  const cottonSuits: SuitData[] = Array.isArray(suitsData.suits)
    ? suitsData.suits
    : [];

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#faf6ef] via-white to-[#faf6ef]">
      <section className="relative w-full pt-16 md:pt-20 overflow-hidden hidden md:block">
        <div className="relative w-full h-[45vh] md:h-[50vh] lg:h-[75vh] xl:h-[85vh]">
          <Image
            src="https://res.cloudinary.com/dzyhjgtji/image/upload/v1784207209/Suit_Page_sffixj.png"
            alt="Luxury Suit Collection"
            fill
            priority
            className="object-cover object-top brightness-105 contrast-105"
            sizes="100vw"
            quality={90}
          />

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C1810]/60 via-[#2C1810]/30 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
            <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5">
                <div className="h-px w-8 sm:w-10 md:w-12 bg-[#C49B5C]"></div>
                <span className="text-[#C49B5C] text-[10px] sm:text-xs md:text-sm lg:text-base font-medium tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase">
                  Luxury Collection
                </span>
                <div className="h-px w-8 sm:w-10 md:w-12 bg-[#C49B5C]"></div>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-light text-white leading-[1.05] sm:leading-[1.1]">
                <span className="font-serif italic block sm:inline">Timeless</span>
                <span className="block sm:inline sm:ml-2 md:ml-3 font-bold">Elegance</span>
              </h1>

              <p className="text-sm md:text-lg lg:text-xl text-white/90 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mt-2 sm:mt-3 md:mt-4 leading-relaxed">
                Exquisitely crafted suits where Indian heritage meets
                contemporary design.
              </p>

              <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-8">
                <Link
                  href="#chanderi-collection"
                  className="inline-block px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-3.5 lg:py-4 bg-[#C49B5C] hover:bg-[#8B6B3D] text-white text-sm sm:text-base md:text-lg font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Explore Collection
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient transition - short + subtle, no big white band */}
        <div className="absolute bottom-0 left-0 right-0 h-6 md:h-8 bg-gradient-to-t from-[#faf6ef] to-transparent pointer-events-none"></div>
      </section>

      <section className="md:hidden relative w-full pt-20 pb-10 bg-gradient-to-br from-[#2C1810] via-[#4a2f1f] to-[#8B6B3D]">
        <div className="px-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-[#C49B5C]"></div>
            <span className="text-[#C49B5C] text-[10px] font-medium tracking-[0.2em] uppercase">
              Luxury Collection
            </span>
          </div>
          <h1 className="text-3xl font-light text-white leading-tight">
            <span className="font-serif italic">Timeless</span>{" "}
            <span className="font-bold">Elegance</span>
          </h1>
          <p className="text-sm text-white/80 mt-2 max-w-xs">
            Exquisitely crafted suits where Indian heritage meets
            contemporary design.
          </p>
          <Link
            href="#chanderi-collection"
            className="inline-block mt-5 px-6 py-2.5 bg-[#C49B5C] hover:bg-[#8B6B3D] text-white text-sm font-medium rounded-full transition-all duration-300 shadow-lg"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 md:px-8 lg:px-8 py-2 sm:py-10 md:py-12 lg:py-16">
        {isLoading && (
          <div className="text-center py-8">
            <div className="flex flex-col items-center gap-4">
              <Loader />
              <span className="text-sm text-[#8B6B3D]">
                Loading currency rates...
              </span>
            </div>
          </div>
        )}

        {!isLoading && chanderiSuits.length > 0 && (
          <>
            <div className="text-center mb-4 sm:mb-10 md:mb-14">
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-1 sm:mb-3">
                <div className="h-px w-6 sm:w-10 md:w-12 bg-[#C49B5C]"></div>
                <span className="text-[#C49B5C] text-[8px] sm:text-xs md:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                  Premium
                </span>
                <div className="h-px w-6 sm:w-10 md:w-12 bg-[#C49B5C]"></div>
              </div>

              <h2 className="text-sm sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#2C1810]">
                <span className="font-serif italic">Chanderi Suit</span>
                <span className="hidden sm:inline"> with</span>
                <br className="block sm:hidden" />
                <span className="block sm:inline sm:ml-2">Chanderi Dupatta</span>
              </h2>

              <p className="text-[10px] sm:text-base md:text-lg text-gray-500 mt-0.5 sm:mt-2 md:mt-3 hidden sm:block">
                Gracefully handcrafted for timeless elegance
              </p>
            </div>

            <section id="chanderi-collection">
              {renderProductGrid(
                chanderiSuits,
                wishlist,
                toggleWishlist,
                setShowPopup,
                loadedImages,
                handleImageLoad,
                "chanderi",
              )}
            </section>
          </>
        )}

        {!isLoading && chanderiSuits.length > 0 && cottonSuits.length > 0 && (
          <div className="my-6 sm:my-14 md:my-16 lg:my-20 flex items-center justify-center">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C49B5C] to-transparent"></div>
            <span className="px-2 sm:px-5 md:px-6 lg:px-8 text-[#C49B5C] text-[8px] sm:text-xs md:text-sm font-medium tracking-[0.15em] sm:tracking-[0.3em] uppercase flex items-center gap-1 sm:gap-2">
              <span className="w-0.5 h-0.5 sm:w-1.5 sm:h-1.5 rounded-full bg-[#C49B5C]"></span>
              New
              <span className="w-0.5 h-0.5 sm:w-1.5 sm:h-1.5 rounded-full bg-[#C49B5C]"></span>
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C49B5C] to-transparent"></div>
          </div>
        )}

        {!isLoading && cottonSuits.length > 0 && (
          <>
            <div className="text-center mb-4 sm:mb-10 md:mb-14">
              <h2 className="text-sm sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#2C1810]">
                <span className="font-serif italic">Cotton Suit</span>
                <span className="hidden sm:inline"> with</span>
                <br className="block sm:hidden" />
                <span className="block sm:inline sm:ml-2">Georgette Dupatta</span>
              </h2>

              <p className="text-[10px] sm:text-base md:text-lg text-gray-500 mt-0.5 sm:mt-2 md:mt-3 hidden sm:block">
                Lightweight and comfortable for everyday elegance
              </p>
            </div>

            <section id="cotton-collection">
              {renderProductGrid(
                cottonSuits,
                wishlist,
                toggleWishlist,
                setShowPopup,
                loadedImages,
                handleImageLoad,
                "cotton",
              )}
            </section>
          </>
        )}

        {!isLoading &&
          chanderiSuits.length === 0 &&
          cottonSuits.length === 0 && (
            <div className="text-center py-16 sm:py-20 bg-white rounded-3xl shadow-lg">
              <div className="text-6xl sm:text-7xl mb-3 sm:mb-4">😕</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#2C1810] mb-2">
                No Suits Available
              </h3>
              <p className="text-sm sm:text-base text-gray-500">
                Check back soon for our new collection
              </p>
            </div>
          )}
      </div>

      <Popup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </main>
  );
}
