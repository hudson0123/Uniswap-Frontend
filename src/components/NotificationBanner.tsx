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
                <div className='fixed bottom-2 right-2 w-fit max-w-80 z-10'>
                    <div className={`flex flex-col-2 h-fit justify-start align-middle px-10 py-3 relative rounded-xl ${color}`}>
                        <p className='text-black font-bold'>{notification.message}</p>
                        <p className='ml-auto text-black font-bold cursor-pointer absolute top-1 right-2' onClick={notification.clearNotification}>x</p>
                    </div>
                </div>
            ) : (
                <>
                </>
            )}
        </>
    )
}
