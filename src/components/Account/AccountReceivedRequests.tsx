import React from 'react'
import { useAuthStore } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { IRequest } from '@/@types';
import ReceivedRequestCard from '../Requests/ReceivedRequestCard';

export default function AccountReceivedRequests() {


    const currentUser = useAuthStore((state) => state.current_user)

  // Query Current User Sent/Received Requests
  const {data: received_data, isPending, error} = useQuery({
            queryKey: ["received", currentUser],
            queryFn: async () => {
              const received_res = await api.get("/api/my-received-requests/");
              return received_res.data;
            },
  });

  // Check Pending or Error
  if (isPending) {
    return;
  }

  if (error) {
    return;
  }

  return (
    <div className="min-h-50 overflow-y-scroll">
      <div className="flex flex-col gap-5 mt-5">
        {received_data.map((sent_request: IRequest) => (
          <ReceivedRequestCard request={sent_request} />
        ))}
      </div>
    </div>
  );
}
