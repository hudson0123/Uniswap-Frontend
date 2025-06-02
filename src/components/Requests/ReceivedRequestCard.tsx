import { IRequest } from '@/@types'
import React from 'react'
import PostCard from '../Posts/PostCard'

export default function ReceivedRequestCard({request}: {request: IRequest}) {
  return (
    <div>
      <p>Sent At: {request.sent_at} - Status: {request.status.toUpperCase()}</p>
      <PostCard 
        post = {request.post}
      />
    </div>
  )
}
