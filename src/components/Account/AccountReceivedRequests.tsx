import React from "react";
import { useAuthStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { IRequest } from "@/@types";
import ReceivedRequestCard from "../Requests/ReceivedRequestCard";

export default function AccountReceivedRequests() {
  const currentUser = useAuthStore((state) => state.current_user);

  // Query Current User Sent/Received Requests
  const {
    data: received_data,
    isPending,
    error,
  } = useQuery({
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
    <>
      {received_data.length == 0 ? (
        <div className="flex justify-center mt-auto mb-auto text-2xl h-20">
          <p className="font-semibold mt-20">
            When you receive a request, you will see it here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5 mt-5 overflow-y-scroll">
          {received_data.map((sent_request: IRequest) => (
            <ReceivedRequestCard request={sent_request} />
          ))}
        </div>
      )}
    </>
  );
}
