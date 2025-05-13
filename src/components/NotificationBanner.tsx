import React from 'react'
import { useNotifyStore } from "@/lib/store";

export default function NotificationBanner() {

    const notification = useNotifyStore()
    return (
        <>
            {notification.message !== null ? (
                <div className='fixed bottom-0 w-screen'>
                    <div className=' bg-red-500 flex flex-col-2 justify-center align-middle h-10 px-5 py-2'>
                        <p className='text-black font-bold'>{notification.message}</p>
                        <p className='ml-auto text-black font-bold cursor-pointer' onClick={notification.clearNotification}>x</p>
                    </div>
                </div>
            ) : (
                <>
                </>
            )}
        </>
    )
}
