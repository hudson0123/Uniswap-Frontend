import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { IUser } from "@/@types";
import NotificationBanner from "@/components/NotificationBanner";
import Topbar from "@/components/Navigation/Topbar";
import AccountCard from "@/components/Account/AccountCard";
import AccountListings from "@/components/Account/AccountListings";
import AccountWatchlist from "@/components/Account/AccountWatchlist";
import AccountSettings from "@/components/Account/AccountSettings";
import AccountReceivedRequests from "@/components/Account/AccountReceivedRequests";
import AccountSentRequests from "@/components/Account/AccountSentRequests";
import { useAuthStore } from "@/lib/store";

export default function AccountPage() {
  const router = useRouter();
  const username = router.query.username;
  const [accountDetailSelection, setAccountDetailSelection] = useState(1);
  const current_user = useAuthStore((state) => state.current_user);

  const {
    data: account_data,
    isPending,
    error,
  } = useQuery<IUser>({
    queryKey: ["account_user", username],
    queryFn: async () => {
      const res = await api.get(`/api/users/${username}`);
      return res.data;
    },
    enabled: !!username,
  });

  if (isPending || !current_user) {
    return (
      <div className="m-5 mt-20 md:m-20">
        <p>LOADING...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-red-500 flex justify-center mt-5 text-sm">
          We were unable to access this account or it does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200">
      <NotificationBanner />
      <Topbar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-10 p-4 md:p-20 text-black">
        <AccountCard account_data={account_data} />
        {current_user.id == account_data.id && (
          <div className="bg-white p-6 md:p-10 flex flex-col w-full rounded-2xl shadow-xl col-span-2 min-h-[80vh] overflow-auto mt-5">
            {/* Responsive tabs */}
            <div className="flex md:grid md:grid-cols-5 overflow-x-auto gap-2 md:gap-0 mb-4">
              {[
                ["Received Requests", 1],
                ["Sent Requests", 2],
                ["My Listings", 3],
                ["Watchlist", 4],
                ["Settings", 5],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => setAccountDetailSelection(Number(id))}
                  className={`min-w-max px-4 py-2 text-sm md:text-base whitespace-nowrap rounded hover:bg-gray-100 ${
                    accountDetailSelection === id
                      ? "font-semibold border-b-2 border-black"
                      : ""
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <hr className="mb-4" />

            {/* Content area */}
            <div className="flex-1 overflow-y-auto min-h-50">
              {accountDetailSelection === 1 ? (
                <AccountReceivedRequests />
              ) : accountDetailSelection === 2 ? (
                <AccountSentRequests />
              ) : accountDetailSelection === 3 ? (
                <AccountListings />
              ) : accountDetailSelection === 4 ? (
                <AccountWatchlist />
              ) : (
                <AccountSettings />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
