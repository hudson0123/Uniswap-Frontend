import React from "react";
import api from "@/lib/api";
import { IPost } from "@/@types";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// import { useQueryClient, useMutation } from "@tanstack/react-query";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useModalStore } from "@/lib/store";

export default function PostCard({ post }: { post: IPost }) {
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

  const { data: currentUserData } = useCurrentUser();
  const setModalOpen = useModalStore((state) => state.setModalOpen);

  return (
    <div className="relative px-3 pb-3 w-full h-50 border-0 border-b-1">
      <div className="flex flex-rows">
        <div className="flex-cols">
          <p className="md:text-lg text-sm font-semibold">
            {post.ticket_title}
          </p>
          <p className="md:text-lg text-sm">${post.ticket_price}</p>
          <p>
            {post.meetup_location}
          </p>
        </div>
        <Link className="ml-auto my-auto" href={"/app/" + post.author.username}>
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
        className="px-3 py-2 absolute bottom-0 right-0 text-md cursor-pointer font-medium bg-blue-500 transition duation-200 text-nowrap inline-flex items-center justify-center mb-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={async () => {
          try {
            await api.post("/api/conversations/", {
              name: "New Chat",
              seller_id: post.author.id,
              post_id: post.id,
            });
            router.push("/app/chat");
          } catch (e) {
            console.log(e);
          }
        }}
      >Message
        <Image
          width={30}
          height={30}
          className="w-6 h-6 ml-2 mt-0.5 transform duration-100"
          src="/new-conversation.svg"
          alt="user-profile"
        />
      </button>
      {currentUserData?.id == post.author.id && (
          <Image
            width={100}
            height={100}
            className="w-10 h-10 ml-2 absolute bottom-3 left-0 transform duration-100 cursor-pointer"
            src="/trash.svg"
            alt="user-profile"
            onClick={() => setModalOpen("deletePost")}
          />
      )}
    </div>
  );
}
