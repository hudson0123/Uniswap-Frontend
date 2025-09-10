import React from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/lib/store';
import { useModalStore } from '@/lib/store';
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { IError } from '@/@types/api/response/error';
import LoadingSpinner from '../Loading/LoadingSpinner';

interface AccountSettingsProps {
  id: number;
}

export default function AccountSettings({ id }: AccountSettingsProps) {
  // Hooks
  const resetAuth = useAuthStore((state) => state.resetAuth);
  const modalStore = useModalStore();
  const router = useRouter();

  const handleLogout = () => {
    resetAuth();
    router.push('/auth/login');
    return null;
  };

  const { mutate: deleteAccount, isPending } = useMutation<
    void,
    AxiosError<IError>,
    void
  >({
    mutationFn: async () => {
      await api.delete('/api/users/' + id + '/');
    },
    onSuccess: () => {
      resetAuth();
      modalStore.closeModal('destructive');
      toast.success('Account Deleted');
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.detail ??
          error.message ??
          'Failed to delete account.'
      );
    },
  });

  return (
    <div className="relative">
      <button
        className="block border bg-black text-white rounded-md py-2 w-1/2 mt-5 h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70"
        onClick={handleLogout}
      >
        Logout
      </button>
      <button
        className="border bg-red-500 text-white rounded-md py-2 w-1/2 mt-2 h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70"
        onClick={() =>
          modalStore.openModal('destructive', {
            title: 'Are you sure?',
            subtitle:
              'Once you delete your account it cannot be undone. You will also lose all data associated with your account.',
            button: {
              label: 'Delete Account',
              onClick: () => {
                deleteAccount();
              },
            },
          })
        }
      >
        {isPending ? <LoadingSpinner /> : 'Delete Account'}
      </button>
    </div>
  );
}
