import { IConversation } from "@/@types/models/conversation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import React, { useState } from "react";
import Link from "next/link";
import ChatSidebarBox from "./ChatSidebarBox";
import LoadingSpinner from "../Loading/LoadingSpinner";

export interface ChatSidebarProps {
  selectedChat: number;
  setSelectedChat: React.Dispatch<React.SetStateAction<number>>;
}

export default function ChatSidebar({
  selectedChat,
  setSelectedChat,
}: ChatSidebarProps) {
  
  const {
    data: buyingData,
    isPending: isPendingBuying,
    error: errorBuying,
  } = useQuery<IConversation[]>({
    queryKey: ["buying_conversations"],
    queryFn: async () => {
      const res = await api.get("/api/my-conversations/buying/");
      return res.data;
    },
  });

  const {
    data: sellingData,
    isPending: isPendingSelling,
    error: errorSelling,
  } = useQuery<IConversation[]>({
    queryKey: ["selling_conversations"],
    queryFn: async () => {
      const res = await api.get("/api/my-conversations/selling/");
      return res.data;
    },
  });

  type ViewTypes = "buying" | "selling"

  const [view, setView] = useState<ViewTypes>("buying");

  if (isPendingBuying || isPendingSelling) {
    <div className="relative h-[91vh] bg-white border-t-1 min-w-3/10 overflow-auto">
      <div className="flex flex-col-2 justify-evenly border-b-1"></div>
    </div>;
  }

  if (errorBuying || errorSelling) {
    return;
  }

  if (!buyingData || !sellingData) return <LoadingSpinner size={10} />;

  const selectedData = view === "buying" ? buyingData : sellingData

  return (
    <div className={`relative h-[91vh] bg-white border-t-1 overflow-auto ${selectedChat === 0 ? 'md:w-3/10 w-full' : 'md:min-w-3/10 w-0'}`}>
      <div className="flex flex-col-2 justify-evenly border-b-1">
        <button
          onClick={() => setView("buying")}
          className={
            view === "buying"
              ? "bg-[#E8E8E8] w-full py-2"
              : "bg-white w-full py-2"
          }
        >
          Buying
        </button>
        <button
          onClick={() => setView("selling")}
          className={
            view === "selling"
              ? "bg-[#E8E8E8] w-full py-2"
              : "bg-white w-full py-2"
          }
        >
          Selling
        </button>
      </div>
      {selectedData?.map((chat) => (
        <ChatSidebarBox
          key={chat.id}
          chat={chat}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      ))}
      {selectedData?.length == 0 && (
        <div className="grid ">
          <h1 className="text-black text-2xl font-semibold mx-auto mt-50">
            No Conversations
          </h1>
          <p className="mx-auto text-sm">
            Connect with others{" "}
            <Link
              href="/app"
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
