import React from 'react'
import { useNotifyStore } from "@/lib/store";

export default function NotificationBanner() {

    const notification = useNotifyStore()
    console.log(notification.message)
    return (
        <>
            {notification.message !== null &&
                <div>
                    <p>{notification.message}</p>
                </div>
            }
        </>
    )
}
