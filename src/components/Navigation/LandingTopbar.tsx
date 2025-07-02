import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function LandingTopbar() {
  return (
    <nav className="w-full bg-white shadow-sm z-10 py-4 h-[9vh]">
      <div className="max-w-screen-3xl mx-auto flex items-center justify-between px-4 sm:px-10 h-full">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold text-black">
          <Image
            src="/uniswap.png"
            alt="Chat"
            width={150}
            height={150}
            className="mt-2 bg-transparent transition duration-150 hover:scale-105"
          />
        </Link>
        <div className="flex items-center gap-4">
          {/* Sign In Button */}
          <Link href="/auth/login" className="cursor-pointer">
            <h2 className="font-sans mt-2 hover:text-gray-500 text-lg mr-5">
              Sign In
            </h2>
          </Link>
          {/* Sign Up Button */}
          <Link href="/auth/register" className="cursor-pointer">
            <h2 className="font-sans mt-2 hover:bg-red-400 text-lg mr-5 cursor-pointer bg-red-500 px-4 py-2 rounded-lg text-white">
              Get Started
            </h2>
          </Link>
        </div>
      </div>
    </nav>
  );
}
