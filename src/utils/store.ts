import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import router from 'next/router'
import api from '@/utils/api'
import { IUser } from '@/@types'

interface IAuthState {
    current_user: IUser | null,
    access: string | null,
    refresh: string | null,
}

interface IAuthStore extends IAuthState {
    setAccess: (access: string) => void;
    login: (username: string, password: string) => void,
    logout: () => void,
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
            login: async (username: string, password: string) => {
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
                    console.error(e)
                }
            },
            logout: () => {
                set({ current_user: null, access: null, refresh: null })
                router.push('/login')
            },
        }), {
        name: 'auth-storage',
    }
    ))