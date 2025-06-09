import React, { useState } from "react";
import { useAuthStore, useNotifyStore } from "@/lib/store";
import api from "@/lib/api";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

export default function AccountSettings() {

  // Hooks
  const resetAuth = useAuthStore((state) => state.resetAuth);
  const {
    data: currentUserData,
    error: currentUserError,
    isPending: currentUserPending,
  } = useCurrentUser();
  const [deleteConfirmationVisibility, setDeleteConfirmationVisibility] =
    useState<boolean>(false);
  const router = useRouter();
  const setNotification = useNotifyStore((state) => state.setNotification)

  const handleDeleteAccount = async () => {
    try {      
      await api.delete("/api/users/" + currentUserData?.id + "/");
      resetAuth();
      router.push("/login");
      return null;
    } catch {
      setNotification("error", "Unable to Delete Account.")
    }
  };

  const handleLogout = () => {
    resetAuth();
    router.push("/login");
    return null;
  };

  if (currentUserPending) {
    return;
  }

  if (currentUserError) {
    return;
  }

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
        onClick={() => setDeleteConfirmationVisibility(true)}
      >
        Delete Account
      </button>
      {deleteConfirmationVisibility && (
        <div className="bg-gray-200 rounded relative p-5 -top-10">
          <button
            className="absolute top-0 right-2 cursor-pointer"
            onClick={() => setDeleteConfirmationVisibility(false)}
          >
            x
          </button>
          <h2 className="text-lg mb-2">
            Are you sure you would like to delete your account?
          </h2>
          <button
            className="border bg-red-500 text-white rounded-md py-2 w-1/2 mt-2 h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70"
            onClick={() => handleDeleteAccount()}
          >
            Confirm
          </button>{" "}
        </div>
      )}
    </div>
  );
}
