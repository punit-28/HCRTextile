"use client"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignInButton() {
  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white border border-[#d4c5a9]/40 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200"
    >
      <FcGoogle className="w-5 h-5" />
      <span className="text-sm font-medium text-[#2C1810]">Sign in with Google</span>
    </button>
  )
}