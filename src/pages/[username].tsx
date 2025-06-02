import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { IUser } from "@/@types";
import NotificationBanner from "@/components/NotificationBanner";
import Topbar from "@/components/Navigation/Topbar";
import AccountCard from "@/components/Account/AccountCard";
import AccountRequests from "@/components/Account/AccountSentRequests";
import AccountListings from "@/components/Account/AccountListings";
import AccountWatchlist from "@/components/Account/AccountWatchlist";
import AccountSettings from "@/components/Account/AccountSettings";
import AccountReceivedRequests from "@/components/Account/AccountReceivedRequests";
import AccountSentRequests from "@/components/Account/AccountSentRequests";

export default function AccountPage() {
  const router = useRouter();
  const username = router.query.username;
  const [accountDetailSelection, setAccountDetailSelection] = useState(1);

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

  if (isPending) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] m-5 mt-20 md:m-20 md:gap-20 h-fit">
        <p>LOADING...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-red-500 flex justify-center mt-5 text-sm">
          We were unable to access this acount or it does not exist.
        </p>
      </div>
    );
  }

  return (
    <>
      <NotificationBanner />
      <Topbar />
      <div className="grid grid-cols-3 gap-20 p-20 h-screen bg-gray-200 text-black">
        <AccountCard account_data={account_data} />
        <div className="bg-white p-10 flex flex-col mt-15 w-full rounded-2xl shadow-xl col-span-2 max-h-[80vh]">
          <div className="grid grid-cols-5">
            <button onClick={() => setAccountDetailSelection(1)} className="hover:opacity-70 cursor-pointer">Received Requests</button>
            <button onClick={() => setAccountDetailSelection(2)} className="hover:opacity-70 cursor-pointer">Sent Requests</button>
            <button onClick={() => setAccountDetailSelection(3)} className="hover:opacity-70 cursor-pointer">My Listings</button>
            <button onClick={() => setAccountDetailSelection(4)} className="hover:opacity-70 cursor-pointer">Watchlist</button>
            <button onClick={() => setAccountDetailSelection(5)} className="hover:opacity-70 cursor-pointer">Settings</button>
          </div>
          <hr></hr>
          {accountDetailSelection == 1 ? (
            <AccountReceivedRequests />
          ) :  accountDetailSelection == 2 ? (
            <AccountSentRequests />
        ) :  accountDetailSelection == 3 ? (
              <AccountListings />
        ) :  accountDetailSelection == 4 ?  (
              <AccountWatchlist />
        ) : (
            <AccountSettings />
          )}
        </div>
      </div>
    </>
  );
}
