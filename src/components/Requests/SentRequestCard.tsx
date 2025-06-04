import { IRequest } from "@/@types";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

export default function SentRequestCard({ request }: { request: IRequest }) {
  return (
    <div className="">
      <div className="relative text-black rounded border shadow px-3 py-3 w-full h-fit bg-gray-300">
        <div className="flex flex-col relative">
          <div className="grid grid-cols-2 gap-1 mb-2">
            <p className="md:text-xl text-sm font-semibold whitespace-nowrap mt-auto mb-auto">
              {request.post.ticket_title}
            </p>

            <Link
              href={`/${request.post.author.username}`}
              className="flex items-center space-x-2 hover:underline"
            >
              <span className="text-sm md:text-md italic ml-auto">
                @{request.post.author.username}
              </span>
              <Image
                width={100}
                height={100}
                className="md:w-12 md:h-12 w-8 h-8 rounded-full hover:ring-1 transform duration-100"
                src={request.post.author.profile_picture || "/profile.jpg"}
                alt="user-profile"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div>
              <p className="text-sm md:text-md font-medium">
                ${request.post.ticket_price}
              </p>
              <p className="text-xs text-gray-700">
                {moment(new Date(request.sent_at)).fromNow()}
              </p>
            </div>
            <div className="mt-auto ml-auto">
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
