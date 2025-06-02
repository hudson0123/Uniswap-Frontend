import React from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { IUser } from "@/@types";
import Image from "next/image";
import NotificationBanner from "@/components/NotificationBanner";
import Topbar from "@/components/Navigation/Topbar";
import AccountCard from "@/components/Account/AccountCard";

export default function AccountPage() {
  const router = useRouter();
  const username = router.query.username;
  const current_user_data = useAuthStore((state) => state.current_user);

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
        <AccountCard 
            account_data={account_data}
        />
        <div className="bg-white p-10 flex flex-col mt-15 w-full rounded-2xl shadow-xl col-span-2">
          
        </div>
      </div>
    </>
  );
}
