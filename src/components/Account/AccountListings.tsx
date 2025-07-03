import React from "react";
import { useQuery } from "@tanstack/react-query";
import { IPost, IUser } from "@/@types";
import api from "@/lib/api";
import PostCard from "../Posts/PostCard";

interface AccountListingsProps {
  currentUser_data: IUser;
}

export default function AccountListings({currentUser_data}: AccountListingsProps) {
  // Query Current User Posts
  const {
    data: listings_data,
    isPending,
    error,
  } = useQuery<IPost[]>({
    queryKey: ["account_listings", currentUser_data],
    queryFn: async () => {
      const res = await api.get("/api/my-posts/");
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] m-5 mt-20 md:m-20 md:gap-20 h-fit"></div>
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
      {listings_data.length == 0 ? (
        <div className="flex justify-center mt-auto mb-auto text-2xl h-20">
          <p className="font-semibold mt-20">
            When you create a post, you will see it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 mt-5 max-h-[60vh] overflow-y-scroll">
          {listings_data.map((listing) => (
            <PostCard key={listing.id} post={listing} />
          ))}
        </div>
      )}
    </>
  );
}
