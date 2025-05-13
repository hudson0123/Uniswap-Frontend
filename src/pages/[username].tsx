import React from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { IUser } from '@/@types';

export default function AccountPage() {
    const router = useRouter();
    const username = router.query.username;
    const current_user_data = useAuthStore((state) => state.current_user)


    const { data: account_data, isPending, error } = useQuery<IUser>({
        queryKey: ['account_user', username],
        queryFn: async () => {
            const res = await api.get(`/api/users/${username}`);
            return res.data;
        },
        enabled: !!username,
    })

    if (isPending) {
        return (
            <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr] m-5 mt-20 md:m-20 md:gap-20 h-fit'>
                <p>LOADING...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <p className='text-red-500 flex justify-center mt-5 text-sm'>We were unable to access this acount or it does not exist.</p>
            </div>
        )
    }

    return (
        <div>
            <div className=''>
                <p className='italics'>@{account_data?.username}</p>
                <p className='ml-auto'>{account_data?.first_name} {account_data?.last_name}</p>
            </div>
        </div>
    );
}
