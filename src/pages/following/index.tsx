import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { IUser } from '@/@types'
import api from '@/lib/api';

export default function Following() {

  // Hooks
  const {
    data: followings_data,
    isPending,
    error
  } = useQuery<IUser[]>({
    queryKey: ['followings'],
    queryFn: async () => {
      const res = await api.get('/api/following/');
      return res.data;
    }
  })

    if (isPending) {
    return (
      <div className="m-5 mt-20 md:m-20">
        <p>LOADING...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-red-500 flex justify-center mt-5 text-sm">
          We were unable to access followings for this account or it does not exist.
        </p>
      </div>
    );
  }

  return (
    <div>
      {followings_data.map((following) => (
        <p key={following.id}>{following.username}</p>
      ))}
    </div>
  )
}
