import { IError } from '@/@types/api/response/error';
import useCurrentUser from '@/hooks/useCurrentUser';
import api from '@/lib/api';
import { useAuthStore, useModalStore } from '@/lib/store';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../Loading/LoadingSpinner';

export default function AccountSettingsSection() {
  const router = useRouter();
  const resetAuth = useAuthStore((state) => state.resetAuth);
  const modalStore = useModalStore();
  const { data: currentUserData } = useCurrentUser();

  const handleLogout = () => {
    resetAuth();
    router.push('/auth/login');
    return null;
  };

  const { mutate: deleteAccount, isPending: deleteAccountPending } =
    useMutation<void, AxiosError<IError>, void>({
      mutationFn: async () => {
        await api.delete('/api/users/' + currentUserData?.id + '/');
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
      <div className="grid grid-cols-2 mt-2 gap-3">
        <button
          className="block border bg-black text-white rounded-md py-2 w-full h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70"
          onClick={handleLogout}
        >
          Logout
        </button>
        <button
          className="border bg-red-500 text-white rounded-md py-2 w-full h-10 hover:opacity-80 cursor-pointer transform duration-100 focus:opacity-70"
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
          {deleteAccountPending ? <LoadingSpinner /> : 'Delete Account'}
        </button>
      </div>
    </div>
  );
}
