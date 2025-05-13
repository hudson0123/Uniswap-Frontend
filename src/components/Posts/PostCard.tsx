import React from 'react'
import api from '@/lib/api'
import { useNotifyStore } from '@/lib/store'
import { useMutation } from '@tanstack/react-query';
import { IPost, ICreatePost } from '@/@types';

export default function PostCard({ post } : {post: IPost}) {

    const setNotification = useNotifyStore(((state) => state.setNotification))

    const createRequestMutation = useMutation({
        mutationFn: (request: ICreatePost) => {
            return api.post('/api/requests/', {
                "sender_id": request.sender_id,
                "post_id": request.post_id
            })
        },
        onError: (error) => {
            setNotification("error", JSON.stringify(error.message))
        },
        onSuccess: () => {
            setNotification("success", "Sent Request.")
        }
    })

    return (
        <div className='bg-white text-black rounded border-1 shadow px-3 py-3 w-full h-50 mb-2'>
            <div className='flex flex-rows'>
                <p className='text-lg font-semibold'>{post.ticket_title}</p>
                <p className='ml-auto'>@{post.author.username}</p>
            </div>
            <div>
                <p className=''>${post.ticket_price}</p>
            </div>
            <button onClick={() => {
                createRequestMutation.mutate({
                    sender_id: post.author.id,
                    post_id: post.id
                })
            }}>Click Me</button>
        </div>
    )
}