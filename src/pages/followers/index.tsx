import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { IUser } from '@/@types'
import { useAuthStore } from '@/lib/store';
import api from '@/lib/api';

export default function Followers() {

  const current_user = useAuthStore((state) => state.current_user);


  const {
    data: followers_data,
    isPending,
    error
  } = useQuery<IUser[]>({
    queryKey: ['followers', current_user],
    queryFn: async () => {
      const res = await api.get('/api/followers/');
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
          We were unable to access followers for this account or it does not exist.
        </p>
      </div>
    );
  }

  return (
    <div>
      {followers_data.map((follower) => (
        <p>{follower.username}</p>
      ))}
    </div>
  )
}
