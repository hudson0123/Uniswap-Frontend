import React from 'react'
import api from '@/lib/api'
import { useNotifyStore } from '@/lib/store'
import { useMutation } from '@tanstack/react-query';
import { IPost, ICreatePost } from '@/@types';
import Link from 'next/link';
import Image from 'next/image';

export default function PostCard({ post }: { post: IPost }) {

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
        <div className='relative text-black rounded border-1 shadow px-3 py-3 w-full h-50 bg-gray-300'>
            <div className='flex flex-rows'>
                <div className='flex-cols'>
                    <p className='text-lg font-semibold'>{post.ticket_title}</p>
                    <p className=''>${post.ticket_price}</p>
                </div>
                <Link className="ml-auto my-auto" href={"/" + post.author.username}>
                    <p className='italic hover:underline'>@{post.author.username}</p>
                </Link>
                <Link href={"/" + post.author.username}><Image width={100} height={100} className="w-12 h-12 ml-2 rounded-full border-1 border-gray-300 hover:ring-1 ring-white transform duration-100" src={post.author.profile_picture ? post.author.profile_picture : "/profile.jpg"} alt="user-profile" /></Link>
            </div>

            <hr></hr>
            <div>
                <p className='w-3/5 mt-2'>{post.description}</p>
            </div>
            <button className="absolute bottom-2 left-2 border-1 px-2 py-1 rounded bg-white cursor-pointer hover:bg-gray-200 transform duration-200" onClick={() => {
                createRequestMutation.mutate({
                    sender_id: post.author.id,
                    post_id: post.id
                })
            }}>Request</button>
        </div>
    )
}