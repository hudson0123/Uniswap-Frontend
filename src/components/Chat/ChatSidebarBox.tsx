import React from "react";
import moment from "moment";
import { IConversation } from "@/@types/models/conversation";
import Image from "next/image";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useModalStore } from "@/lib/store";

interface ChatSidebarBoxProps {
  chat: IConversation | undefined;
  setSelectedChat: React.Dispatch<React.SetStateAction<number>>;
}

export default function ChatSidebarBox({chat, setSelectedChat}: ChatSidebarBoxProps) {
  const {
    data: currentUserData,
    error: currentUserError,
    isPending: currentUserPending,
  } = useCurrentUser();
  const setModalOpen = useModalStore((state) => state.setModalOpen);

  if (currentUserPending) return;
  if (currentUserError) return;
  if (!chat) return null;

  return (
    <div
      onClick={() => {
        setSelectedChat(chat!.id);
      }}
      className={`group relative flex min-w-70 border-b-1 border-gray-300 bg-white h-20 px-3 py-2 hover:bg-gray-100 transition duration-150`}
      key={chat?.id}
    >
      <div className="flex-none my-auto mr-5">
        <Image
          width={50}
          height={50}
          className="rounded-full"
          alt="unread-indicator"
          src={chat?.seller?.profile_picture || "/profile.jpg"}
        />
      </div>
      <div className="flex-1">
        <div className="flex">
          <div>
            {chat?.buyer.id == currentUserData?.id ? (
              <p>
                {chat?.seller.first_name} {chat?.seller.last_name}
              </p>
            ) : (
              <p>
                {chat?.buyer.first_name} {chat?.buyer.last_name}
              </p>
            )}
          </div>
          {chat?.latest_message?.timestamp &&
            (new Date(chat.latest_message.timestamp) <
            new Date(Date.now() - 24 * 60 * 60 * 1000) ? (
              <p className="ml-auto my-auto text-nowrap text-gray-400 text-sm">
                {moment(chat.latest_message.timestamp).format("ddd")}
              </p>
            ) : (
              <p className="ml-auto my-auto text-nowrap text-gray-400 text-sm">
                {moment(chat.latest_message.timestamp).format("h:mm A")}
              </p>
            ))}
        </div>
        {chat?.latest_message && chat?.latest_message?.content.length > 30 ? (
          <p className="mt-2 text-sm text-gray-500 whitespace-nowrap">
            {chat?.latest_message?.content?.slice(0, 30)}...
          </p>
        ) : (
          <p className="mt-2 text-sm text-gray-500 whitespace-nowrap">
            {chat?.latest_message?.content}
          </p>
        )}
        <Image
          width={20}
          height={20}
          className="absolute bottom-2 right-4 invisible group-hover:visible cursor-pointer"
          alt="trash-icon"
          src="/trash.svg"
          onClick={() => setModalOpen("deleteConversation")}
        />
      </div>
    </div>
  );
}
