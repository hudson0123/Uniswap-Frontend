import React from "react";
import Image from "next/image";

export default function SearchUsers() {
  return (
    <div className="relative not-visited: bg-white p-10 rounded-2xl shadow-xl w-1/2 h-[80vh]">
      <h1 className="font-medium text-3xl">Connect</h1>
      <input
        placeholder="Search for a member"
        type="text"
        className="bg-[#E8E8E8] pl-13 mt-4 py-3 text-lg w-full rounded-full"
      />
      <Image
        src="/search.svg"
        width={100}
        height={100}
        alt="profile"
        className="w-6 h-7 top-26 left-14 rounded-full absolute"
      />
    </div>
  );
}
