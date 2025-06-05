import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import api from "@/lib/api";
import { PaginatedResponse } from "@/@types/api";
import { IPost } from "@/@types";
import PostCardChunk from "@/components/Posts/PostCardChunk";
import Topbar from "@/components/Navigation/Topbar";
import NotificationBanner from "@/components/NotificationBanner";
import SearchUsers from "@/components/Users/SearchUsers";

const queryPosts = async ({ pageParam }: { pageParam: number }) => {
  const res = await api.get<PaginatedResponse<IPost>>(
    "api/posts/?page=" + pageParam
  );
  return res.data;
};

export default function Home() {
  const { data, error, isPending, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: queryPosts,
      initialPageParam: 1,
      getNextPageParam: (lastpage, _, lastPageParam) => {
        if (!lastpage.next) return null;
        return lastPageParam + 1;
      },
    });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isPending) {
    return (
      <div className="">
        <NotificationBanner />
        <Topbar />
      </div>
    );
  }

  if (error) {
    return;
  }

  return (
    <>
      <NotificationBanner />
      <Topbar />
      <div className="pt-10 px-20 flex flex-col-2 w-full min-h-[85vh] overflow-auto gap-10">
        <div className="bg-white p-10 w-2/3 rounded-2xl shadow-xl">
          {data.pages.map((page) => {
            return <PostCardChunk posts={page.results} />;
          })}
        </div>
        <SearchUsers />
      </div>
      <div className="relative pb-10">
        <div ref={ref} className="absolute top-[-200px]"></div>
      </div>
    </>
  );
}
