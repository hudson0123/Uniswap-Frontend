import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { IUser } from "@/@types";
import NotificationBanner from "@/components/NotificationBanner";
import Topbar from "@/components/Navigation/Topbar";
import AccountCard from "@/components/Account/AccountCard";
import AccountListings from "@/components/Account/AccountListings";
import AccountSettings from "@/components/Account/AccountSettings";
import AccountReceivedRequests from "@/components/Account/AccountReceivedRequests";
import AccountSentRequests from "@/components/Account/AccountSentRequests";
import CreatePostForm from "@/components/Forms/CreatePostForm";
import Image from "next/image";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function AccountPage() {
  const router = useRouter();
  const username = router.query.username;
  const [accountDetailSelection, setAccountDetailSelection] = useState(1);
  const {
    data: currentUserData,
    error: currentUserError,
    isPending: currentUserPending,
  } = useCurrentUser();

  const {
    data: accountData,
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

  if (isPending || currentUserPending) {
    return (
      <div className="max-h-[85vh]">
        <NotificationBanner />
        <Topbar />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-10 p-4 md:p-20 text-black mb-20 h-[94vh]">
          <div className="relative bg-white p-10 flex flex-col mt-20 md:mt-5 w-full rounded-2xl shadow-xl">
            <Image
              src={"/profile.jpg"}
              width={100}
              height={100}
              alt="profile"
              className="w-30 h-30 flex rounded-full bg-white"
            />
          </div>
          <div className="bg-white p-6 md:p-10 flex flex-col w-full rounded-2xl shadow-xl col-span-2 overflow-auto mt-5">
            {/* Responsive tabs */}
            <div className="flex md:flex md:flex-cols-6 overflow-x-auto gap-5 md:gap-0 justify-between"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || currentUserError) {
    return (
      <div>
        <p className="text-red-500 flex justify-center mt-5 text-sm">
          We were unable to access this account or it does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="max-h-[85vh]">
      <NotificationBanner />
      <Topbar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-10 p-4 md:px-20 text-black md:mx-20 mb-20 ">
        <AccountCard accountData={accountData} />
        {currentUserData?.id == accountData.id || !currentUserData ? (
          <div className="bg-white p-6 md:p-10 flex flex-col w-full col-span-2 h-[75vh] overflow-auto mt-5 rounded-2xl shadow-xl">
            {/* Responsive tabs */}
            <div className="flex md:flex md:flex-cols-6 overflow-x-auto gap-5 md:gap-0 justify-between">
              {[
                ["Received Requests", 1],
                ["Sent Requests", 2],
                ["Create Post", 3],
                ["My Listings", 4],
                ["Settings", 5],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => setAccountDetailSelection(Number(id))}
                  className={`w-full px-4 py-2 text-xs md:text-base whitespace-nowrap hover:border-b-2 hover:border-gray-300 ${
                    accountDetailSelection === id
                      ? "font-semibold border-b-2 border-black"
                      : ""
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <hr className="" />

            {/* Content area */}
            <div className="flex-1 overflow-y-auto min-h-50">
              {accountDetailSelection === 1 ? (
                <AccountReceivedRequests />
              ) : accountDetailSelection === 2 ? (
                <AccountSentRequests />
              ) : accountDetailSelection === 3 ? (
                <CreatePostForm />
              ) : accountDetailSelection === 4 ? (
                <AccountListings currentUser_data={accountData} />
              ) : (
                <AccountSettings />
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 md:p-10 flex flex-col w-full rounded-2xl shadow-xl col-span-2 min-h-[85vh] overflow-auto mt-5">
            {/* Responsive tabs */}
            <div className="flex md:flex md:flex-cols-6 overflow-x-auto gap-5 md:gap-0 justify-between">
              {[["Active Listings", 1]].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => setAccountDetailSelection(Number(id))}
                  className={`w-full px-4 py-2 text-xs md:text-base whitespace-nowrap hover:border-b-2 hover:border-gray-200 ${
                    accountDetailSelection === id
                      ? "font-semibold border-b-2 border-black"
                      : ""
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <hr className="" />
            <AccountListings currentUser_data={currentUserData} />
          </div>
        )}
      </div>
    </div>
  );
}
