import React from 'react';
import Image from 'next/image';
import { IMessage } from '@/@types/models/message';
import { IUser } from '@/@types/models/user';

export interface ChatMessageProps {
  currentUserData: IUser;
  message: IMessage;
}

export default function ChatMessage({
  currentUserData,
  message,
}: ChatMessageProps) {
  const isCurrentUser = currentUserData?.id === message.sender.id;

  return (
    <div
      key={message.id}
      className={`flex items-end ${
        isCurrentUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isCurrentUser && (
        <Image
          width={40}
          height={40}
          className="w-10 h-10 rounded-full mr-2"
          src={message.sender.profile_picture ?? '/profile.jpg'}
          alt="user-profile"
        />
      )}
      <div
        className={`max-w-xs px-4 py-2 rounded-xl ${
          isCurrentUser ? 'bg-indigo-200' : 'bg-gray-100'
        }`}
      >
        <p>{message.content}</p>
      </div>
      {isCurrentUser && (
        <Image
          width={40}
          height={40}
          className="w-10 h-10 rounded-full ml-2"
          src={message.sender.profile_picture || '/profile.jpg'}
          alt="user-profile"
        />
      )}
    </div>
  );
}
