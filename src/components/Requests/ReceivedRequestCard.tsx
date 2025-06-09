import { IRequest } from "@/@types";
import React from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["received"] });
      await queryClient.invalidateQueries({ queryKey: ["sent"] });
    },
  });

  return (
    <div className="">
      <div className="relative text-black px-3 pb-3 w-full h-fit">
        <div className="flex flex-col relative">
          <div className="grid grid-cols-2 gap-1 mb-2">
            <p className="md:text-xl text-sm font-semibold whitespace-nowrap mt-auto mb-auto">
              {request.post.ticket_title}
            </p>

            <Link
              href={`/${request.sender.username}`}
              className="flex items-center space-x-2 hover:underline"
            >
              <span className="text-sm md:text-md italic ml-auto">
                @{request.sender.username}
              </span>
              <Image
                width={100}
                height={100}
                className="md:w-12 md:h-12 w-8 h-8 rounded-full hover:ring-1 transform duration-100"
                src={request.sender.profile_picture || "/profile.jpg"}
                alt="user-profile"
              />
            </Link>
          </div>
          <p className="text-sm md:text-md font-medium">${request.post.ticket_price}</p>
          <p className="text-xs text-gray-700">
            {moment(new Date(request.sent_at)).fromNow()}
          </p>

          <div className="flex flex-row text-2xl ml-2 justify-center mt-2 space-x-2 absolute bottom-0 right-0">
            <button
              onClick={() =>
                requestStatusMutation.mutate({
                  id: request.id,
                  status: "approved",
                })
              }
            >
              {!requestStatusMutation.isPending && (
                <Image
                  alt="accept"
                  width={100}
                  height={100}
                  src="/accept.svg"
                  className="md:h-8 h-8 md:w-8 w-8 cursor-pointer"
                />
              )}
            </button>

            <button
              onClick={() =>
                requestStatusMutation.mutate({
                  id: request.id,
                  status: "rejected",
                })
              }
            >
              {!requestStatusMutation.isPending && (
                <Image
                  alt="reject"
                  width={100}
                  height={100}
                  src="/reject.svg"
                  className="md:h-8 h-8 md:w-8 w-8 cursor-pointer"
                />
              )}
            </button>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}
