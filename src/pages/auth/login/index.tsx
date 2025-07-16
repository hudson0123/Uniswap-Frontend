import React from 'react'
import LoginForm from '@/components/Forms/LoginForm';
import Link from 'next/link';
import LandingTopbar from '@/components/Navigation/LandingTopbar';

export default function Login() {
    return (
        <div className=''>
            <LandingTopbar />
            <div className='flex flex-col h-[90vh] justify-center items-center'>
                <h2 className='text-black text-2xl font-bold'>Login to UniSwap</h2>
                <LoginForm />
                <p className="text-sm text-black">Do not Have an account? Register <Link className="italic" href="/auth/register">here</Link>.</p>
            </div>
        </div>
    )

}
