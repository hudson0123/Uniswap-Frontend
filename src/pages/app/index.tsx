import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import api from "@/lib/api";
import { PaginatedResponse } from "@/@types/api";
import { IPost } from "@/@types";
import PostCardChunk from "@/components/Posts/PostCardChunk";
import Topbar from "@/components/Navigation/Topbar";
import SearchEvents from "@/components/Users/SearchEvents";
import { useAuthStore } from "@/lib/store";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";

const queryPosts = async ({ pageParam }: { pageParam: number }) => {
  const res = await api.get<PaginatedResponse<IPost>>(
    "api/posts/?page=" + pageParam
  );
  return res.data;
};

export default function Home() {
  // Hooks
  const { ref, inView } = useInView();
  const access = useAuthStore((state) => state.access);

  const {
    data: postData,
    error: postError,
    isPending: postPending,
    fetchNextPage,
  } = useInfiniteQuery({
    enabled: access !== null,
    queryKey: ["posts"],
    queryFn: queryPosts,
    initialPageParam: 1,
    getNextPageParam: (lastpage, _, lastPageParam) => {
      if (!lastpage.next) return null;
      return lastPageParam + 1;
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (postPending) {
    return (
      <div className="">
        <Topbar />
        <LoadingSpinner size={10} />
      </div>
    );
  }

  if (postError) {
    return;
  }

  return (
    <div>
      <Topbar />
      <div className="pt-5 sm:px-10 flex flex-col md:flex-row w-full min-h-[85vh] max-w-screen-2xl mx-auto">
        <div className="w-screen mx-auto md:w-2/3 sticky top-10 self-start">
            {postData.pages.map((page) => {
              return <PostCardChunk key={page.next} posts={page.results} />;
            })}
        </div>
        <div className="hidden md:block sticky top-10 self-start w-full md:w-1/3">
          <SearchEvents />
        </div>
      </div>
      <div className="relative pb-10">
        <div ref={ref} className="absolute top-[-300px]"></div>
      </div>
    </div>
  );
}
