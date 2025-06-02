import { IRequest } from '@/@types'
import React from 'react'
import PostCard from '../Posts/PostCard'

export default function SentRequestCard({request}: {request: IRequest}) {
  return (
    <div>
      <p>Sent At: {new Date(request.sent_at).toDateString()} - Status: {request.status.toUpperCase()}</p>
      <PostCard 
        post = {request.post}
      />
    </div>
  )
}
