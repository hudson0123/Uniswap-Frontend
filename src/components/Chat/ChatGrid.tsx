import { IConversation } from '@/@types/models/conversation'
import React from 'react'

export default function ChatGrid({chats}: {chats: IConversation[]}) {
  return (
    <div className='w-3/5 p-5 rounded-full'>
      {chats?.map((chat) => (
          <div className="border-b-1 border-gray-300 bg-white h-20 flex p-3" key={chat.id} >
            <p>{chat.name}</p>
          </div>
      ))}
    </div>
  )
}
