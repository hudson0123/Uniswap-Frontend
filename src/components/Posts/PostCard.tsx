import React from "react";
import api from "@/lib/api";
import { IPost } from "@/@types";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function PostCard({ post }: { post: IPost }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: deletePost } = useMutation({
    mutationFn: async () => {
      await api.delete("/api/posts/" + post.id + "/");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["account_listings"],
      });
    },
  });

  const { data: currentUserData } = useCurrentUser();

  return (
    <div className="relative px-3 pb-3 w-full h-50 border-0 border-b-1">
      <div className="flex flex-rows">
        <div className="flex-cols">
          <p className="md:text-lg text-sm font-semibold">
            {post.ticket_title}
          </p>
          <p className="md:text-lg text-sm">${post.ticket_price}</p>
        </div>
        <Link className="ml-auto my-auto" href={"/" + post.author.username}>
          <p className="italic hover:underline">@{post.author.username}</p>
        </Link>
        <Link href={"/" + post.author.username}>
          <Image
            width={100}
            height={100}
            className="w-12 h-12 ml-2 rounded-full transform duration-100"
            src={
              post.author.profile_picture
                ? post.author.profile_picture
                : "/profile.jpg"
            }
            alt="user-profile"
          />
        </Link>
      </div>
      <div>
        <p className="w-5/5 mt-2">{post.description}</p>
      </div>
      <button
        className="px-2 py-1 absolute bottom-0 right-0"
        onClick={async () => {
          try {
            await api.post("/api/conversations/", {
              name: "New Chat",
              seller_id: post.author.id,
              post_id: post.id,
            });
            router.push("/chat");
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <Image
          width={100}
          height={100}
          className="w-10 h-10 ml-2 transform duration-100 cursor-pointer"
          src="/new-conversation.svg"
          alt="user-profile"
        />
      </button>
      {currentUserData?.id == post.author.id && (
        <button
          className="px-2 py-1 absolute bottom-0 right-12"
          onClick={async () => {
            try {
              deletePost();
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <Image
            width={100}
            height={100}
            className="w-10 h-10 ml-2 transform duration-100 cursor-pointer"
            src="/trash.svg"
            alt="user-profile"
          />
        </button>
      )}
    </div>
  );
}
