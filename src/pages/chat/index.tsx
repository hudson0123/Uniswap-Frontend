import Topbar from "@/components/Navigation/Topbar";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { IConversation } from "@/@types/models/conversation";
import ChatBox from "@/components/Chat/ChatBox";
import ChatSidebar from "@/components/Chat/ChatSidebar";

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
  const [selectedChat, setSelectedChat] = useState(0)

  if (isPending) {
    return;
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
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
        <ChatBox
          selectedChat={selectedChat}
        />
      </div>
    </div>
  );
}
