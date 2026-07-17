"use client";
import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, RefreshCw, ArrowLeft, Layers, ShoppingBag } from "lucide-react";
import suitsData from "@/component/data/data.json";
import CurrencyPrice from "../../component/CurrencyPrice";
import { useCurrency } from "@/app/context/CurrencyContext";

type DupattaData = {
  id: number;
  name?: string;
  image?: string;
  discount?: number;
  rating?: number;
  price?: number;
  aprice?: number;
  fabric?: string;
};

export default function DupattaPage() {
  const { isLoading: currencyLoading } = useCurrency();

  const dupattas = useMemo(() => {
    if (
      suitsData &&
      typeof suitsData === "object" &&
      Array.isArray(suitsData.dupatta)
    ) {
      return suitsData.dupatta as DupattaData[];
    }
    return [];
  }, []);

  if (currencyLoading) {
    return (
      <div className="min-h-screen bg-[#faf6ef] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#C49B5C] border-t-transparent"></div>
          <p className="mt-4 text-[#2C1810] font-medium">
            Loading currency rates...
          </p>
        </div>
      </div>
    );
  }

  if (!dupattas.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#faf6ef] via-white to-[#faf6ef] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto bg-[#C49B5C]/10 rounded-full flex items-center justify-center mb-4">
            <Layers className="text-[#C49B5C]" size={36} />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#2C1810] mb-2">
            No Dupattas Found
          </h2>

          <p className="text-gray-500 text-sm md:text-base mb-6">
            We{"'"}re curating our latest collection of beautiful dupattas.
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
    <main className="min-h-screen bg-[#faf6ef] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C1810] mb-4">
            Our <span className="text-[#C49B5C]">Dupatta</span> Collection
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our exquisite collection of handcrafted dupattas, perfect
            for every occasion.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {dupattas.map((dupatta) => (
            <Link
              key={dupatta.id}
              href={`/dupatta/${dupatta.id}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container - Fixed 1066:1600 Aspect Ratio */}
              <div
                className="relative w-full"
                style={{ aspectRatio: "1066/1600" }}
              >
                {dupatta.image ? (
                  <Image
                    src={dupatta.image}
                    alt={dupatta.name || "Dupatta"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={dupattas.indexOf(dupatta) < 4}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}

                {/* Discount Badge - Always on Right */}
                {dupatta.discount && dupatta.discount > 0 && (
                  <span className="absolute top-3 right-3 px-3 py-1 bg-[#C49B5C] text-white text-xs font-semibold rounded-full shadow-md">
                    {dupatta.discount}% OFF
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3 md:p-4">
                <h3 className="font-semibold text-[#2C1810] text-sm line-clamp-2 mb-1">
                  {dupatta.name || "Unnamed Dupatta"}
                </h3>

                {dupatta.fabric && (
                  <p className="text-xs text-gray-500 mb-2">{dupatta.fabric}</p>
                )}

                {/* Price Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <CurrencyPrice
                      priceINR={dupatta.price || dupatta.aprice || 0}
                      className="text-base md:text-lg font-bold text-[#2C1810]"
                      size="md"
                    />

                    {dupatta.aprice &&
                      dupatta.aprice > (dupatta.price || 0) && (
                        <CurrencyPrice
                          priceINR={dupatta.aprice}
                          className="text-xs md:text-sm text-gray-400 line-through"
                          size="sm"
                        />
                      )}
                  </div>

                  <div className="flex items-center gap-1">
                    <Star className="fill-[#C49B5C] text-[#C49B5C]" size={14} />
                    <span className="text-sm text-gray-600">
                      {dupatta.rating || 4.5}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full mt-3 py-2 bg-[#C49B5C] hover:bg-[#8B6B3D] text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
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
