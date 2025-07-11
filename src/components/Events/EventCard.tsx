import React from "react";
import { IEvent } from "@/@types/models/event";
import moment from "moment";

export interface EventCardProps {
  event: IEvent;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4 h-25 w-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-xl">{event.event_name}</h2>
      <p className="text-sm">
        {moment(new Date(event.event_date)).format("MMMM D, YYYY")}
      </p>
      <div className="flex flex-row">
        <p className="text-xs mt-auto">Host: {event.host}</p>
        <p className=" ml-3 text-xs mt-auto">Location: {event.event_location}</p>
      </div>
    </div>
  );
}
