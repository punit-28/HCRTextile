"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  User,
  Menu,
  X,
  ChevronDown,
  Globe,
  ShoppingBag,
  Heart,
  RefreshCw,
  WifiOff,
  LogOut,
  Settings,
  UserCircle,
  LayoutDashboard,
} from "lucide-react";
import {
  useCurrency,
  CURRENCIES,
  CurrencyCode,
} from "@/app/context/CurrencyContext";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Saree", href: "/saree" },
  { name: "Suit", href: "/suit" },
  { name: "Dupatta", href: "/dupatta" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isMobileCurrencyOpen, setIsMobileCurrencyOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const currencyRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const {
    currency,
    setCurrency,
    symbol,
    rates,
    isLoading,
    lastUpdated,
    refreshRates,
    isOffline,
  } = useCurrency();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        currencyRef.current &&
        !currencyRef.current.contains(event.target as Node)
      ) {
        setIsCurrencyOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
        setIsMobileCurrencyOpen(false);
        setIsProfileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCurrencyChange = useCallback(
    (code: CurrencyCode) => {
      setCurrency(code);
      setIsCurrencyOpen(false);
      setIsMobileCurrencyOpen(false);
    },
    [setCurrency],
  );

  const handleRefreshRates = useCallback(async () => {
    setIsRefreshing(true);
    await refreshRates();
    setTimeout(() => setIsRefreshing(false), 1000);
  }, [refreshRates]);

  const getTimeAgo = useCallback((date: Date | null) => {
    if (!date) return "Never";
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
    setIsProfileOpen(false);
    setOpen(false);
  };

  const isAuthenticated = status === "authenticated";
  const isLoadingSession = status === "loading";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? "bg-white/98 backdrop-blur-2xl shadow-lg border-b border-[#d4c5a9]/40"
            : "bg-[#faf6ef]/95 backdrop-blur-xl border-b border-[#d4c5a9]/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 group">
              <div className="relative w-28 sm:w-40 md:w-52 h-10 sm:h-12 md:h-14 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/Nav_Logo.png"
                  alt="HCR Textile"
                  
                  fill
                  // priority
                  className="object-contain"
                  sizes="(max-width:640px) 112px, (max-width:768px) 160px, 208px"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              {links.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-[14px] xl:text-[15px] font-medium text-[#2C1810] hover:text-[#8B6B3D] transition-colors duration-300 group py-2 tracking-wide"
                >
                  {item.name}
                  <span className="absolute inset-x-0 -bottom-0 h-[2px] bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Link>
              ))}
            </nav>

            {/* Desktop Right Icons */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Wishlist */}
              <button
                title="Wishlist"
                className="relative p-2 hover:bg-[#f0e8dc] rounded-full transition-all duration-300 hover:scale-110 group"
              >
                <Heart
                  size={18}
                  className="text-[#2C1810] group-hover:text-[#8B6B3D] transition-colors"
                />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow">
                  0
                </span>
              </button>

              {/* Cart */}
              <button className="relative p-2 hover:bg-[#f0e8dc] rounded-full transition-all duration-300 hover:scale-110 group">
                <ShoppingBag
                  size={18}
                  className="text-[#2C1810] group-hover:text-[#8B6B3D] transition-colors"
                />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow ring-2 ring-white">
                  0
                </span>
              </button>

              {/* Profile / Account - Updated */}
              <div className="relative" ref={profileRef}>
                {isLoadingSession ? (
                  <div className="w-9 h-9 rounded-full bg-[#f0e8dc] animate-pulse"></div>
                ) : isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="relative flex items-center gap-2 p-1.5 hover:bg-[#f0e8dc] rounded-full transition-all duration-300 hover:scale-105 group"
                    >
                      <div className="w-8 h-8 rounded-full border-2 border-[#C49B5C] overflow-hidden bg-[#f8f3ea] shadow-sm">
                        <img
                          src={
                            session.user?.image ||
                            `https://ui-avatars.com/api/?name=${session.user?.name || "User"}&background=C49B5C&color=fff&size=32`
                          }
                          alt={session.user?.name || "User"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <ChevronDown
                        size={14}
                        className={`text-[#8B6B3D] transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Profile Dropdown */}
                    {isProfileOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsProfileOpen(false)}
                        ></div>
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#d4c5a9]/30 overflow-hidden z-50 animate-fadeIn">
                          <div className="px-4 py-4 border-b border-[#d4c5a9]/20 bg-gradient-to-r from-[#f8f3ea] to-white">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full border-2 border-[#C49B5C] overflow-hidden shadow-sm">
                                <img
                                  src={
                                    session.user?.image ||
                                    `https://ui-avatars.com/api/?name=${session.user?.name || "User"}&background=C49B5C&color=fff&size=48`
                                  }
                                  alt={session.user?.name || "User"}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#2C1810] truncate">
                                  {session.user?.name || "User"}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {session.user?.email || ""}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="py-2">
                            <Link
                              href="/dashboard"
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#2C1810] hover:bg-[#f0e8dc] transition-colors mx-2 rounded-lg"
                            >
                              <LayoutDashboard
                                size={18}
                                className="text-[#C49B5C]"
                              />
                              <span>Dashboard</span>
                            </Link>
                            
                            <div className="h-px bg-[#d4c5a9]/30 mx-3 my-2"></div>
                            <button
                              onClick={handleSignOut}
                              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors mx-2 rounded-lg"
                            >
                              <LogOut size={18} />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white text-sm font-medium rounded-full hover:shadow-lg transition-all hover:scale-105 hover:shadow-[#C49B5C]/30 active:scale-95"
                  >
                    <User size={18} />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>

              {/* Currency Dropdown */}
              <div className="relative" ref={currencyRef}>
                <button
                  onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#2C1810] hover:text-[#8B6B3D] transition px-3 py-1.5 hover:bg-[#f0e8dc] rounded-full"
                >
                  <Globe size={15} />
                  <span>
                    {symbol} {currency}
                  </span>
                  {isOffline && <WifiOff size={13} className="text-red-500" />}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-300 ${isCurrencyOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isCurrencyOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#d4c5a9]/30 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-[#d4c5a9]/20 bg-[#f8f3ea] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe size={14} className="text-[#C49B5C]" />
                        <span className="text-xs font-semibold text-[#2C1810]">
                          Select Currency
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400">
                          {isLoading
                            ? "Loading..."
                            : `Updated ${getTimeAgo(lastUpdated)}`}
                        </span>
                        <button
                          title="Refresh Rates"
                          onClick={handleRefreshRates}
                          disabled={isRefreshing}
                          className="p-1 hover:bg-[#e8ddd0] rounded-full transition disabled:opacity-40"
                        >
                          <RefreshCw
                            size={12}
                            className={`text-[#C49B5C] ${isRefreshing ? "animate-spin" : ""}`}
                          />
                        </button>
                      </div>
                    </div>
                    {isOffline && (
                      <p className="text-[10px] text-red-500 px-4 py-1.5 flex items-center gap-1 bg-red-50 border-b border-red-100">
                        <WifiOff size={10} /> Using cached rates
                      </p>
                    )}
                    <div className="py-1 max-h-72 overflow-y-auto">
                      {Object.entries(CURRENCIES).map(([code, data]) => (
                        <button
                          key={code}
                          onClick={() =>
                            handleCurrencyChange(code as CurrencyCode)
                          }
                          className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between group transition-colors ${
                            currency === code
                              ? "bg-[#f8f3ea]"
                              : "hover:bg-[#f0e8dc]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className=" text-[#C49B5C] text-base w-6 text-center">
                              {data.symbol}
                            </span>
                            <div>
                              <span
                                className={`font-medium ${currency === code ? "text-[#8B6B3D]" : "text-[#2C1810]"}`}
                              >
                                {code}
                              </span>
                              <span className="text-xs text-gray-400 ml-2">
                                {data.name}
                              </span>
                            </div>
                          </div>
                          {currency === code ? (
                            <span className="w-2 h-2 bg-[#C49B5C] rounded-full" />
                          ) : (
                            rates && (
                              <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                {rates[code]?.toFixed(2) || "-"}
                              </span>
                            )
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Header Right — icons + hamburger */}
            <div className="flex lg:hidden items-center gap-1">
              <button className="relative p-2 rounded-full hover:bg-[#f0e8dc] transition-colors">
                <Heart size={20} className="text-[#2C1810]" />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white text-[9px] rounded-full flex items-center justify-center font-bold shadow">
                  0
                </span>
              </button>
              <button className="relative p-2 rounded-full hover:bg-[#f0e8dc] transition-colors">
                <ShoppingBag size={20} className="text-[#2C1810]" />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white text-[9px] rounded-full flex items-center justify-center font-bold shadow ring-2 ring-white">
                  0
                </span>
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-full hover:bg-[#f0e8dc] transition-colors ml-0.5"
                aria-label="Toggle menu"
              >
                {open ? (
                  <X size={22} className="text-[#2C1810]" />
                ) : (
                  <Menu size={22} className="text-[#2C1810]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[min(85vw,340px)] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#d4c5a9]/30 bg-[#faf6ef]">
            <div className="relative w-28 h-9">
              <Image
                src="/Nav_Logo.png"
                alt="HCR Textile"
                fill
                className="object-contain"
                sizes="112px"
              />
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-full hover:bg-[#f0e8dc] transition-colors"
            >
              <X size={20} className="text-[#2C1810]" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto py-3 px-3">
            {/* Mobile Profile Section - Updated */}
            {isLoadingSession ? (
              <div className="px-3 py-4 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#f0e8dc]"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-[#f0e8dc] rounded w-24 mb-2"></div>
                    <div className="h-3 bg-[#f0e8dc] rounded w-32"></div>
                  </div>
                </div>
              </div>
            ) : isAuthenticated ? (
              <div className="px-3 py-3 mb-2 bg-[#f8f3ea] rounded-2xl border border-[#d4c5a9]/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-[#C49B5C] overflow-hidden">
                    <img
                      src={
                        session.user?.image ||
                        "https://ui-avatars.com/api/?name=User&background=C49B5C&color=fff&size=48"
                      }
                      alt={session.user?.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#2C1810] truncate">
                      {session.user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {session.user?.email || ""}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 mx-3 mb-3 px-4 py-3 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white font-medium rounded-xl hover:shadow-lg transition-all"
              >
                <User size={18} />
                Sign In
              </Link>
            )}

            {/* Navigation Links */}
            <div className="mb-2">
              <p className="text-[10px] font-semibold text-[#C49B5C] uppercase tracking-widest px-3 mb-2">
                Menu
              </p>
              {links.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#f0e8dc] transition-all duration-200 text-[15px] font-medium text-[#2C1810] hover:text-[#8B6B3D] group"
                >
                  <span className="w-1 h-4 bg-gradient-to-b from-[#C49B5C] to-[#8B6B3D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="h-px bg-[#d4c5a9]/40 mx-3 my-1" />

            {/* Account & Wishlist - Updated for authenticated users */}
            <div className="my-3">
              <p className="text-[10px] font-semibold text-[#C49B5C] uppercase tracking-widest px-3 mb-2">
                Account
              </p>

              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-[#f0e8dc] transition-colors text-[15px] font-medium text-[#2C1810] hover:text-[#8B6B3D]"
                  >
                    <LayoutDashboard size={18} className="text-[#8B6B3D]" />
                    Dashboard
                  </Link>
                  {/* <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-[#f0e8dc] transition-colors text-[15px] font-medium text-[#2C1810] hover:text-[#8B6B3D]"
                  >
                    <UserCircle size={18} className="text-[#8B6B3D]" />
                    My Profile
                  </Link> */}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-red-50 transition-colors text-[15px] font-medium text-red-600"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-[#f0e8dc] transition-colors text-[15px] font-medium text-[#2C1810] hover:text-[#8B6B3D]">
                    <User size={18} className="text-[#8B6B3D]" />
                    My Account
                  </button>
                  <button className="flex items-center justify-between w-full px-3 py-3 rounded-xl hover:bg-[#f0e8dc] transition-colors text-[15px] font-medium text-[#2C1810] hover:text-[#8B6B3D]">
                    <div className="flex items-center gap-3">
                      <Heart size={18} className="text-[#8B6B3D]" />
                      Wishlist
                    </div>
                    <span className="bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      0
                    </span>
                  </button>
                  <button className="flex items-center justify-between w-full px-3 py-3 rounded-xl hover:bg-[#f0e8dc] transition-colors text-[15px] font-medium text-[#2C1810] hover:text-[#8B6B3D]">
                    <div className="flex items-center gap-3">
                      <ShoppingBag size={18} className="text-[#8B6B3D]" />
                      Cart
                    </div>
                    <span className="bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      0
                    </span>
                  </button>
                </>
              )}
            </div>

            <div className="h-px bg-[#d4c5a9]/40 mx-3 my-1" />

            {/* Currency Section - Same as before */}
            <div className="my-3">
              <p className="text-[10px] font-semibold text-[#C49B5C] uppercase tracking-widest px-3 mb-2">
                Currency
              </p>
              <div className="mx-3 mb-2 flex items-center justify-between px-3 py-2.5 bg-[#f8f3ea] rounded-xl border border-[#d4c5a9]/30">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-[#C49B5C]" />
                  <span className="text-sm text-[#2C1810]">
                    {isLoading
                      ? "Updating..."
                      : `Updated ${getTimeAgo(lastUpdated)}`}
                  </span>
                  {isOffline && <WifiOff size={13} className="text-red-500" />}
                </div>
                <button
                  onClick={handleRefreshRates}
                  disabled={isRefreshing}
                  className="flex items-center gap-1 px-2 py-1 bg-white rounded-lg border border-[#d4c5a9]/40 text-xs text-[#8B6B3D] font-medium disabled:opacity-40 transition-colors hover:bg-[#f0e8dc]"
                >
                  <RefreshCw
                    size={12}
                    className={isRefreshing ? "animate-spin" : ""}
                  />
                  Refresh
                </button>
              </div>

              <button
                onClick={() => setIsMobileCurrencyOpen(!isMobileCurrencyOpen)}
                className="flex items-center justify-between w-full px-3 py-3 mx-0 rounded-xl hover:bg-[#f0e8dc] transition-colors text-[15px] font-medium text-[#2C1810]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl text-[#C49B5C]">
                    {CURRENCIES[currency]?.symbol}
                  </span>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-sm font-semibold text-[#2C1810]">
                      {currency}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {CURRENCIES[currency]?.name}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-[#C49B5C] transition-transform duration-300 ${isMobileCurrencyOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isMobileCurrencyOpen && (
                <div className="mt-1 mx-0 space-y-0.5 rounded-xl overflow-hidden border border-[#d4c5a9]/20">
                  {Object.entries(CURRENCIES).map(([code, data]) => (
                    <button
                      key={code}
                      onClick={() => handleCurrencyChange(code as CurrencyCode)}
                      className={`flex items-center justify-between w-full px-4 py-3 text-sm transition-colors ${
                        currency === code
                          ? "bg-[#f0e8dc] text-[#8B6B3D]"
                          : "bg-white hover:bg-[#f8f3ea] text-[#2C1810]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl w-7 text-center text-[#C49B5C]">
                          {data.symbol}
                        </span>
                        <div className="flex flex-col items-start leading-tight">
                          <span className="font-semibold text-sm">{code}</span>
                          <span className="text-[10px] text-gray-400">
                            {data.name}
                          </span>
                        </div>
                      </div>
                      {currency === code && (
                        <span className="w-2.5 h-2.5 bg-[#C49B5C] rounded-full shadow" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
