import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IDetailConversation } from "@/@types/models/detailconversation";
import api from "@/lib/api";
import Image from "next/image";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function Chat({ selectedChat }: { selectedChat: number }) {
  const queryClient = useQueryClient();
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
  const {
    data: currentUserData,
    error: currentUserError,
    isPending: currentUserPending,
  } = useCurrentUser();
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
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["conversationDetail"] }),
        queryClient.invalidateQueries({ queryKey: ["conversations"] }),
      ]);
    },
  });

    const conversationMutation = useMutation({
    mutationFn: (conversation: {
      conversation_id: string;
      name: string;
    }) => {
      return api.patch("/api/conversations/" + conversation.conversation_id + "/", {
        name: conversation.name,
      });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["conversationDetail"] }),
        queryClient.invalidateQueries({ queryKey: ["conversations"] }),
      ]);
    },
  });

  if (isPending || currentUserPending) {
    return;
  }

  if (error || currentUserError) {
    <p className="text-red-600">{error?.message}</p>;
  }

  if (!chatData) {
    return;
  }

  return (
    <div className="relative w-3/5 m-5 space-y-4 bg-white rounded-xl h-[85vh] overflow-y-auto">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const inputElement = document.getElementById('chatName') as HTMLInputElement;
          conversationMutation.mutate({conversation_id: chatData.id.toString(), name: inputElement.value})
          inputElement.blur()
        }}
      >
        <div className="group p-2">
          <input
            id="chatName"
            className="text-xl bg-white focus:bg-white font-semibold text-black"
            defaultValue={chatData?.name}
          />
        </div>
      </form>

      <div className="flex flex-col gap-2 p-5">
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
                className={`max-w-xs px-4 py-2 rounded-lg text-white ${
                  isCurrentUser ? "bg-blue-500" : "bg-gray-500"
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
          <div className="flex">
            <input
              type="text"
              id="message"
              className="absolute border-1 bottom-3 w-13/16 flex justify-center px-3 py-2 rounded-lg"
            />
            <button className="absolute w-2/16 bottom-3 right-4 border-1 rounded-lg bg-blue-300 px-3 py-2 cursor-pointer hover:opacity-70 transition duration-150 font-bold">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
