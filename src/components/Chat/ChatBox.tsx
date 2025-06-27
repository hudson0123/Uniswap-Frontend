import React, { useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IDetailConversation } from "@/@types/models/detailconversation";
import api from "@/lib/api";
import Image from "next/image";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function Chat({ selectedChat }: { selectedChat: number }) {
  const queryClient = useQueryClient();
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const {
    data: currentUserData,
    error: currentUserError,
    isPending: currentUserPending,
  } = useCurrentUser();

  const {
    data: chatData,
    isPending,
    error,
  } = useQuery<IDetailConversation>({
    queryKey: ["conversationDetail", selectedChat],
    queryFn: async () => {
      if (selectedChat != 0) {
        const res = await api.get(`/api/conversations/${selectedChat}/`);
        // const chatBox = document.getElementById('chatBox') as HTMLDivElement
        // chatBox.scrollTop = chatBox.scrollHeight
        return res.data;
      }
    },
  });

  const messageMutation = useMutation({
    mutationFn: (message: {
      content: string;
      conversation: string;
      sender_id: string;
    }) => {
      return api.post("/api/messages/", {
        conversation: message.conversation,
        sender_id: message.sender_id,
        content: message.content,
      });
    },
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ["conversationDetail", selectedChat],
      });

      // Optimistically update to the new value
      queryClient.setQueryData(
        ["conversationDetail", selectedChat],
        (old: IDetailConversation | undefined) => {
          if (!old) return old;

          return {
            ...old,
            latest_messages: [
              {
                id: `temp-${Date.now()}`, // use a temp ID to avoid React key issues
                content: newTodo.content,
                sender: {
                  id: currentUserData?.id,
                  profile_picture: currentUserData?.profile_picture || null,
                  username: currentUserData?.username || "",
                },
                created_at: new Date().toISOString(),
              },
              ...(old.latest_messages ?? []),
            ],
          };
        }
      );
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["conversationDetail"] }),
        queryClient.invalidateQueries({ queryKey: ["conversations"] }),
      ]);
    },
  });

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatData?.latest_messages]);

  if (isPending || currentUserPending) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Image
          width={50}
          height={50}
          className="my-auto mx-auto mt-20"
          alt="loading"
          src={"/loading.svg"}
        />
      </div>
    );
  }

  if (error || currentUserError) {
    <p className="text-red-600">{error?.message}</p>;
  }

  if (!chatData) {
    return;
  }

  return (
    <div className="flex flex-col relative min-w-2/5 w-full m-5 space-y-4 bg-white rounded-xl h-[90vh] ">
      <div className="p-3 text-lg font-bold">
        {chatData.buyer.id == currentUserData?.id ? (
          <div className="flex">
            <Image
              width={50}
              height={50}
              className="rounded-full"
              alt="unread-indicator"
              src={chatData?.seller?.profile_picture || "/profile.jpg"}
            />
            <p className="my-auto ml-3 text-2xl">
              {chatData?.seller.first_name} {chatData?.seller.last_name}
            </p>
            <p className="my-auto ml-auto p-2 rounded bg-gray-200 text-xl">
              {chatData?.post?.ticket_title}
            </p>
          </div>
        ) : (
          <div className="flex">
            <Image
              width={50}
              height={50}
              className="rounded-full"
              alt="unread-indicator"
              src={chatData?.seller?.profile_picture || "/profile.jpg"}
            />
            <p className="my-auto ml-3 text-2xl">
              {chatData?.buyer.first_name} {chatData?.buyer.last_name}
            </p>
            <p className="my-auto ml-auto p-2 rounded bg-gray-200 text-xl">
              {chatData?.post?.ticket_title}
            </p>
          </div>
        )}
      </div>
      <div
        ref={chatBoxRef}
        className="flex-grow overflow-y-auto px-5 pt-4 flex flex-col gap-2"
      >
        {chatData?.latest_messages?.toReversed().map((message) => {
          const isCurrentUser = currentUserData?.id === message.sender.id;
          return (
            <div
              key={message.id}
              className={`flex items-end ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isCurrentUser && (
                <Image
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full mr-2"
                  src={message.sender.profile_picture || "/profile.jpg"}
                  alt="user-profile"
                />
              )}
              <div
                className={`max-w-xs px-4 py-2 rounded-4xl ${
                  isCurrentUser
                    ? "bg-blue-500 text-white"
                    : "bg-blue-100 text-black"
                }`}
              >
                <p>{message.content}</p>
              </div>
              {isCurrentUser && (
                <Image
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full ml-2"
                  src={message.sender.profile_picture || "/profile.jpg"}
                  alt="user-profile"
                />
              )}
            </div>
          );
        })}
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const inputElement = document.getElementById(
            "message"
          ) as HTMLInputElement;
          messageMutation.mutate({
            content: inputElement.value,
            conversation: chatData.id.toString(),
            sender_id: currentUserData!.id.toString(),
          });
          inputElement.value = "";
        }}
      >
        <div className="flex gap-2 p-5 bg-gray-50">
          <input
            type="text"
            id="message"
            className="flex-grow border border-gray-400 bg-white rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-80 transition font-semibold"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
