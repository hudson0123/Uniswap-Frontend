import { IEvent } from '@/@types/models/event';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ModalProps {
  destructive: {
    title: string;
    subtitle: string;
    button: {
      label: string;
      onClick: () => void;
    };
  };
  createPost: {
    title: string;
  };
  viewEvent: IEvent;
}

type IModalState<ModalProps> = {
  [K in keyof ModalProps]: ModalProps[K] | false;
};

interface IModalStore extends IModalState<ModalProps> {
  openModal: <T extends keyof ModalProps>(
    modal: T,
    props: ModalProps[T]
  ) => void;
  closeModal: (modalType: keyof ModalProps) => void;
}

export const useModalStore = create<IModalStore>()((set) => ({
  destructive: false,
  createPost: false,
  viewEvent: false,
  openModal: (modal, props): void => {
    set({ [modal]: props });
  },
  closeModal: (modal): void => {
    set({ [modal]: false });
  },
}));

/**
 * State that is stored in useAuthStore
 */
interface IAuthState {
  access: string | null;
  refresh: string | null;
}

/**
 * Functions stored in useAuthStore
 */
interface IAuthStore extends IAuthState {
  setAccess: (access: string) => void;
  setRefresh: (refresh: string) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      access: null,
      refresh: null,
      setAccess: (access: string): void => {
        set({ access });
      },
      setRefresh: (refresh: string): void => {
        set({ refresh });
      },
      resetAuth: () => {
        set({ access: null, refresh: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
