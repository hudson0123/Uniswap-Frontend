import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { IRequest } from "@/@types";
import ReceivedRequestCard from "../Requests/ReceivedRequestCard";

export default function AccountReceivedRequests() {

  // Query Current User Sent/Received Requests
  const {
    data: received_data,
    isPending,
    error,
  } = useQuery({
    queryKey: ["received"],
    queryFn: async () => {
      const received_res = await api.get("/api/my-received-requests/?status=pending");
      return received_res.data;
    },
  });

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
            You Have No Pending Requests.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5 mt-5 overflow-y-scroll">
          {received_data.map((sent_request: IRequest) => (
            <ReceivedRequestCard key={sent_request.id} request={sent_request} />
          ))}
        </div>
      )}
    </>
  );
}
