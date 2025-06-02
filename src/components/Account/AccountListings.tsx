import React from "react";
import { useQuery } from "@tanstack/react-query";
import { IPost } from "@/@types";
import { useAuthStore } from "@/lib/store";
import api from "@/lib/api";
import PostCard from "../Posts/PostCard";

export default function AccountListings() {
  const current_user_data = useAuthStore((state) => state.current_user);

  const {
    data: listings_data,
    isPending,
    error,
  } = useQuery<IPost[]>({
    queryKey: ["account_listings", current_user_data],
    queryFn: async () => {
      const res = await api.get("/api/my-posts/");
      return res.data;
    },
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
    <div className="grid grid-cols-1 gap-5 mt-5 overflow-y-scroll">
      {listings_data.map((listing) => (
        <PostCard 
            post = {listing}
        />
      ))}
    </div>
  );
}
