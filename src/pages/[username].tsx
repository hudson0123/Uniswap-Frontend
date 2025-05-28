import React from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { IUser } from '@/@types';
import Image from 'next/image';

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
        <div className='flex flex-col h-screen bg-white text-black'>
            <div className='relative w-screen'>
                <Image src="/banner.jpg" width={100} height={100} alt="banner" className='w-screen h-30 object-fill'/>
                <Image src={account_data.profile_picture ? account_data.profile_picture : "/profile.jpg"} width={100} height={100} alt="profile" className='w-30 h-30 flex absolute left-3/5 -bottom-10 rounded-full border-1 border-black shadow-2xl bg-white'/>
            </div>
            <div className='flex flex-col gap-3 justify-center align-middle mr-auto ml-auto mt-15 text-center'>
                <p className='text-xl font-bold'>{account_data?.first_name} {account_data?.last_name}</p>
                <p className='italics'>@{account_data?.username}</p>
            </div>
            
        </div>
    );
}
