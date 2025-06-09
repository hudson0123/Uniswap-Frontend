import React from 'react'
import LoginForm from '@/components/Forms/LoginForm';
import NotificationBanner from '@/components/NotificationBanner';
import Link from 'next/link';
import LandingTopbar from '@/components/Navigation/LandingTopbar';
export default function Login() {

    return (
        <div className=''>
            <LandingTopbar />
            <NotificationBanner />
            <div className='flex flex-col h-screen justify-center items-center bg-[#f5f5f5]'>
                <h2 className='text-black text-2xl font-bold'>Login to UniSwap</h2>
                <LoginForm />
                <p className="text-sm text-black">Do not Have an account? Register <Link className="italic" href="/register">here</Link>.</p>
            </div>
        </div>
    )

}
