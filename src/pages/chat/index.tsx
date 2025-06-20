import Topbar from "@/components/Navigation/Topbar";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { IConversation } from "@/@types/models/conversation";
import ChatBox from "@/components/Chat/ChatBox";
import ChatSidebar from "@/components/Chat/ChatSidebar";
import Image from "next/image";

export default function Chat() {
  const {
    data: conversationData,
    isPending,
    error,
  } = useQuery<IConversation[]>({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await api.get("/api/my-conversations/");
      return res.data;
    },
  });
  const [selectedChat, setSelectedChat] = useState(0);

  if (isPending) {
    return (
      <Topbar />
    )
  }

  if (error) {
    return;
  }

  return (
    <div>
      <Topbar />
      <div className="flex flex-col-2">
        <ChatSidebar
          chats={conversationData}
          setSelectedChat={setSelectedChat}
        />
        <ChatBox selectedChat={selectedChat} />
        {selectedChat == 0 && (
          <Image
            width={100}
            height={100}
            className="w-30 h-30 m-auto transform duration-100 text-white"
            src="/no-messages.svg"
            alt="no-messages"
          />
        )}
      </div>
    </div>
  );
}
