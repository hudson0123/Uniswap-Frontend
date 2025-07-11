import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ModalType = "deleteAccount" | "deleteConversation" | "deletePost" | "none";

interface IModalState {
    modalOpen: ModalType;
}

interface IModalStore extends IModalState {
    setModalOpen: (modalType: ModalType) => void;
    closeModal: () => void;
}

export const useModalStore = create<IModalStore>()(
    (set) => ({
        modalOpen: "none",
        setModalOpen: (modalType: ModalType): void => {
            set({ modalOpen: modalType })
        },
        closeModal: (): void => {
            set({ modalOpen: "none" })
        }
    })
)

/**
 * State that is stored in useAuthStore
 */
interface IAuthState {
    access: string | null,
    refresh: string | null,
}

/**
 * Functions stored in useAuthStore
 */
interface IAuthStore extends IAuthState {
    setAccess: (access: string) => void;
    setRefresh: (refresh: string) => void;
    resetAuth: () => void
}


export const useAuthStore = create<IAuthStore>()(
    persist(
        (set) => ({
            access: null,
            refresh: null,
            setAccess: (access: string): void => {
                set({ access })
            },
            setRefresh: (refresh: string): void => {
                set({refresh})
            },
            resetAuth: () => {
                set({ access: null, refresh: null})
            }
        }), {
        name: 'auth-storage',
    }
    )
)