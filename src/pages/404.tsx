import React from 'react'
import Link from 'next/link'

export default function Error404() {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center bg-gray-100'>
      <h1 className='text-4xl font-bold text-gray-800'>404 - Page Not Found</h1>
      <p className='text-gray-600 mt-4'>The page you are looking for does not exist.</p>
      <Link href='/auth/login' className='text-blue-500 hover:underline mt-4'>Go back to Home</Link>
    </div>
  )
}
