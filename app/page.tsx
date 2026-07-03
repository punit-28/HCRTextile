"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Star,
  Shield,
  Truck,
  RefreshCw,
  Heart,
  ShoppingBag,
} from "lucide-react";
import CurrencyPrice from "../component/CurrencyPrice";
import { useCurrency } from "@/app/context/CurrencyContext";

const slides = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058410/hero_1_n33olr.png",
    title: "Hand Block Printed Sarees",
    subtitle: "Pure Cotton · Heritage Craft",
    description:
      "Discover the timeless beauty of authentic hand block printed sarees, crafted by skilled artisans.",
    cta: "Explore Sarees",
    link: "/saree",
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058409/hero_2_razm9t.png",
    title: "Elegant Suits Collection",
    subtitle: "Traditional Meets Modern",
    description:
      "From festive wear to everyday elegance, our suits are designed for the modern woman.",
    cta: "View Collection",
    link: "/suit",
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058409/hero_3_fnmfef.png",
    title: "Festive Special",
    subtitle: "Limited Edition",
    description:
      "Celebrate in style with our exclusive festive collection featuring intricate designs.",
    cta: "Shop Now",
    link: "/saree",
  },
];

// Featured Products with INR prices
const featuredProducts = [
  {
    id: 1,
    name: "Banarasi Silk Saree",
    price: 4999,
    originalPrice: 6999,
    rating: 4.8,
    reviews: 124,
    image: "/product1.jpg",
    isNew: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Hand Block Cotton Suit",
    price: 2499,
    originalPrice: 3499,
    rating: 4.6,
    reviews: 89,
    image: "/product2.jpg",
    isNew: false,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Chanderi Silk Saree",
    price: 3999,
    originalPrice: 5499,
    rating: 4.9,
    reviews: 156,
    image: "/product3.jpg",
    isNew: true,
    isFeatured: true,
  },
  {
    id: 4,
    name: "Embroidered Suit Set",
    price: 3299,
    originalPrice: 4299,
    rating: 4.7,
    reviews: 67,
    image: "/product4.jpg",
    isNew: false,
    isFeatured: true,
  },
];

// Categories
const categories = [
  {
    name: "Sarees",
    image: "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058419/Saree_f9atdj.png",
    count: "100+ Designs",
    link: "/saree",
  },
  {
    name: "Suits",
    image: "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058413/Suit_m13oth.png",
    count: "50+ Designs",
    link: "/suit",
  },
  {
    name: "Dupattas",
    image: "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058410/duptta_pltzsr.png",
    count: "10+ Designs",
    link: "/dupatta",
  },
  {
    name: "Kurtis",
    image: "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058412/kurties_fhi9ue.png",
    count: "10+ Designs",
    link: "/kurti",
  },
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    comment:
      "Absolutely love the quality! The hand block printing is exquisite and the fabric is so comfortable.",
    image: "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058402/priya_lqvuma.jpg",
  },
  {
    id: 2,
    name: "Ananya Reddy",
    location: "Bangalore, India",
    rating: 5,
    comment:
      "HCR Textile is my go-to for traditional wear. Their collection is unique and the customer service is excellent.",
    image: "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058404/reddy_q1kj4b.jpg",
  },
  {
    id: 3,
    name: "Rajesh Sharma",
    location: "Jaipur, India",
    rating: 5,
    comment:
      "Purchased these for my wife, and she was really happy with the quality and elegant designs. Excellent collection!",
    image: "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058410/rajesh_chbk5a.png",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { isLoading: currencyLoading } = useCurrency();

  // Auto-slide carousel
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <main className="min-h-screen bg-[#faf6ef]">
      {/* Hero Section */}
      <section
        className="relative w-full mt-16 md:mt-20 h-[calc(120vh-64px)] md:h-[calc(140vh-80px)] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative h-full w-full bg-[#f8f3ea]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover object-top brightness-110 contrast-105 saturate-110"
                sizes="100vw"
                quality={95}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent" />
            </div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`transition-all duration-1000 delay-300 ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10 absolute"
                  }`}
                >
                  {index === currentSlide && (
                    <>
                      <span className="inline-block px-4 py-1.5 bg-[#C49B5C]/90 text-white text-xs font-medium tracking-widest uppercase rounded-full mb-4">
                        {slide.subtitle}
                      </span>
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                        {slide.description}
                      </p>
                      <Link
                        href={slide.link}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                      >
                        {slide.cta}
                        <ArrowRight
                          className="group-hover:translate-x-1 transition-transform"
                          size={20}
                        />
                      </Link>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? "w-12 h-1.5 bg-[#C49B5C]"
                  : "w-8 h-1.5 bg-white/50 hover:bg-white/80"
              } rounded-full`}
            />
          ))}
        </div>
      </section>

      {/* Currency Loading Indicator */}
      {currencyLoading && (
        <div className="fixed top-24 right-4 z-50 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-[#C49B5C] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-gray-600">Updating rates...</span>
        </div>
      )}

      {/* Features Bar */}
      <section className="py-8 bg-white border-y border-[#d4c5a9]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 group">
              <div className="p-3 bg-[#f8f3ea] rounded-full group-hover:bg-[#C49B5C]/10 transition-colors">
                <Truck
                  className="text-[#8B6B3D] group-hover:scale-110 transition-transform"
                  size={24}
                />
              </div>
              <div>
                <p className="font-semibold text-[#2C1810] text-sm">
                  Free Shipping
                </p>
                <p className="text-xs text-gray-500">On orders above ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="p-3 bg-[#f8f3ea] rounded-full group-hover:bg-[#C49B5C]/10 transition-colors">
                <RefreshCw
                  className="text-[#8B6B3D] group-hover:scale-110 transition-transform"
                  size={24}
                />
              </div>
              <div>
                <p className="font-semibold text-[#2C1810] text-sm">
                  Easy Returns
                </p>
                <p className="text-xs text-gray-500">7-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="p-3 bg-[#f8f3ea] rounded-full group-hover:bg-[#C49B5C]/10 transition-colors">
                <Shield
                  className="text-[#8B6B3D] group-hover:scale-110 transition-transform"
                  size={24}
                />
              </div>
              <div>
                <p className="font-semibold text-[#2C1810] text-sm">
                  Authentic Quality
                </p>
                <p className="text-xs text-gray-500">100% handcrafted</p>
              </div>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="p-3 bg-[#f8f3ea] rounded-full group-hover:bg-[#C49B5C]/10 transition-colors">
                <Heart
                  className="text-[#8B6B3D] group-hover:scale-110 transition-transform"
                  size={24}
                />
              </div>
              <div>
                <p className="font-semibold text-[#2C1810] text-sm">
                  Satisfaction
                </p>
                <p className="text-xs text-gray-500">Happy customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C1810] mb-3">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of handcrafted ethnic wear
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.link}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[12/13] overflow-hidden bg-[#f8f3ea]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
                    unoptimized
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/80">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C1810] mb-2">
                Featured Collection
              </h2>
              <p className="text-gray-600">Handpicked just for you</p>
            </div>
            <Link
              href="/saree"
              className="text-[#8B6B3D] hover:text-[#C49B5C] font-semibold flex items-center gap-1 group"
            >
              View All
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
              const discount = Math.round(
                (1 - product.price / product.originalPrice) * 100
              );
              
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-[#f8f3ea]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {product.isNew && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-[#C49B5C] text-white text-xs font-semibold rounded-full">
                          New
                        </span>
                      )}
                      <button title="heart" className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110">
                        <Heart
                          className="text-[#2C1810] hover:text-red-500 transition-colors"
                          size={18}
                        />
                      </button>
                      <button className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/95 hover:bg-[#C49B5C] text-[#2C1810] hover:text-white rounded-full text-sm font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0">
                        <div className="flex items-center gap-2">
                          <ShoppingBag size={16} />
                          Add to Cart
                        </div>
                      </button>
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-[#2C1810] hover:text-[#8B6B3D] transition-colors mb-1">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <Star
                          className="fill-[#C49B5C] text-[#C49B5C]"
                          size={14}
                        />
                        <span className="text-sm font-medium text-[#2C1810] ml-1">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                    
                    {/* Price Section - Updated with Currency */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Main Price */}
                      <CurrencyPrice 
                        priceINR={product.price} 
                        className="text-lg font-bold text-[#2C1810]"
                        size="md"
                      />
                      
                      {/* Original Price */}
                      <CurrencyPrice 
                        priceINR={product.originalPrice} 
                        className="text-sm text-gray-400 line-through"
                        size="sm"
                      />
                      
                      <span className="text-xs text-green-600 font-semibold">
                        {discount}% off
                      </span>
                    </div>
                    
                    {/* Original INR Price Hint */}
                    {/* <OriginalPriceHint priceINR={product.price} /> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-[#f8f3ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C1810] mb-3">
              What Our Customers Say
            </h2>
            <p className="text-gray-600">Real reviews from real people</p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2C1810]">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`${
                        i < testimonial.rating
                          ? "fill-[#C49B5C] text-[#C49B5C]"
                          : "text-gray-300"
                      }`}
                      size={16}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {testimonial.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// Helper component to show original INR price
// function OriginalPriceHint({ priceINR }: { priceINR: number }) {
//   const { currency } = useCurrency();
  
//   // Only show hint if currency is not INR
//   if (currency === 'INR') return null;
  
//   return (
//     <div className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
//       <span>≈</span>
//       <span>₹{priceINR.toLocaleString('en-IN')}</span>
//       <span className="text-[10px]">(INR)</span>
//     </div>
//   );
// }