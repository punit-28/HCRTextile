"use client";

import React from "react";
import {
  Calendar,
  Clock,
  User,
  Tag,
  Eye,
  MessageCircle,
} from "lucide-react";
const BlogPage = () => {
  const blogPost = {
    id: 1,
    title: "Our Journey: 20+ Years of Artisanship & Organic Colors",
    excerpt:
      "From working in others' homes to building our own karkhana with organic colors made from nature. A story of resilience, tradition, and steady growth.",
    category: "Our Story",
    author: "Founder's Team",
    date: "July 16, 2026",
    readTime: "6 min read",
    views: 15243,
    comments: 328,
    image: "/images/blog/1.png",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header - with navbar padding */}
      <header className="relative bg-white border-b border-gray-100 pt-20 md:pt-24 pb-6 md:pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2C1810] mb-2">
              Saree Stories &{" "}
              <span className="text-[#C49B5C]">Style Guide</span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Discover the world of sarees - from weaving traditions to modern
              styling tips
            </p>
          </div>
        </div>
      </header>

      {/* Single Blog Post */}
      <section className="container mx-auto px-4 pt-3 pb-8 md:pt-4 md:pb-12">
        <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
          <div className="px-5 py-6 sm:px-6 md:px-8 lg:px-10 md:py-7 lg:py-8">
            <div className="flex items-center gap-2 text-sm text-[#C49B5C] font-medium mb-3">
              <Tag className="w-4 h-4" aria-hidden="true" />
              {blogPost.category}
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C1810] mb-3">
              {blogPost.title}
            </h2>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" aria-hidden="true" />
                {blogPost.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {blogPost.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" aria-hidden="true" />
                {blogPost.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" aria-hidden="true" />
                {blogPost.views.toLocaleString()} views
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                {blogPost.comments} comments
              </span>
            </div>

            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-gray-700">
              <p className="leading-relaxed mb-3">
                <strong>For over 20 years,</strong> we have been dedicated to
                the art of saree and suit making. Before 2012, we worked as
                artisans in others{"'"} homes, learning the craft and perfecting
                our skills.
              </p>

              <p className="leading-relaxed mb-3">
                <strong>In 2012,</strong> we started our own small karkhana at
                home. We had just{" "}
                <span className="text-[#C49B5C] font-semibold">2 tables</span>
                to begin with. Being new to running our own setup, we bought
                fabric with our own money and started manufacturing ready-made
                suits and sarees.
              </p>

              <p className="leading-relaxed mb-3">
                But being new, we made mistakes.{" "}
                <strong>Many of our ready-made products got damaged</strong> —
                the fabric quality, the stitching, the finishing — we were
                learning everything the hard way.
              </p>

              <div className="bg-[#FDF8F4] border-l-4 border-[#C49B5C] p-4 my-5 rounded-r-lg">
                <p className="text-[#2C1810] font-medium text-base">
                  &quot;Being new meant learning through losses. It took us 1.5
                  years to recover and get back on track.&quot;
                </p>
              </div>

              <p className="leading-relaxed mb-3">
                <strong>It took us 1.5 years</strong> to recover from that loss.
                During this time, we improved our quality control, refined our
                processes, and learned from every mistake. Slowly, we started
                building trust with our customers.
              </p>

              <p className="leading-relaxed mb-3">
                <strong>By 2021,</strong> we had grown enough to renovate our
                home workspace. We expanded from 2 tables to{" "}
                <span className="text-[#C49B5C] font-semibold">4 tables</span>,
                creating more space and a smoother workflow.
              </p>

              <p className="leading-relaxed mb-3">
                <strong>Since then,</strong> we{"'"}ve been consistently
                manufacturing suits, sarees, and fabrics — preparing them from A
                to Z and selling to our customers who appreciate quality and
                tradition.
              </p>

              {/* Organic Colors Section */}
              <div className="bg-[#FDF8F4] p-4 my-6 rounded-lg border border-[#C49B5C]/20">
                <h3 className="text-xl md:text-2xl font-semibold text-[#2C1810] mb-2">
                  🌿 Our Organic Colors
                </h3>
                <p className="leading-relaxed mb-3">
                  At our karkhana, we believe in nature{"'"}s wisdom. That{"'"}s
                  why we use{" "}
                  <span className="font-semibold">
                    organic and natural colors
                  </span>
                  for our fabrics.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="w-5 h-5 rounded-full bg-red-600"></span>
                      <h4 className="font-semibold text-[#2C1810] text-sm">
                        Red Color
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600">
                      Made from rice grown in the fields. The rice is fermented
                      to make <span className="font-medium">gam</span>{" "}
                      (fermented rice paste), then mixed with{" "}
                      <span className="font-medium">fitkari</span> (alum) water
                      to create this beautiful, rich red.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="w-5 h-5 rounded-full bg-black"></span>
                      <h4 className="font-semibold text-[#2C1810] text-sm">
                        Black Color
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600">
                      Made from{" "}
                      <span className="font-medium">rust of iron</span>. The
                      rust is collected and processed, with{" "}
                      <span className="font-medium">aata</span>
                      (flour) added to ensure the right consistency for a deep,
                      rich black.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="w-5 h-5 rounded-full bg-amber-700"></span>
                      <h4 className="font-semibold text-[#2C1810] text-sm">
                        Brown & Blue
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600">
                      Both brown and blue colors are also prepared from
                      <span className="font-medium"> aata</span> (flour) base,
                      combined with other natural ingredients to create these
                      warm, earthy tones.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></span>
                      <h4 className="font-semibold text-[#2C1810] text-sm">
                        Other Colors
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600">
                      For our other color variations, we use
                      <span className="font-medium"> bender colors</span>
                      (synthetic) — but all colors are chosen to be{" "}
                      <span className="font-semibold">
                        organic and skin-friendly
                      </span>
                      .
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3 italic">
                  ✨ All our colors are prepared with care to ensure they are
                  safe, long-lasting, and gentle on the skin.
                </p>
              </div>

              <p className="leading-relaxed mb-3 mt-4">
                <span className="text-[#C49B5C] font-semibold">Today,</span> we
                {"'"}re proud of our 20+ years of experience. From working in
                others{"'"} homes to running our own karkhana with 4 tables and
                organic colors —
                <strong>
                  {" "}
                  it{"'"}s been a journey of hard work, patience, resilience,
                  and steady growth.
                </strong>
              </p>

              <div className="bg-[#2C1810] text-white p-4 rounded-lg text-center">
                <p className="text-base md:text-lg font-medium">
                  &quot;From 2 tables to 4 tables. From losses to learning. From
                  synthetic to organic. From others{"'"} homes to our own.&quot;
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default BlogPage;
