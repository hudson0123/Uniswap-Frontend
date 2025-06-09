import React from 'react'
import { useNotifyStore } from "@/lib/store";

export default function NotificationBanner() {

    // Hooks
    const notification = useNotifyStore()
    
    // Determine Notification Color
    let color
    if (notification.notification_type == "success") {
        color = "bg-green-500"
    } else if (notification.notification_type == "error") {
        color = "bg-red-500"
    } else if (notification.notification_type == "warn") {
        color = "bg-yellow-500"
    } else {
        color = "bg-gray-500"
    }

    return (
        <>
            {notification.message !== null ? (
                <div className='fixed bottom-0 w-screen z-10'>
                    <div className={`flex flex-col-2 justify-center align-middle h-10 px-5 py-2 ${color}`}>
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
