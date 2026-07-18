"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect,  useMemo, memo, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Star,
  Shield,
  Truck,
  RefreshCw,
  Heart,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import CurrencyPrice from "../component/CurrencyPrice";
import { useCurrency } from "@/app/context/CurrencyContext";

// Constants
const SLIDE_INTERVAL = 5000;
const ANIMATION_DURATION = 0.6;

// Data
const slides = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058410/hero_1_n33olr.png",
    title: "Hand Block Printed Sarees",
    subtitle: "Pure Cotton · Heritage Craft",
    description:
      "Discover the timeless beauty of authentic hand block printed sarees, crafted by skilled artisans.",
    cta: "Explore Sarees",
    link: "/saree",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058409/hero_2_razm9t.png",
    title: "Elegant Suits Collection",
    subtitle: "Traditional Meets Modern",
    description:
      "From festive wear to everyday elegance, our suits are designed for the modern woman.",
    cta: "View Collection",
    link: "/suit",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058409/hero_3_fnmfef.png",
    title: "Festive Special",
    subtitle: "Limited Edition",
    description:
      "Celebrate in style with our exclusive festive collection featuring intricate designs.",
    cta: "Shop Now",
    link: "/saree",
  },
];

const featuredProducts = [
  {
    id: 1,
    name: "Bagru Printed Cotton Saree",
    slug: "saree/08527337-1fc1-4c78-a92e-b41b6247e359",
    price: 700,
    originalPrice: 1000,
    rating: 4.3,
    reviews: 15,
    image:
      "https://res.cloudinary.com/dzyhjgtji/image/upload/v1784286583/ChatGPT_Image_Jul_17_2026_04_39_10_PM_l1utq7.png",
    isNew: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Bagru Printed Cotton Saree",
    slug: "saree/91135078-4b9e-45a1-8bf4-5eac0f9aebef",
    price: 700,
    originalPrice: 1000,
    rating: 4.9,
    reviews: 11,
    image:
      "https://res.cloudinary.com/dzyhjgtji/image/upload/v1784286243/ChatGPT_Image_Jul_17_2026_04_33_42_PM_frun30.png",
    isNew: true,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Hand Block Cotton Suit",
    slug: "product/98ceebc7-afcb-4dfc-a14a-6093fdd693e6",
    price: 1500,
    originalPrice: 2000,
    rating: 4.4,
    reviews: 11,
    image:
      "https://res.cloudinary.com/dzyhjgtji/image/upload/v1782568060/9_c5pyve.jpg",
    isNew: false,
    isFeatured: true,
  },
  {
    id: 4,
    name: "Bagru Printed Chanderi Suit",
    slug: "product/be595dab-020e-48b9-ac92-108f51b9f0ce",
    price: 1400,
    originalPrice: 1750,
    rating: 4.3,
    reviews: 9,
    image:
      "https://res.cloudinary.com/dzyhjgtji/image/upload/v1782571222/5_uzu1mo.jpg",
    isNew: false,
    isFeatured: true,
  },
];

const categories = [
  {
    name: "Sarees",
    image:
      "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058419/Saree_f9atdj.png",
    count: "50+ Designs",
    link: "/saree",
  },
  {
    name: "Suits",
    image:
      "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058413/Suit_m13oth.png",
    count: "50+ Designs",
    link: "/suit",
  },
  {
    name: "Dupattas",
    image:
      "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058410/duptta_pltzsr.png",
    count: "10+ Designs",
    link: "/dupatta",
  },
  {
    name: "Kurtis",
    image:
      "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058412/kurties_fhi9ue.png",
    count: "10+ Designs",
    link: "/kurti",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    comment:
      "Absolutely love the quality! The hand block printing is exquisite and the fabric is so comfortable.",
    image:
      "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058402/priya_lqvuma.jpg",
  },
  {
    id: 2,
    name: "Ananya Reddy",
    location: "Bangalore, India",
    rating: 5,
    comment:
      "HCR Textile is my go-to for traditional wear. Their collection is unique and the customer service is excellent.",
    image:
      "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058404/reddy_q1kj4b.jpg",
  },
  {
    id: 3,
    name: "Rajesh Sharma",
    location: "Jaipur, India",
    rating: 5,
    comment:
      "Purchased these for my wife, and she was really happy with the quality and elegant designs. Excellent collection!",
    image:
      "https://res.cloudinary.com/dzyhjgtji/image/upload/v1783058410/rajesh_chbk5a.png",
  },
];

// Animation variants - modified to use once: true
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIMATION_DURATION, ease: [0.22, 1, 0.36, 1] },
  },
};

// const fadeIn = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 0.5 } },
// };

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Memoized Components
type FeatureItemProps = {
  icon: LucideIcon;
  title: string;
  desc: string;
  index: number;
};

const FeatureItem = memo(({ icon: Icon, title, desc }: FeatureItemProps) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="flex items-center gap-2 md:gap-3 group"
  >
    <motion.div
      whileHover={{ rotate: 360, scale: 1.1 }}
      transition={{ duration: 0.5 }}
      className="p-2 md:p-3 bg-[#f8f3ea] rounded-full group-hover:bg-[#C49B5C]/10 transition-colors"
    >
      <Icon
        className="text-[#8B6B3D] group-hover:scale-110 transition-transform"
        size={20}
      />
    </motion.div>
    <div>
      <p className="font-semibold text-[#2C1810] text-xs md:text-sm">{title}</p>
      <p className="text-[10px] md:text-xs text-gray-500">{desc}</p>
    </div>
  </motion.div>
));

FeatureItem.displayName = "FeatureItem";

type Category = {
  name: string;
  image: string;
  count: string;
  link: string;
};

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  isNew: boolean;
  isFeatured: boolean;
};


const CategoryCard = memo(({ category }: { category: Category }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ y: -10, transition: { duration: 0.3 } }}
  >
    <Link
      href={category.link}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 block"
    >
      <motion.div
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.7 }}
        className="relative aspect-[12/13] overflow-hidden bg-[#f8f3ea]"
      >
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
        />
      </motion.div>

      {/* Content always visible - no hover animation */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="text-sm md:text-xl font-bold text-white">
          {category.name}
        </h3>
        <p className="text-xs md:text-sm text-white/80">{category.count}</p>
      </div>
    </Link>
  </motion.div>
));

CategoryCard.displayName = "CategoryCard";

const ProductCard = memo(({ product }: { product: Product }) => {
  const discount = Math.round(
    (1 - product.price / product.originalPrice) * 100,
  );

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      <Link href={`/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-[#f8f3ea]">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
            className="w-full h-full"
          >
            <Image
              src={product.image || "/placeholder.jpg"}
              alt={product.name || "Product Image"}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
            />
          </motion.div>
          {product.isNew && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute top-2 left-2 md:top-3 md:left-3 px-2 md:px-3 py-0.5 md:py-1 bg-[#C49B5C] text-white text-[10px] md:text-xs font-semibold rounded-full"
            >
              New
            </motion.span>
          )}

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Add to wishlist logic
            }}
            className="absolute top-2 right-2 md:top-3 md:right-3 p-1.5 md:p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
            aria-label="Add to wishlist"
          >
            <Heart
              className="text-[#2C1810] hover:text-red-500 transition-colors"
              size={16}
            />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Add to cart logic
            }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 md:px-4 py-1.5 md:py-2 bg-white/95 hover:bg-[#C49B5C] text-[#2C1810] hover:text-white rounded-full text-[10px] md:text-sm font-semibold transition-all duration-300 whitespace-nowrap"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 md:gap-2"
            >
              <ShoppingBag size={14} />
              Add to Cart
            </motion.div>
          </motion.button>
        </div>
      </Link>

      <div className="p-2 md:p-4">
        <Link href={`/product/${product.slug}`}>
          <motion.h3
            whileHover={{ x: 3 }}
            className="font-semibold text-[#2C1810] hover:text-[#8B6B3D] transition-colors mb-0.5 md:mb-1 text-xs md:text-base truncate"
          >
            {product.name}
          </motion.h3>
        </Link>

        <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
          <div className="flex items-center">
            <Star className="fill-[#C49B5C] text-[#C49B5C]" size={12} />
            <span className="text-xs md:text-sm font-medium text-[#2C1810] ml-0.5 md:ml-1">
              {product.rating}
            </span>
          </div>
          <span className="text-[10px] md:text-xs text-gray-500">
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center gap-1 md:gap-2 flex-wrap">
          <CurrencyPrice
            priceINR={product.price}
            className="text-sm md:text-lg font-bold text-[#2C1810]"
            size="sm"
          />
          <CurrencyPrice
            priceINR={product.originalPrice}
            className="text-[10px] md:text-sm text-gray-400 line-through"
            size="sm"
          />
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[9px] md:text-xs text-green-600 font-semibold"
          >
            {discount}% off
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";

const TestimonialCard = memo(({ testimonial }: { testimonial: (typeof testimonials)[number] }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{
      y: -5,
      boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)",
      transition: { duration: 0.3 },
    }}
    className="bg-white p-4 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
        className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0"
      >
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          fill
          className="object-cover"
          loading="lazy"
        />
      </motion.div>
      <div>
        <h4 className="font-semibold text-[#2C1810] text-sm md:text-base">
          {testimonial.name}
        </h4>
        <p className="text-xs md:text-sm text-gray-500">
          {testimonial.location}
        </p>
      </div>
    </div>
    <div className="flex gap-0.5 mb-2 md:mb-3">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.1 * i, duration: 0.3 }}
        >
          <Star
            className={`${
              i < testimonial.rating
                ? "fill-[#C49B5C] text-[#C49B5C]"
                : "text-gray-300"
            }`}
            size={14}
          />
        </motion.div>
      ))}
    </div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-gray-700 text-xs md:text-sm leading-relaxed"
    >
      {testimonial.comment}
    </motion.p>
  </motion.div>
));

TestimonialCard.displayName = "TestimonialCard";

// Main Component
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isLoading: currencyLoading } = useCurrency();

  // Ref to track if animations have been triggered
  const hasAnimated = useRef(false);

  // Auto-slide carousel with cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Memoized features data
  const features = useMemo(
    () => [
      { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
      { icon: RefreshCw, title: "Easy Returns", desc: "7-day return policy" },
      { icon: Shield, title: "Authentic Quality", desc: "100% handcrafted" },
      { icon: Heart, title: "Satisfaction", desc: "Happy customers" },
    ],
    [],
  );

  return (
    <main className="min-h-screen bg-[#faf6ef]">
      {/* Hero Section */}
      <section className="relative w-full mt-16 md:mt-20 overflow-hidden">
        <div className="h-[50vh] sm:h-[60vh] md:h-[85vh] lg:h-[calc(140vh-80px)] w-full relative">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={index !== currentSlide}
            >
              <div className="relative h-full w-full bg-[#f8f3ea]">
                <Image
                  src={slide.image || "/placeholder.jpg"}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover brightness-110 contrast-105 saturate-110"
                  sizes="100vw"
                  quality={85}
                  style={{
                    objectPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent md:from-black/45 md:via-black/20 md:to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
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
                      <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-[#C49B5C]/90 text-white text-[10px] md:text-xs font-medium tracking-widest uppercase rounded-full mb-3 md:mb-4">
                        {slide.subtitle}
                      </span>
                      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-2 md:mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-sm sm:text-base md:text-xl text-white/90 mb-4 md:mb-8 max-w-lg mx-auto md:mx-0">
                        {slide.description}
                      </p>
                      <Link
                        href={slide.link}
                        className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 group text-sm sm:text-base"
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
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 sm:w-12 h-1.5 bg-[#C49B5C]"
                  : "w-6 sm:w-8 h-1.5 bg-white/50 hover:bg-white/80"
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Currency Loading Indicator */}
      {currencyLoading && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 right-4 z-50 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
          role="status"
          aria-live="polite"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-3 h-3 border-2 border-[#C49B5C] border-t-transparent rounded-full"
          />
          <span className="text-xs text-gray-600">Updating rates...</span>
        </motion.div>
      )}

      {/* Features Bar */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-6 md:py-8 bg-white border-y border-[#d4c5a9]/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {features.map((feature, index) => (
              <FeatureItem key={index} {...feature} index={index} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-12 md:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-[#2C1810] mb-2 md:mb-3">
              Shop by Category
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of handcrafted ethnic wear
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] mx-auto mt-3 md:mt-4 rounded-full"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6"
          >
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-12 md:py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-12 gap-4"
          >
            <div className="text-center sm:text-left">
              <h2 className="text-2xl md:text-4xl font-bold text-[#2C1810] mb-1 md:mb-2">
                Featured Collection
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Handpicked just for you
              </p>
            </div>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Link
                href="/saree"
                className="text-[#8B6B3D] hover:text-[#C49B5C] font-semibold flex items-center gap-1 group text-sm md:text-base"
              >
                View All
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={18}
                />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-12 md:py-20 bg-[#f8f3ea]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-[#2C1810] mb-2 md:mb-3">
              What Our Customers Say
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Real reviews from real people
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] mx-auto mt-3 md:mt-4 rounded-full"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
