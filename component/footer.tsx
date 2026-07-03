// components/Footer.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FaInstagram, 
  FaFacebookF, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope,
  FaWhatsapp,
  FaTelegramPlane,
  FaChevronRight
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
                src="/logo.png" 
                alt="HCR Textile Logo" 
                width={180} 
                height={70} 
                className="w-[160px] sm:w-[180px] md:w-[200px] h-auto object-contain"
                priority
              />
            </Link>
            
            {/* ✅ INCREASED from text-sm to text-base */}
            <p className="text-base font-semibold tracking-wide text-[#5a4a3a] text-center sm:text-left">
              <span className="text-[#b8860b] font-bold">TRADITION</span> 
              {" WOVEN WITH "}
              <span className="text-[#b8860b] font-bold">TRUST</span>
            </p>
            
            {/* ✅ INCREASED from text-[0.65rem] to text-xs */}
            <p className="text-xs tracking-wide text-[#8a7a6a] text-center sm:text-left mb-3">
              HAND BLOCK PRINTED · PURE COTTON · HERITAGE CRAFT
            </p>
          </div>

          {/* Column 2 - Collections */}
          <div className="flex flex-col">
            {/* ✅ INCREASED from text-xs to text-sm */}
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#3a2a1a] mb-2.5 relative pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[20px] after:h-0.5 after:bg-[#b8860b]">
              Collections
            </h4>
            <ul className="space-y-1.5">
              {['Home','Saree', 'Suit', 'Dupatta'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`}
                    // ✅ INCREASED from text-xs to text-sm
                    className="text-[#6a5a4a] text-sm hover:text-[#b8860b] transition-all duration-300 inline-flex items-center gap-1 hover:translate-x-1"
                  >
                    <FaChevronRight className="text-[#b8860b] text-[8px] opacity-0 group-hover:opacity-100" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Quick Links */}
          <div className="flex flex-col">
            {/* ✅ INCREASED from text-xs to text-sm */}
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#3a2a1a] mb-2.5 relative pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[20px] after:h-0.5 after:bg-[#b8860b]">
              Quick Links
            </h4>
            <ul className="space-y-1.5">
              {['Home', 'About Us', 'Blog', 'Contact', 'FAQs'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item === 'Home' ? '' : item.toLowerCase().replace(' ', '-')}`}
                    // ✅ INCREASED from text-xs to text-sm
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
            {/* ✅ INCREASED from text-xs to text-sm */}
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#3a2a1a] mb-2.5 relative pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[20px] after:h-0.5 after:bg-[#b8860b]">
              Get in Touch
            </h4>
            
            <div className="space-y-1.5">
              {/* ✅ INCREASED from text-xs to text-sm */}
              <p className="flex items-start gap-2 text-sm text-[#5a4a3a]">
                <FaMapMarkerAlt className="text-[#b8860b] mt-0.5 flex-shrink-0" size={14} />
                <span className="leading-tight">
                  Bagru, Jaipur<br />
                  Rajasthan - 303007
                </span>
              </p>
              {/* ✅ INCREASED from text-xs to text-sm */}
              <p className="flex items-center gap-2 text-sm text-[#5a4a3a]">
                <FaPhoneAlt className="text-[#b8860b] flex-shrink-0" size={14} />
                <span>+91 7006980870</span>
              </p>
              {/* ✅ INCREASED from text-xs to text-sm */}
              <p className="flex items-center gap-2 text-sm text-[#5a4a3a]">
                <FaEnvelope className="text-[#b8860b] flex-shrink-0" size={14} />
                <span className="truncate">punitmundotiya24@gmail.com</span>
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
                href="#" 
                className="flex items-center justify-center w-7 h-7 rounded-full bg-[#f0ebe5] text-[#5a4a3a] hover:bg-[#0088cc] hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Telegram"
              >
                <FaTelegramPlane size={14} />
              </a>
               <a 
                href="#" 
                className="flex items-center justify-center w-7 h-7 rounded-full bg-[#f0ebe5] text-[#5a4a3a] hover:bg-[#E4405F] hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram size={14} />
              </a>
              <a 
                href="#" 
                className="flex items-center justify-center w-7 h-7 rounded-full bg-[#f0ebe5] text-[#5a4a3a] hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebookF size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar - ✅ INCREASED from text-[10px] to text-xs */}
        <div className="mt-4 pt-3 border-t border-[#e0d5c8] text-center text-xs text-[#9a8a7a] tracking-wider">
          <p>© {new Date().getFullYear()} HCR Textile. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;