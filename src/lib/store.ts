import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import router from 'next/router'
import api from './api'
import { IUser } from '@/@types'

/**
 * State that is stored in useAuthStore
 */
interface IAuthState {
    current_user: IUser | null,
    access: string | null,
    refresh: string | null,
}

/**
 * Functions stored in useAuthStore
 */
interface IAuthStore extends IAuthState {
    setAccess: (access: string) => void;
    login: (username: string, password: string) => void,
    logout: () => void,
    refreshCurrentUser: () => void,
}


export const useAuthStore = create<IAuthStore>()(
    persist(
        (set) => ({
            current_user: null,
            access: null,
            refresh: null,
            setAccess: (access: string): void => {
                set({ access })
            },
            login: async (username, password) => {
                set({ current_user: null })
                try {
                    const auth_token_res = await api.post('/api/token/', {
                        "username": username,
                        "password": password
                    })
                    set({ access: auth_token_res.data.access })
                    set({ refresh: auth_token_res.data.refresh })
                    const current_user_data_res = await api.get('/api/current-user/')
                    set({ current_user: current_user_data_res.data })
                    router.push('/home')
                } catch (e) {
                    useNotifyStore.getState().setNotification("error", "Error logging in.")
                }
            },
            logout: () => {
                set({ current_user: null, access: null, refresh: null })
                router.push('/login')
            },
            refreshCurrentUser: async () => {
                const current_user_data_res = await api.get('/api/current-user/')
                set({ current_user: current_user_data_res.data })
            }
        }), {
        name: 'auth-storage',
    }
    )
)

type NotificationType = "info" | "warn" | "success" | "error"

export interface INotificationState {
    notification_type: NotificationType | null,
    message: string | null,
}

export interface INotificationStore extends INotificationState {
    setNotification: (notification_type: NotificationType, message: string) => void,
    clearNotification: () => void,
}

export const useNotifyStore = create<INotificationStore>()(
    persist(
        (set) => ({
            notification_type: null,
            message: null,
            setNotification: (notification_type, message) => {
                set({ notification_type: notification_type})
                set({ message: message})
            },
            clearNotification: () => {
                set({ notification_type: null})
                set({ message: null})
            },
        }), {
            name: "notification-storage"
        }
    )

)