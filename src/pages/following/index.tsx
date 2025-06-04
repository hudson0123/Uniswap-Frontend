import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { IUser } from '@/@types'
import { useAuthStore } from '@/lib/store';
import api from '@/lib/api';

export default function Following() {

  const current_user = useAuthStore((state) => state.current_user);


  const {
    data: followings_data,
    isPending,
    error
  } = useQuery<IUser[]>({
    queryKey: ['followings', current_user],
    queryFn: async () => {
      const res = await api.get('/api/following/');
      return res.data;
    }
  })

    if (isPending || !current_user) {
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
        <p>{following.username}</p>
      ))}
    </div>
  )
}
