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
        {selectedChat == 0 && (
          <Image
            width={10}
            height={10}
            className="w-30 h-30 m-auto transform duration-100 text-white"
            src="/no-messages.svg"
            alt="no-messages"
          />
        )}
      </div>
    </div>
  );
}
