import  GoogleSignInButton  from "@/component/GoogleSignInButton"; // Adjust import path as needed

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f3ea] to-[#e8ddd0] p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#d4c5a9]/30 p-8 w-full max-w-sm">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto w-14 h-14 bg-gradient-to-br from-[#C49B5C] to-[#8B6B3D] rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="mt-4 text-xl font-bold text-[#2C1810]">Welcome Back</h2>
          <p className="mt-1 text-xs text-[#8B6B3D]">Sign in to continue</p>
        </div>
        
        <div className="mt-6 flex justify-center">
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}