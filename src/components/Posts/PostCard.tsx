import React from "react";
import api from "@/lib/api";
import { IPost } from "@/@types";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useModalStore } from "@/lib/store";
import moment from "moment";

interface PostCardProps {
  post: IPost;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  // const queryClient = useQueryClient();
  // const { mutate: deletePost } = useMutation({
  //   mutationFn: async () => {
  //     await api.delete("/api/posts/" + post.id + "/");
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["account_listings"],
  //     });
  //   },
  // });

  const { mutate: createConversation } = useMutation({
    mutationFn: async () => {
      await api.post("/api/conversations/", {
        name: post.author + "'s Ticket",
        seller_id: post.author.id,
        post_id: post.id,
      });
    },
    onSuccess: () => {
      router.push("/app/chat");
    },
  });

  const { data: currentUserData } = useCurrentUser();
  const setModalOpen = useModalStore((state) => state.setModalOpen);

  return (
    <div className="relative pb-3 w-full h-50 border-0 bg-white p-5 rounded-sm">
      <div className="flex flex-rows">
        <div className="flex-cols">
          <div className="flex flex-cols">
            <div className="group flex">
              <Image
                width={100}
                height={100}
                className="w-7 h-7 mr-1 my-auto rounded-full transform duration-100 inline"
                src={
                  // Default profile picture if author does not have one
                  post.author.profile_picture ?? "/profile.jpg"
                }
                alt="user-profile"
              />
              <Link
                className="group-hover:underline my-auto mr-1 text-sm"
                href={"/app/" + post.author.username}
              >
                {post.author.username}
              </Link>
            </div>
            <p className="inline my-auto ml-1 text-sm font-thin text-gray-500">
              &#183;{" "}
              {
                // Display time since post creation
                moment(post.created_at).startOf("day").fromNow()
              }
            </p>
            <p className="inline my-auto ml-1 text-sm font-thin text-gray-500">
              {" "}
              &#183; {post.author.verified ? "Verified" : "Unverified"}
            </p>
            <p className="absolute top-6 right-2 font-semibold md:text-lg text-sm">
              ${post.ticket_price}
            </p>
          </div>
          <p className="mt-3 md:text-xl text-sm font-bold">
            {post.event.event_name}
          </p>
          <p className="w-5/5 text-sm">{post.description}</p>
        </div>
      </div>
      <button
        className="px-3 py-2 w-22 font-bold absolute bottom-0 right-2 text-md cursor-pointer bg-blue-400 transition duation-200 text-nowrap inline-flex items-center justify-center mb-2 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => createConversation()}
      >
        Message
      </button>
      {currentUserData?.id == post.author.id && (
        <button
          className="px-3 py-2 w-22 font-bold absolute bottom-11 right-2 text-md cursor-pointer bg-red-400 transition duation-200 text-nowrap inline-flex items-center justify-center mb-2 rounded-xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => setModalOpen("deletePost")}
        >
          Delete
        </button>
      )}
    </div>
  );
}
