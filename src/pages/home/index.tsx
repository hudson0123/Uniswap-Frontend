import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import api from "@/lib/api";
import { PaginatedResponse } from "@/@types/api";
import { IPost } from "@/@types";
import PostCardChunk from "@/components/Posts/PostCardChunk";
import Topbar from "@/components/Navigation/Topbar";
import SearchUsers from "@/components/Users/SearchUsers";
import Image from "next/image";

const queryPosts = async ({ pageParam }: { pageParam: number }) => {
  const res = await api.get<PaginatedResponse<IPost>>(
    "api/posts/?page=" + pageParam
  );
  return res.data;
};

export default function Home() {
  // Hooks
  const { ref, inView } = useInView();
  const {
    data: postData,
    error: postError,
    isPending: postPending,
    fetchNextPage,
  } = useInfiniteQuery({
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
        <div className="flex items-center justify-center h-screen w-full">
          <Image
            width={50}
            height={50}
            className="my-auto mx-auto mt-20"
            alt="loading"
            src={"/loading.svg"}
          />
        </div>
      </div>
    );
  }

  if (postError) {
    return;
  }

  return (
    <>
      <Topbar />
      <div className="pt-10 px-20 flex flex-col-2 w-full min-h-[85vh] gap-10">
        <div className="bg-white p-10 w-2/3 rounded-2xl shadow-xl sticky top-10 self-start">
          <div>
            {postData.pages.map((page) => {
              return <PostCardChunk key={page.next} posts={page.results} />;
            })}
          </div>
        </div>
        <div className="invisible md:visible sticky top-10 self-start w-1/3">
          <SearchUsers />
        </div>
      </div>
      <div className="relative pb-10">
        <div ref={ref} className="absolute top-[-300px]"></div>
      </div>
    </>
  );
}
