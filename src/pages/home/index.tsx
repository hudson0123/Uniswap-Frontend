import React, { useState, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import api from '@/lib/api'
import { PaginatedResponse } from '@/@types/api'
import { IPost } from '@/@types'
import PostCardChunk from '@/components/Posts/PostCardChunk'
import Topbar from '@/components/Navigation/Topbar'
import NotificationBanner from '@/components/NotificationBanner'

const queryPosts = async ({ pageParam }: { pageParam: number }) => {
  const res = await api.get<PaginatedResponse<IPost>>('api/posts/?page=' + pageParam)
  return res.data
}

export default function Home() {
  const { data, error, isPending, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: queryPosts,
    initialPageParam: 1,
    getNextPageParam: (lastpage, _, lastPageParam) => {
      if (!lastpage.next) return null
      return lastPageParam + 1
    }

  })
  const { ref, inView } = useInView()


  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  if (isPending) {
    return (
      <div className='bg-white flex h-screen w-full justify-center items-center'>
        <h1 className='text-black text-3xl font-bold'>Loading...</h1>
      </div>
    )
  }

  if (error) {
    return
  }

  return (
    <>
      <NotificationBanner />
      <Topbar />
      <div className="flex flex-col pt-25 bg-[#f5f5f5]">
        {data.pages.map((page) => {
          return (
            <PostCardChunk
              posts={page.results}
            />
          )
        })
        }
      </div>
      <div className="relative bg-[#f5f5f5] py-5">
        {hasNextPage ? (
          <div className='flex flex-col ml-auto mr-auto'>
            <h1 className='text-black text-2xl ml-auto mr-auto1'>...</h1>
          </div>
        ) : (
          <div className='flex flex-col w-full justify-center align-middle bg-[#f5f5f5] py-5'>
            <h2 className='font-bold text-black ml-auto mr-auto'>That's all the posts we have :)</h2>
          </div>
        )}
        <div ref={ref} className='absolute top-[-200px]'></div>
      </div>
    </>
  )

}
