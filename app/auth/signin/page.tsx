import GoogleSignInButton from "@/component/GoogleSignInButton";
import { Shield, Sparkles, Crown } from "lucide-react";

export default function SignIn() {
  return (
    <div className="w-full min-h-screen bg-[#faf6ef] relative overflow-hidden">
      
      {/* Heritage-inspired decorative elements - subtle and elegant */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C49B5C]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B6B3D]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      {/* Traditional Motif - subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-20 left-20 w-8 h-8 border-2 border-[#8B6B3D] rotate-45" />
        <div className="absolute bottom-20 right-20 w-12 h-12 border-2 border-[#C49B5C] rotate-12" />
        <div className="absolute top-1/3 right-1/4 w-6 h-6 border border-[#8B6B3D] rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-10 h-10 border-2 border-[#C49B5C] rotate-45" />
      </div>

      {/* Main content */}
      <div className="flex items-center justify-center min-h-screen pt-20 md:pt-24 lg:pt-28 px-4">
        <div className="relative w-full max-w-md">
          
          {/* Main card - matching home page card style */}
          <div className="bg-white rounded-2xl shadow-lg border border-[#d4c5a9]/30 p-6 md:p-8 transition-all duration-300 hover:shadow-xl">
            
            {/* Brand Section - matching home page typography */}
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C1810] tracking-tight">
                Welcome 
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#C49B5C] to-[#8B6B3D] mx-auto mt-2 rounded-full" />
              <p className="text-sm text-gray-600 font-light">
                Sign in to explore our heritage collection
              </p>
            </div>

            {/* Feature badges - Heritage theme colors */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: "Secure", color: "text-[#8B6B3D]" },
                { icon: Sparkles, label: "Handcrafted", color: "text-[#C49B5C]" },
                { icon: Crown, label: "Heritage", color: "text-[#2C1810]" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="text-center p-3 bg-[#f8f3ea] rounded-xl border border-[#d4c5a9]/30 transition-all hover:border-[#C49B5C]/50 hover:shadow-md group"
                >
                  <item.icon className={`w-5 h-5 ${item.color} mx-auto transition-transform group-hover:scale-110`} />
                  <p className="text-[10px] text-[#2C1810]/70 mt-1 font-medium tracking-wide">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Google Sign In Button */}
            <div className="mt-8">
              <div className="relative group">
                {/* Subtle golden glow - matching home page button gradient */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C49B5C]/20 via-[#8B6B3D]/20 to-[#C49B5C]/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative cursor-events-auto">
                  <GoogleSignInButton />
                </div>
              </div>
              
              {/* Decorative separator - matching home page style */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#d4c5a9]/30"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-[10px] text-[#8B6B3D]/60 font-medium tracking-widest uppercase">
                    ✦ trusted since 2024 ✦
                  </span>
                </div>
              </div>
            </div>

            {/* Footer text - matching home page */}
            <p className="text-center text-[10px] text-gray-400 mt-4 tracking-wide">
              By continuing, you agree to our{" "}
              <span className="text-[#8B6B3D] hover:text-[#C49B5C] transition-colors">
                Terms
              </span>{" "}
              &amp;{" "}
              <span  className="text-[#8B6B3D] hover:text-[#C49B5C] transition-colors">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}