import React from "react";
import moment from "moment";
import { IConversation } from "@/@types/models/conversation";
import Image from "next/image";

export default function chatSidebarBox({
  chat,
  setSelectedChat,
}: {
  chat: IConversation | undefined;
  setSelectedChat: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div
      onClick={() => setSelectedChat(chat!.id)}
      className="relative min-w-70 border-b-1 border-gray-300 bg-white h-20 px-3 py-2 hover:bg-gray-100 transition duration-150 "
      key={chat?.id}
    >
      <div className="flex">
        <div>
          <p className="text-nowrap text-xl font-sans font-semibold">
            {chat?.name}
          </p>
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

      {chat?.read == false && (
        <Image
          width={30}
          height={30}
          className="absolute bottom-0 right-0"
          alt="unread-indicator"
          src="/red-dot.svg"
        />
      )}
    </div>
  );
}
