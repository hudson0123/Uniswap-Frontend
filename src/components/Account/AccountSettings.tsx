import React, { useState } from "react";
import { useAuthStore } from "@/lib/store";
import DeleteAccountConfirmation from "./DeleteAccountConfirmation";
import api from "@/lib/api";

export default function AccountSettings() {
  const logout = useAuthStore((state) => state.logout);
  const current_user = useAuthStore((state) => state.current_user);
  const [deleteConfirmationVisibility, setDeleteConfirmationVisibility] =
    useState<boolean>(false);

  const handleDeleteAccount = async () => {
    await api.delete("/api/users/" + current_user?.id + "/");
    logout()
  };

  return (
    <div className="relative">
      <button
        className="block border bg-black text-white rounded-md py-2 w-1/2 mt-5 h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70"
        onClick={logout}
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
          <h2 className="text-lg mb-2">Are you sure you would like to delete your account?</h2>
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
