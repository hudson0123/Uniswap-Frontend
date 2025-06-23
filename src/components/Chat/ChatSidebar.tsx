import { IConversation } from "@/@types/models/conversation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import React, { useState } from "react";
import Link from "next/link";
import ChatSidebarBox from "./ChatSidebarBox";

export default function ChatSidebar({
  setSelectedChat,
}: {
  setSelectedChat: React.Dispatch<React.SetStateAction<number>>;
}) {


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

  const [chatData, setChatData] = useState(buyingData)
 
 
  if (isPendingBuying || isPendingSelling) {
    return;
  }

  if (errorBuying || errorSelling) {
    return;
  }

  return (
    <div className="relative h-[91vh] bg-white border-t-1 min-w-3/10 overflow-auto">
      <div className="flex flex-col-2 justify-evenly border-b-1">
        <button onClick={ () => setChatData(buyingData)} className="hover:bg-gray-100 w-full py-2">
          Buying
        </button>
        <button onClick={ () => setChatData(sellingData)} className="hover:bg-gray-100 w-full py-2">
          Selling
        </button>
      </div>
      {chatData?.map((chat) => (
        <ChatSidebarBox
          key={chat.id}
          chat={chat}
          setSelectedChat={setSelectedChat}
        />
      ))}
      {chatData?.length == 0 && (
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
