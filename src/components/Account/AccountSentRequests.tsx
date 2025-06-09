import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import SentRequestCard from "../Requests/SentRequestCard";
import { IRequest } from "@/@types";

export default function AccountSentRequests() {

  // Query Current User Sent/Received Requests
  const {
    data: sent_data,
    isPending,
    error,
  } = useQuery({
    queryKey: ["sent"],
    queryFn: async () => {
      const sent_res = await api.get("/api/my-sent-requests/");
      return sent_res.data;
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
      {sent_data.length == 0 ? (
        <div className="flex justify-center mt-auto mb-auto text-2xl h-20">
          <p className="font-semibold mt-20">
            You Have No Pending Sent Requests.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5 mt-5 overflow-y-scroll">
          {sent_data.map((sent_request: IRequest) => (
            <SentRequestCard key={sent_request.id} request={sent_request} />
          ))}
        </div>
      )}
    </>
  );
}
