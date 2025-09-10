import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { IUser } from '@/@types';
import Topbar from '@/components/Navigation/Topbar';
import AccountCard from '@/components/Account/AccountCard';
import AccountListings from '@/components/Account/AccountListings';
import useCurrentUser from '@/hooks/useCurrentUser';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';
import { useModalStore } from '@/lib/store';

export default function AccountPage() {
  const router = useRouter();
  const username = router.query.username;
  const [accountDetailSelection, setAccountDetailSelection] = useState(1);
  const modalStore = useModalStore();
  const {
    data: currentUserData,
    error: currentUserError,
    isPending: currentUserPending,
  } = useCurrentUser();
  const {
    data: accountData,
    isPending,
    error,
  } = useQuery<IUser>({
    queryKey: ['account_user', username],
    queryFn: async () => {
      const res = await api.get(`/api/users/${username}`);
      return res.data;
    },
    enabled: !!username,
  });

  if (isPending || currentUserPending) {
    return (
      <div>
        <Topbar />
        <LoadingSpinner size={10} />
      </div>
    );
  }

  if (error || currentUserError) {
    return (
      <div>
        <p className="text-red-500 flex justify-center mt-5 text-sm">
          We were unable to access this account or it does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="max-h-[85vh]">
      <Topbar />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 lg:gap-x-5 p-4 text-black md:mx-20 mb-20 ">
        <AccountCard accountData={accountData} />
        {currentUserData?.id == accountData.id || !currentUserData ? (
          <div className="bg-white p-6 md:p-10 flex flex-col w-full col-span-2 overflow-auto mt-5 rounded-sm shadow">
            <div className="flex flex-cols mb-2">
              <h1 className="text-2xl ml-2 font-thim">Posts</h1>
              <button
                onClick={() =>
                  modalStore.openModal('createPost', { title: 'Create Post' })
                }
                className="ml-auto bg-blue-200 px-2 py-1 rounded-md hover:bg-blue-100 cursor-pointer"
              >
                New Post
              </button>
            </div>
            <hr className="" />

            {/* Content area */}
            <div className="flex-1 overflow-y-auto min-h-50">
              <AccountListings userData={accountData} />
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 md:p-10 flex flex-col w-full rounded-2xl shadow-xl col-span-2 min-h-[83vh] overflow-auto mt-5">
            {/* Responsive tabs */}
            <div className="flex md:flex md:flex-cols-6 overflow-x-auto gap-5 md:gap-0 justify-between">
              {[['Active Listings', 1]].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => setAccountDetailSelection(Number(id))}
                  className={`w-full px-4 py-2 text-xs md:text-base whitespace-nowrap hover:border-b-2 hover:border-gray-200 ${
                    accountDetailSelection === id
                      ? 'font-semibold border-b-2 border-black'
                      : ''
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <hr className="" />
            <AccountListings userData={accountData} />
          </div>
        )}
      </div>
    </div>
  );
}
