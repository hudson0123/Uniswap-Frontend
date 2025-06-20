import { IConversation } from "@/@types/models/conversation";
import React from "react";
import Link from "next/link";
import ChatSidebarBox from "./ChatSidebarBox";

export default function ChatSidebar({
  chats,
  // selectedChat,
  setSelectedChat,
}: {
  chats: IConversation[];
  selectedChat: number;
  setSelectedChat: React.Dispatch<React.SetStateAction<number>>;
}) {

  return (
    <div className="relative h-[93vh] bg-white border-t-1 min-w-3/10 overflow-auto">
      {chats?.map((chat) => (
        <ChatSidebarBox 
          key={chat.id}
          chat={chat}
          setSelectedChat={setSelectedChat}
        />
      ))}
      {chats.length == 0 && (
        <div className="grid ">
          <h1 className="text-black text-2xl font-semibold mx-auto mt-50">
            No Conversations
          </h1>
          <p className="mx-auto text-sm">
            Connect with others{" "}
            <Link
              href="/home"
              className="italic cursor-pointer hover:opacity-70"
            >
              here.
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
