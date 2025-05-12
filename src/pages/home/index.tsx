import React, { useState, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import api from '@/lib/api'
import { PaginatedResponse } from '@/@types/api'
import { IPost } from '@/@types'
import PostCardGrid from '@/components/Posts/PostCardGrid'

const queryPosts = async ({ pageParam }: {pageParam: number}) => {
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
      <div className='flex justify-center items-center h-[80vh]'>
        <h1>Loading..</h1>
      </div>
    )
  }

  if (error) {
    return
  }

  return (
    <>
      <div className="flex flex-col">
        {data.pages.map((page) => {
          return (
            <PostCardGrid
              posts={page.results.filter((post) => post.ticket_title.toLowerCase())}
            />
          )
        })
        }
      </div>
      <div className="relative">
        {hasNextPage ? (
          <div className='mt-5'>
            <h1>Loading...</h1>
          </div>
        ) : (
          <div className='flex flex-col w-full justify-center align-middle my-5'>
            <h2 className='font-bold text-white ml-auto mr-auto'>That's all the posts we have :)</h2>
          </div>
        )}
        <div ref={ref} className='absolute top-[-200px]'></div>
      </div>
    </>
  )

}
