import { useModalStore } from "@/lib/store";
import React, { useState } from "react";
import Image from "next/image";
import LoadingSpinner from "../Loading/LoadingSpinner";

export default function DestructiveModal() {
  const modalStore = useModalStore();
  const [loading, setLoading] = useState(false)

  if (typeof modalStore.destructive == "object") {
    const onClick = modalStore.destructive.button.onClick;

    return (
      <div
        onClick={() => modalStore.closeModal("destructive")}
        className="opacity-0 animate-fade-in fixed h-screen w-screen top-0 left-0 bg-black/50 backdrop-blur-sm transition duration-200 ease-in flex items-center justify-center z-50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex relative bg-white p-4 rounded-lg shadow-lg w-120 h-45 flex-col"
        >
          <h2 className="text-xl font-semibold">
            {modalStore.destructive.title}
          </h2>
          <p className="text-gray-600 mt-2 max-w-90">
            {modalStore.destructive.subtitle}
          </p>
          <div className="flex flex-col-2 mt-auto">
            <button
              onClick={() => modalStore.closeModal("destructive")}
              className="mt-auto h-8 w-20 ml-auto bg-white border-1 border-gray-300 hover:bg-gray-50 py-1 px-4 rounded-lg transition duration-100 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                setLoading(true)
                onClick()
              }}
              className="relative h-8 w-fit min-w-30 mt-auto ml-2 bg-red-500 hover: hover:bg-red-400 text-nowrap text-white py-1 px-4 rounded-lg transition duration-100 cursor-pointer"
            >
              {loading ? <LoadingSpinner /> : modalStore.destructive.button.label}
            </button>
          </div>
          <Image
            src="/x.svg"
            alt="Close"
            width={24}
            height={24}
            className="absolute top-2 right-2 cursor-pointer rounded-full bg-gray-200 p-1 hover:bg-gray-300 text-xs"
            onClick={() => modalStore.closeModal("destructive")}
          />
        </div>
      </div>
    );
  }
}
