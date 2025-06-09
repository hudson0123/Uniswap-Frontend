import React from 'react'
import Link from 'next/link'

export default function LandingTopbar() {
  return (
    <nav className='fixed p-4 px-10 w-full bg-gray-500'>
      <div className="flex flex-wrap justify-between mx-auto">
        <Link href="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UniSwap</span>
        </Link>
        <div className='flex justify-end items-center'>
          <Link href="/login">
            <button className='cursor-pointer border bg-white px-4 py-1 rounded text-black hover: hover:bg-gray-200 transform duration-200'>Login</button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
