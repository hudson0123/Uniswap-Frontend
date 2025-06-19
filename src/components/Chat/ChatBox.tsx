import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IDetailConversation } from "@/@types/models/detailconversation";
import api from "@/lib/api";
import Image from "next/image";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function Chat({ selectedChat }: { selectedChat: number }) {
  const queryClient = useQueryClient();

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

  const conversationMutation = useMutation({
    mutationFn: (conversation: { conversation_id: string; name: string }) => {
      return api.patch(
        "/api/conversations/" + conversation.conversation_id + "/",
        {
          name: conversation.name,
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
    <div className="flex flex-col relative min-w-2/5 w-full m-5 space-y-4 bg-white rounded-xl h-[91vh] ">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const inputElement = document.getElementById(
            "chatName"
          ) as HTMLInputElement;
          conversationMutation.mutate({
            conversation_id: chatData.id.toString(),
            name: inputElement.value,
          });
          inputElement.blur();
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

      <div className="flex-grow overflow-y-auto px-5 pt-4 flex flex-col gap-2">
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
