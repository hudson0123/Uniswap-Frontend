import Topbar from "@/components/Navigation/Topbar";
import React, { useState } from "react";
import ChatBox from "@/components/Chat/ChatBox";
import ChatSidebar from "@/components/Chat/ChatSidebar";
import Image from "next/image";

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(0);

  return (
    <div>
      <Topbar />
      <div className="flex flex-col-2">
        <ChatSidebar
          setSelectedChat={setSelectedChat}
        />
        <ChatBox selectedChat={selectedChat} />
      </div>
    </div>
  );
}
