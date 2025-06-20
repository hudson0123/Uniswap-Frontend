import React from "react";
import moment from "moment";
import { IConversation } from "@/@types/models/conversation";
import { IUser } from "@/@types";
import Image from "next/image";

export default function chatSidebarBox({
  chat,
  currentUserData,
  setSelectedChat,
}: {
  chat: IConversation | undefined;
  currentUserData: IUser | undefined;
  setSelectedChat: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div
      onClick={() => setSelectedChat(chat!.id)}
      className="relative border-b-1 border-gray-300 bg-white h-20 flex p-3 hover:bg-gray-100 transition duration-150 "
      key={chat?.id}
    >
      <div className="grid mr-5">
        <p className="mt-auto text-nowrap">{chat?.name}</p>
        {chat?.latest_message ? (
          chat?.latest_message.sender.id === currentUserData!.id ? (
            <p className="text-nowrap ml-auto text-gray-400 text-xs">
              sent message{" "}
              {moment(new Date(chat?.latest_message.timestamp)).fromNow()}
            </p>
          ) : (
            <p className="text-nowrap mr-auto text-gray-400 text-xs">
              new message{" "}
              {moment(new Date(chat?.latest_message.timestamp)).fromNow()}
            </p>
          )
        ) : (
          <p className="mr-auto text-gray-400 text-xs text-nowrap">no messages.</p>
        )}
      </div>
      <p className="text-sm text-gray-500 ml-auto mx-10 my-auto whitespace-nowrap">
        {chat?.latest_message.content}
      </p>

      {chat?.read == false && (
          <Image
            width={30}
            height={30}
            className="absolute top-0 right-0"
            alt="unread-indicator"
            src="/red-dot.svg"
          />
      )}
    </div>
  );
}
