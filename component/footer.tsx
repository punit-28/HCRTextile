// components/Footer.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFileInvoice,
  FaWhatsapp,
  FaTelegramPlane,
  FaChevronRight,
} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-[#faf8f5] text-[#4a3f35] pt-6 pb-3 px-4 border-t-2 border-[#e8d5c4]">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Optimized Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-10">
          {/* Column 1 - Brand Tagline - Hidden on mobile */}
          <div className="hidden lg:flex lg:flex-col lg:items-start">
            <Link href="/" className="mb-3 inline-block">
              <Image
                src="/Logo.png"
                alt="HCR Textile Logo"
                width={240}
                height={90}
                className="w-55 xl:w-62.5 h-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Column 2 - Collections */}
          <div className="flex flex-col">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#3a2a1a] mb-2.5 relative pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[20px] after:h-0.5 after:bg-[#b8860b]">
              Our Services
            </h4>

            <ul className="space-y-1.5">
              {[
                "Custom Orders",
                "Bulk Orders",
                "Wholesale",
                "Worldwide Shipping",
                "Gift Packaging",
                "24/7 Support",
              ].map((item) => (
                <li key={item}>
                  <span className="text-[#6a5a4a] text-sm hover:text-[#b8860b] transition-all duration-300 inline-flex items-center gap-2 group cursor-pointer">
                    <FaChevronRight className="text-[#b8860b] text-[8px] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#3a2a1a] mb-2.5 relative pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[20px] after:h-0.5 after:bg-[#b8860b]">
              Quick Links
            </h4>
            <ul className="space-y-1.5">
              {["Home", "Dashboard", "Blog", "Contact", "FAQs"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "-")}`}
                    className="text-[#6a5a4a] text-sm hover:text-[#b8860b] transition-all duration-300 inline-flex items-center gap-1 hover:translate-x-1"
                  >
                    <FaChevronRight className="text-[#b8860b] text-[8px]" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Address & Social */}
          <div className="col-span-2 lg:col-span-1 mt-2 lg:mt-0">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#3a2a1a] mb-2.5 relative pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[20px] after:h-0.5 after:bg-[#b8860b]">
              Get in Touch
            </h4>

            <div className="space-y-2">
              {/* Address */}
              <p className="flex items-start gap-2 text-sm text-[#5a4a3a]">
                <FaMapMarkerAlt
                  className="text-[#b8860b] mt-0.5 flex-shrink-0"
                  size={14}
                />
                <span className="leading-tight">
                  Bagru, Jaipur
                  <br />
                  Rajasthan - 303007
                </span>
              </p>

              {/* Phone */}
              <p className="flex items-center gap-2 text-sm text-[#5a4a3a]">
                <FaPhoneAlt
                  className="text-[#b8860b] flex-shrink-0"
                  size={14}
                />
                <span>+91 7006980870</span>
              </p>

              {/* Email */}
              <p className="flex items-center gap-2 text-sm text-[#5a4a3a]">
                <FaEnvelope
                  className="text-[#b8860b] flex-shrink-0"
                  size={14}
                />
                <span className="truncate">punitmundotiya24@gmail.com</span>
              </p>

              {/* GST Number */}
              <p className="flex items-center gap-2 text-sm text-[#5a4a3a]">
                <FaFileInvoice
                  className="text-[#b8860b] flex-shrink-0"
                  size={14}
                />
                <span>
                  <span>GSTIN:</span> 08AVAPC6237G1ZV
                </span>
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="mt-2.5 pt-2 border-t border-[#e0d5c8] flex gap-3">
              <a
                href="https://wa.me/917006980870"
                className="flex items-center justify-center w-7 h-7 rounded-full bg-[#f0ebe5] text-[#5a4a3a] hover:bg-[#25D366] hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={14} />
              </a>
              <a
                href="https://t.me/+917006980870"
                className="flex items-center justify-center w-7 h-7 rounded-full bg-[#f0ebe5] text-[#5a4a3a] hover:bg-[#0088cc] hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Telegram"
              >
                <FaTelegramPlane size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#e0d5c8] text-center text-xs text-[#9a8a7a] tracking-wider">
          <p>© {new Date().getFullYear()} HCR Textile. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
