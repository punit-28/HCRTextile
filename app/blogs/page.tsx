"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  User,
  Tag,
  Search,
  ArrowRight,
  Heart,
  Bookmark,
  Eye,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

// Types
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  views: number;
  comments: number;
  image: string;
  featured: boolean;
}

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => [
      "All",
      "Saree Guide",
      "Fashion Tips",
      "Wedding",
      "Festivals",
      "Care & Maintenance",
      "Weaving Stories",
    ],
    []
  );

  const blogPosts: BlogPost[] = useMemo(
    () => [
      {
        id: 1,
        title:
          "The Ultimate Guide to Banarasi Sarees: Everything You Need to Know",
        excerpt:
          "Discover the rich history, intricate weaving techniques, and timeless beauty of Banarasi sarees. From Mughal era to modern fashion...",
        category: "Saree Guide",
        author: "Priya Sharma",
        date: "June 25, 2026",
        readTime: "8 min read",
        views: 2543,
        comments: 42,
        image: "/images/blog/1.png",
        featured: true,
      },
      {
        id: 2,
        title: "6 Ways to Style Your Saree for a Modern Look",
        excerpt:
          "Break the traditional barriers and style your saree with contemporary twists. Here are 6 stunning ways to look modern yet elegant...",
        category: "Fashion Tips",
        author: "Ananya Patel",
        date: "June 23, 2026",
        readTime: "6 min read",
        views: 1892,
        comments: 28,
        image: "/images/blog/2.png",
        featured: false,
      },
      {
        id: 3,
        title: "Wedding Saree Guide: Colors That Will Make You Look Radiant",
        excerpt:
          "Choosing the perfect wedding saree can be overwhelming. From classic reds to pastel pinks, here's what works best for different skin tones...",
        category: "Wedding",
        author: "Meera Reddy",
        date: "June 20, 2026",
        readTime: "10 min read",
        views: 3120,
        comments: 56,
        image: "/images/blog/3.png",
        featured: false,
      },
      {
        id: 4,
        title: "Festival Saree Trends: What's In This Season",
        excerpt:
          "From Durga Puja to Diwali, discover the hottest saree trends for festival season. Traditional weaves with modern designs are taking over...",
        category: "Festivals",
        author: "Vikram Singh",
        date: "June 18, 2026",
        readTime: "5 min read",
        views: 1567,
        comments: 19,
        image: "/images/blog/4.png",
        featured: false,
      },
      {
        id: 5,
        title: "How to Care for Your Silk Sarees: Expert Tips",
        excerpt:
          "Silk sarees are precious investments. Learn proper storage, cleaning, and maintenance techniques to keep them beautiful for generations...",
        category: "Care & Maintenance",
        author: "Priya Sharma",
        date: "June 15, 2026",
        readTime: "7 min read",
        views: 2108,
        comments: 35,
        image: "/images/blog/5.png",
        featured: false,
      },
      {
        id: 6,
        title: "The Art of Saree Weaving: Stories from Master Weavers",
        excerpt:
          "Meet the talented artisans behind your favorite sarees. Learn about their craft, struggles, and the beautiful stories woven into each saree...",
        category: "Weaving Stories",
        author: "Ananya Patel",
        date: "June 12, 2026",
        readTime: "9 min read",
        views: 2845,
        comments: 47,
        image: "/images/blog/6.png",
        featured: false,
      },
    ],
    []
  );

  const featuredPost = useMemo(
    () => blogPosts.find((post) => post.featured),
    [blogPosts]
  );

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(
      (post) =>
        (activeCategory === "All" || post.category === activeCategory) &&
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [blogPosts, activeCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <header className="relative bg-white border-b border-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-[#C49B5C]/10 text-[#C49B5C] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2C1810] mb-4">
              Saree Stories &{" "}
              <span className="text-[#C49B5C]">Style Guide</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the world of sarees - from weaving traditions to modern
              styling tips
            </p>
          </div>
        </div>
      </header>

      {/* Search & Categories */}
      <section className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="w-full md:w-72 relative">
              <label htmlFor="search-articles" className="sr-only">
                Search articles
              </label>
              <input
                id="search-articles"
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C49B5C] focus:ring-2 focus:ring-[#C49B5C]/20 text-sm text-gray-800 placeholder:text-gray-400"
                aria-label="Search articles"
              />
              <Search
                className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
                aria-hidden="true"
              />
            </div>

            {/* Categories */}
            <nav
              className="flex flex-wrap gap-2 justify-center"
              aria-label="Blog categories"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-[#C49B5C] text-white shadow-lg shadow-[#C49B5C]/25"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  aria-current={activeCategory === category ? "page" : undefined}
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="container mx-auto px-4 py-10">
          <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="absolute top-4 left-4 bg-[#C49B5C] text-white text-xs font-bold px-3 py-1 rounded-full">
                  Featured
                </span>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs text-[#C49B5C] font-medium mb-3">
                  <Tag className="w-3 h-3" aria-hidden="true" />
                  {featuredPost.category}
                </div>
                <h2 className="text-2xl font-bold text-[#2C1810] mb-3 hover:text-[#C49B5C] transition-colors cursor-pointer">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" aria-hidden="true" />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" aria-hidden="true" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {featuredPost.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" aria-hidden="true" />
                    {featuredPost.views} views
                  </span>
                </div>
                <button
                  className="inline-flex items-center gap-2 text-[#C49B5C] font-semibold text-sm hover:gap-3 transition-all"
                  aria-label={`Read full article: ${featuredPost.title}`}
                >
                  Read Full Article <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Blog Grid */}
      <section className="container mx-auto px-4 pb-20">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No posts found matching your criteria
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group"
              >
                <div className="relative">
                  <div className="relative w-full h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#2C1810] text-xs font-medium px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                      aria-label="Save to favorites"
                    >
                      <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                    </button>
                    <button
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                      aria-label="Bookmark article"
                    >
                      <Bookmark className="w-4 h-4 text-gray-600 hover:text-[#C49B5C] transition-colors" />
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#2C1810] mb-2 group-hover:text-[#C49B5C] transition-colors cursor-pointer line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" aria-hidden="true" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      {post.date}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" aria-hidden="true" />
                        {post.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" aria-hidden="true" />
                        {post.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {post.readTime}
                      </span>
                    </div>
                    <button
                      className="text-[#C49B5C] hover:gap-2 transition-all flex items-center gap-1 text-sm font-medium"
                      aria-label={`Read article: ${post.title}`}
                    >
                      Read <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-10">
            <button className="px-8 py-3 bg-white border-2 border-[#C49B5C] text-[#C49B5C] font-semibold rounded-xl hover:bg-[#C49B5C] hover:text-white transition-all hover:shadow-lg hover:shadow-[#C49B5C]/25">
              Load More Articles
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#2C1810] text-white py-16" aria-label="Newsletter">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-3">
              Never Miss a <span className="text-[#C49B5C]">Story</span>
            </h2>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter and get the latest saree stories
              delivered to your inbox
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-[#C49B5C] text-sm text-white placeholder:text-gray-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#C49B5C] text-white font-semibold rounded-xl hover:bg-[#B08B4C] transition-all hover:shadow-lg hover:shadow-[#C49B5C]/25 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;