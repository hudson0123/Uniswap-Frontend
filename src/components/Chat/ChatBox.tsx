import React, { useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IDetailConversation } from "@/@types/models/detailconversation";
import api from "@/lib/api";
import Image from "next/image";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import ChatMessage from "@/components/Chat/ChatMessage";

interface ChatProps {
  selectedChat: number;
}

export default function Chat({ selectedChat }: ChatProps) {
  const queryClient = useQueryClient();
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
      await queryClient.cancelQueries({queryKey: ["conversationDetail", selectedChat],});

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
        queryClient.invalidateQueries({ queryKey: ["buying_conversations"] }),
        queryClient.invalidateQueries({ queryKey: ["selling_conversations"] }),
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
          <div className="flex cursor-pointer rounded bg-gray-200 px-3 py-1" onClick={() => router.push("/" + chatData.seller.username + "/")}>
            <Image
              width={50}
              height={50}
              className="rounded-full"
              alt="unread-indicator"
              src={chatData.seller.profile_picture || "/profile.jpg"}
            />
            <p className="my-auto ml-3 text-2xl">
              {chatData.seller.first_name} {chatData.seller.last_name}
            </p>
            <p className="my-auto ml-auto p-2 text-xl">
              {chatData.post.event.event_name}
            </p>
          </div>
        ) : (
          <div className="flex">
            <Image
              width={50}
              height={50}
              className="rounded-full"
              alt="unread-indicator"
              src={chatData.seller.profile_picture ?? "/profile.jpg"}
            />
            <p className="my-auto ml-3 text-2xl">
              {chatData.buyer.first_name} {chatData.buyer.last_name}
            </p>
            <p className="my-auto ml-auto p-2 rounded bg-gray-200 text-xl">
              {chatData.post.event.event_name}
            </p>
          </div>
        )}
      </div>
      <div
        ref={chatBoxRef}
        className="flex-grow overflow-y-auto px-5 pt-4 flex flex-col gap-2"
      >
        {chatData.latest_messages.toReversed().map((message) => {
          return <ChatMessage key={message.id} currentUserData={currentUserData!} message={message}/>;
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
            defaultValue={chatData.latest_messages.length == 0 ? `Hello, I am interested in your ticket for ${chatData.post.event.event_name}.` : ""}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-80 transition font-semibold cursor-pointer"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
