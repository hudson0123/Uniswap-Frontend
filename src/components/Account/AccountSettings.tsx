import React from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/lib/store";
import { useModalStore } from "@/lib/store";

export default function AccountSettings() {

  // Hooks
  const resetAuth = useAuthStore((state) => state.resetAuth);
  const setModalOpen = useModalStore((state) => state.setModalOpen);
  const router = useRouter();

  const handleLogout = () => {
    resetAuth();
    router.push("/auth/login");
    return null;
  };

  return (
    <div className="relative">
      <button
        className="block border bg-black text-white rounded-md py-2 w-1/2 mt-5 h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70"
        onClick={handleLogout}
      >
        Logout
      </button>
      <button
        className="border bg-red-500 text-white rounded-md py-2 w-1/2 mt-2 h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70"
        onClick={() => setModalOpen("deleteAccount")}
      >
        Delete Account
      </button>
    </div>
  );
}
