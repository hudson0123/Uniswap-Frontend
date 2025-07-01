import { useModalStore } from "@/lib/store";
import React from "react";
import Image from "next/image";
interface SingleButtonModalProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

export default function SingleButtonModal({
  title,
  description,
  buttonText,
  onButtonClick,
}: SingleButtonModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <div onClick={closeModal} className="fixed h-screen w-screen top-0 left-0 bg-black/50 flex items-center justify-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="flex relative bg-white p-4 rounded-lg shadow-lg w-120 h-45 flex-col">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="flex flex-col-2 mt-auto">
          <button
            onClick={closeModal}
            className="mt-auto ml-auto bg-white border-1 border-gray-300 hover:bg-gray-50 py-1 px-4 rounded-lg transition duration-100 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={onButtonClick}
            className="mt-auto ml-2 bg-red-500 hover: hover:bg-red-400 text-nowrap text-white py-1 px-4 rounded-lg transition duration-100 cursor-pointer"
          >
            {buttonText}
          </button>
        </div>
        <Image
          src="/x.svg"
          alt="Close"
          width={24}
          height={24}
          className="absolute top-2 right-2 cursor-pointer rounded-full bg-gray-200 p-1 hover:bg-gray-300 text-xs"
          onClick={closeModal}
        />
      </div>
    </div>
  );
}
