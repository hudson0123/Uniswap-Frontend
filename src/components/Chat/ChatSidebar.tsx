import { IConversation } from '@/@types/models/conversation'
import React from 'react'

export default function ChatSidebar({chats}: {chats: IConversation[]}) {
  return (
    <div className='h-[90vh] bg-white w-2/5'>
      {chats?.map((chat) => (
          <div className="border-b-1 border-gray-300 bg-white h-20 flex p-3 hover:bg-gray-100 transition duration-150" key={chat.id} >
            <p>{chat.name}</p>
            <p>{chat.last_message}</p>
          </div>
      ))}
    </div>
  )
}
