import Topbar from "@/components/Navigation/Topbar";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { IConversation } from "@/@types/models/conversation";
import ChatGrid from "@/components/Chat/ChatGrid";
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
        <ChatSidebar chats={conversationData} />
        <ChatGrid chats={conversationData} />
      </div>
    </div>
  );
}
