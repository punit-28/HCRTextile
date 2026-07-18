// app/faqs/page.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  HelpCircle,
  Star,
  Clock,
  ArrowRight,
} from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQsPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "How can I place an order for a saree or suit?",
      answer:
        "To place an order, simply send us a screenshot of the saree or suit you like via WhatsApp or email. You can also call us directly to discuss your requirements. Once you confirm the design, we will arrange for courier delivery after the payment is completed.",
    },
    {
      id: 2,
      question: "Can I customize my saree or suit order?",
      answer:
        "Yes, absolutely! We offer full customization for all our sarees and suits. You can browse our collection, choose any design you like, and we will prepare your saree or suit ready as per your preferences. Just share your design choice with us!",
    },
    {
      id: 3,
      question: "How long does it take to prepare my order?",
      answer:
        "The preparation time depends on the complexity of the design and the current order volume. Once your order is ready, we will notify you. After that, you can make the payment, and we will courier your order to you immediately.",
    },
    {
      id: 4,
      question: "Are there any additional delivery charges?",
      answer:
        "No, we offer FREE shipping on all orders across India. There are no additional delivery charges.",
    },
    {
      id: 5,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major payment methods including UPI (Google Pay, PhonePe, Paytm), Credit Cards, Debit Cards, Net Banking, and all other digital payment options. All transactions are secure and encrypted for your safety.",
    },
    {
      id: 6,
      question: "What is your return policy?",
      answer:
        "We offer a 5-day return policy for single piece orders. If you purchase in bulk (100+ sarees/suits), the return policy is 3 days. Please note that pressing/ironing charges will be deducted from your refund amount when you return the items.",
    },
    {
      id: 7,
      question: "How do I initiate a return?",
      answer:
        "To initiate a return, please contact us. We will verify if the product is in good condition. If the pressing/ironing is damaged, you will need to pay the pressing charges. Once the product reaches us safely via courier and is verified, your refund will be processed.",
    },
    {
      id: 8,
      question: "Can I change the size of my saree?",
      answer:
        "The saree size is fixed and cannot be changed. However, customization is possible based on your order requirements. You can request specific blouse designs, border styles, or custom measurements during checkout.",
    },
    {
      id: 9,
      question: "What is the quality of your products?",
      answer:
        "Our saree quality is excellent with A-one quality fabric. All colors used are organic including black, blue, red, brown, and all other colors. If the color fades or bleeds, you can return the dress and we will process your refund.",
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf6ef] via-[#f5efe6] to-[#f0e8dc] pt-16 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Header Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#1a0f0a] via-[#2C1810] to-[#3d2218] rounded-2xl p-6 md:p-8 mb-8 shadow-2xl border border-[#C49B5C]/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C49B5C]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C49B5C]/20 rounded-full blur-2xl"></div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-[#C49B5C] to-[#D4AF37] rounded-xl shadow-lg">
                <HelpCircle size={22} className="text-white" />
              </div>
              <span className="text-[#C49B5C] text-sm font-semibold tracking-wider uppercase">
                FAQ
              </span>
              <div className="h-4 w-px bg-[#C49B5C]/30"></div>
              <span className="text-white/50 text-xs">Support Center</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-[#C49B5C] to-[#D4AF37] bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-white/70 text-base max-w-2xl leading-relaxed">
              Find answers to all your questions about ordering, customization,
              payments, and returns.
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 border border-[#C49B5C]/20">
                <Clock size={14} className="text-[#C49B5C]" />
                <span className="text-white/60 text-xs">
                  Response within 24 hrs
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 border border-[#C49B5C]/20">
                <Star size={14} className="text-[#C49B5C] fill-[#C49B5C]" />
                <span className="text-white/60 text-xs">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`bg-white rounded-2xl shadow-lg border transition-all duration-300 overflow-hidden ${
                openId === faq.id
                  ? "border-[#C49B5C] shadow-xl"
                  : "border-[#C49B5C]/20 hover:border-[#C49B5C]/40"
              }`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-left px-6 py-5 flex items-start gap-4 group"
              >
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`p-2.5 rounded-xl transition-all duration-300 ${
                      openId === faq.id
                        ? "bg-gradient-to-r from-[#C49B5C] to-[#D4AF37] text-white shadow-lg"
                        : "bg-[#C49B5C]/10 text-[#C49B5C] group-hover:bg-[#C49B5C]/20"
                    }`}
                  >
                    <HelpCircle size={20} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <span
                    className={`text-base font-semibold transition-colors duration-200 ${
                      openId === faq.id
                        ? "text-[#C49B5C]"
                        : "text-[#2C1810] group-hover:text-[#C49B5C]"
                    }`}
                  >
                    {faq.question}
                  </span>
                </div>

                <span className="flex-shrink-0 ml-4 mt-1">
                  {openId === faq.id ? (
                    <ChevronUp size={20} className="text-[#C49B5C]" />
                  ) : (
                    <ChevronDown
                      size={20}
                      className="text-[#8B6B3D] group-hover:text-[#C49B5C] transition-colors duration-200"
                    />
                  )}
                </span>
              </button>

              {openId === faq.id && (
                <div className="px-6 pb-5 pt-0">
                  <div className="border-t border-[#C49B5C]/20 pt-4">
                    <p className="text-[#4a3728] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Support */}
          <div className="bg-gradient-to-br from-[#C49B5C]/10 via-[#D4AF37]/5 to-transparent rounded-2xl p-6 border border-[#C49B5C]/30 shadow-lg">
            <h2 className="text-lg font-bold text-[#2C1810] mb-3 flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-[#C49B5C] to-[#D4AF37] rounded-lg shadow-lg">
                <Phone size={18} className="text-white" />
              </div>
              Need Help? Contact Us
            </h2>
            <p className="text-[#8B6B3D] text-sm mb-4">
              Can{"'"}t find what you{"'"}re looking for? Reach out to us
              directly.
            </p>

            <div className="space-y-3">
              <Link
                href="/contact"
                className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group border border-[#C49B5C]/20 hover:border-[#C49B5C]"
              >
                <div className="p-2 bg-gradient-to-r from-[#C49B5C] to-[#D4AF37] rounded-full shadow-md">
                  <Phone size={16} className="text-white" />
                </div>
                <span className="flex-1 text-sm font-medium text-[#2C1810]">
                  Call Support
                </span>
                <ArrowRight
                  size={16}
                  className="text-[#C49B5C] group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group border border-[#C49B5C]/20 hover:border-[#C49B5C]"
              >
                <div className="p-2 bg-gradient-to-r from-[#C49B5C] to-[#D4AF37] rounded-full shadow-md">
                  <Mail size={16} className="text-white" />
                </div>
                <span className="flex-1 text-sm font-medium text-[#2C1810]">
                  Email Support
                </span>
                <ArrowRight
                  size={16}
                  className="text-[#C49B5C] group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>

          {/* Quick Help */}
          <div className="bg-white rounded-2xl p-6 border border-[#C49B5C]/20 shadow-lg hover:border-[#C49B5C]/40 transition-all duration-300">
            <h2 className="text-lg font-bold text-[#2C1810] mb-4 flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-[#C49B5C] to-[#D4AF37] rounded-lg shadow-lg">
                <Clock size={18} className="text-white" />
              </div>
              Quick Info
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#faf6ef] transition-colors border border-transparent hover:border-[#C49B5C]/20">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#C49B5C] to-[#D4AF37] mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-[#2C1810]">
                    Response Time
                  </p>
                  <p className="text-xs text-[#8B6B3D]">
                    We respond within 14 hours
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#faf6ef] transition-colors border border-transparent hover:border-[#C49B5C]/20">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#C49B5C] to-[#D4AF37] mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-[#2C1810]">
                    Support Hours
                  </p>
                  <p className="text-xs text-[#8B6B3D]">
                    Sun-Sat: 9:00 AM - 10:00 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#faf6ef] transition-colors border border-transparent hover:border-[#C49B5C]/20">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#C49B5C] to-[#D4AF37] mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-[#2C1810]">
                    Support Email
                  </p>
                  <p className="text-xs text-[#8B6B3D]">
                    punitmundotiya23@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
