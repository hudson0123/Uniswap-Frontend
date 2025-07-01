import React from 'react'

interface SingleButtonModalProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

export default function SingleButtonModal({ title, description, buttonText, onButtonClick }: SingleButtonModalProps) {
  return (
    <div className='fixed h-screen w-screen top-0 left-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/2 h-1/3'>
        <h2 className='text-3xl font-semibold'>{title}</h2>
        <p className='text-gray-600 mt-2'>{description}</p>
        <button onClick={onButtonClick} className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'>
          {buttonText}
        </button>
      </div>
    </div>
  )
}
