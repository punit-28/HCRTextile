"use client";

import React from "react";
import {
  Calendar,
  Clock,
  User,
  Tag,
  Heart,
  Bookmark,
  Eye,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";

const BlogPage = () => {
  const blogPost = {
    id: 1,
    title: "Our Journey: From 2 Tables to 4 Tables",
    excerpt:
      "From working as artisans in others' homes to building our own karkhana in 2012. A story of small beginnings, big losses, and steady growth.",
    category: "Our Story",
    author: "Founder's Team",
    date: "July 16, 2026",
    readTime: "5 min read",
    views: 15243,
    comments: 328,
    image: "/images/blog/1.png",
  };

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

      {/* Single Blog Post */}
      <section className="container mx-auto px-4 py-10">
        <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
          <div className="relative w-full h-96">
            <Image
              src={blogPost.image}
              alt={blogPost.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <span className="absolute top-4 left-4 bg-[#C49B5C] text-white text-xs font-bold px-3 py-1 rounded-full">
              Featured Story
            </span>
            <div className="absolute top-4 right-4 flex gap-2">
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

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-2 text-sm text-[#C49B5C] font-medium mb-4">
              <Tag className="w-4 h-4" aria-hidden="true" />
              {blogPost.category}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#2C1810] mb-4">
              {blogPost.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" aria-hidden="true" />
                {blogPost.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {blogPost.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" aria-hidden="true" />
                {blogPost.readTime}
              </span>
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" aria-hidden="true" />
                {blogPost.views.toLocaleString()} views
              </span>
              <span className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                {blogPost.comments} comments
              </span>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-lg leading-relaxed mb-6">
                <strong>Before 2012,</strong> we worked as artisans in others' homes. 
                We used to make suits and sarees for other brands and retailers. 
                It was good work, but we always wanted to build something of our own.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                <strong>In 2012,</strong> we started our own small karkhana at home. 
                We had just <span className="text-[#C49B5C] font-semibold">2 tables</span> 
                to begin with. We bought fabric with our own money, did everything 
                from cutting to stitching to finishing, and started selling ready-made 
                suits and sarees.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Finding new customers was difficult in the beginning. But slowly, 
                through word of mouth and consistent quality, we started building 
                a small customer base.
              </p>

              <div className="bg-[#FDF8F4] border-l-4 border-[#C49B5C] p-6 my-8 rounded-r-lg">
                <p className="text-[#2C1810] font-medium text-lg">
                  "Started with 2 tables in 2012. Today we have 4 tables."
                </p>
              </div>

              <p className="text-lg leading-relaxed mb-6">
                <strong>However, things didn't always go smoothly.</strong> 
                At one point, many of our ready-made products got damaged. 
                It took us <span className="font-semibold">2-3 years</span> 
                to recover from that loss and get back on track.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                After that setback, we focused on improving our quality control 
                and processes. <strong>Slowly and steadily,</strong> we became stable again. 
                We moved from 2 tables to 3 tables, and then from 3 to 4 tables.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                With every new table, we did renovation work at home to create 
                more space. <strong>By 2022,</strong> we had a proper setup with 4 tables 
                and a smooth workflow.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                <span className="text-[#C49B5C] font-semibold">Since 2022,</span> we've been consistently manufacturing suits, sarees, and 
                fabrics — preparing them from A to Z and selling to our customers.
              </p>

              <p className="text-lg leading-relaxed">
                Today, we're proud of how far we've come. From working in others' 
                homes to running our own karkhana — <strong>it's been a journey of 
                hard work, patience, and steady growth.</strong>
              </p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default BlogPage;