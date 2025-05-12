import React, { useState } from 'react'
import api from '@/lib/api';
import LoginForm from '@/components/Forms/LoginForm';
import { useAuthStore } from '@/lib/store';
import NotificationBanner from '@/components/NotificationBanner';

export default function Login() {

    const login = useAuthStore((state) => state.login)

    return (
        <>
        <NotificationBanner />
        <div className='flex flex-col h-screen justify-center items-center bg-[#f5f5f5]'>
            <h2 className='text-black text-2xl font-bold'>Login to UniSwap</h2>
            <LoginForm login={login} />
        </div>
        </>
    )

}
