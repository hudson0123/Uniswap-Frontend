import React from 'react'
import { useNotifyStore } from "@/lib/store";

export default function NotificationBanner() {

    // Hooks
    const notification = useNotifyStore()
    
    // Determine Notification Color
    let color
    if (notification.notification_type == "success") {
        color = "green-500"
    } else if (notification.notification_type == "error") {
        color = "red-500"
    } else if (notification.notification_type == "warn") {
        color = "yellow-500"
    } else {
        color = "gray-500"
    }

    return (
        <>
            {notification.message !== null ? (
                <div className='fixed bottom-2 right-2 w-fit max-w-80 z-10'>
                    <div className={`flex flex-col-2 h-fit justify-start align-middle px-10 py-5 mr-3 mb-2 relative rounded-md bg-white`}>
                        <p className={`text-${color} text-sm font-bold mr-10`}>{notification.message}</p>
                        <p className='ml-auto text-gray-300 font-bold cursor-pointer absolute top-4.5 right-4' onClick={notification.clearNotification}>x</p>
                    </div>
                </div>
            ) : (
                <>
                </>
            )}
        </>
    )
}
