import { IRequest } from "@/@types";
import React from "react";
import PostCard from "../Posts/PostCard";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export default function ReceivedRequestCard({
  request,
}: {
  request: IRequest;
}) {
  const queryClient = useQueryClient();

  const requestStatusMutation = useMutation({
    mutationFn: (request: { id: string; status: string }) => {
      return api.patch("/api/requests/" + request.id + "/", {
        status: request.status,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["received"] });
      queryClient.invalidateQueries({ queryKey: ["sent"] });
    },
  });

  return (
    <div className="">
      <div className="flex flex-row gap-x-5 text-2xl">
        <button
          onClick={() =>
            requestStatusMutation.mutate({ id: request.id, status: "approved" })
          }
        >
          {requestStatusMutation.isPending ? "-" : "✓"}
        </button>
        <button
          onClick={() =>
            requestStatusMutation.mutate({ id: request.id, status: "rejected" })
          }
        >
          {requestStatusMutation.isPending ? "-" : "X"}
        </button>
      </div>
      <PostCard post={request.post} />
    </div>
  );
}
