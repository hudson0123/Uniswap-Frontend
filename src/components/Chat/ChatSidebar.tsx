import { IConversation } from "@/@types/models/conversation";
import React from "react";
import moment from "moment";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function ChatSidebar({
  chats,
  // selectedChat,
  setSelectedChat,
}: {
  chats: IConversation[];
  selectedChat: number;
  setSelectedChat: React.Dispatch<React.SetStateAction<number>>;
}) {
  function handleSelectChat(id: number) {
    setSelectedChat(id);
  }

  const {
    data: currentUserData,
    error: currentUserError,
    isPending: currentUserPending,
  } = useCurrentUser();

  if (currentUserPending) {
    return;
  }

  if (currentUserError) {
    return;
  }

  return (
    <div className="h-[90vh] bg-white border-t-1 w-2/5">
      {chats?.map((chat) => (
        <div
          onClick={() => handleSelectChat(chat.id)}
          className="border-b-1 border-gray-300 bg-white h-20 flex p-3 hover:bg-gray-100 transition duration-150"
          key={chat.id}
        >
          {
            
          }
          <p className="my-auto">{chat.name}</p>
          {chat.latest_message.sender.id == currentUserData!.id ? (
            <p className="my-auto ml-auto text-gray-400 text-xs">
              sent message{" "}
              {moment(new Date(chat.latest_message.timestamp)).fromNow()}
            </p>
          ) : (
            <p className="my-auto ml-auto text-gray-400 text-xs">
              new message{" "}
              {moment(new Date(chat.latest_message.timestamp)).fromNow()}
            </p>
          )}
          {/* {selectedChat == chat.id && (
            <p className="ml-auto my-auto text-4xl">&#183;</p>
          )} */}
        </div>
      ))}
    </div>
  );
}
