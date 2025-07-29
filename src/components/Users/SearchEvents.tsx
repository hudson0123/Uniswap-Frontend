import { useQuery } from "@tanstack/react-query";
import EventCard from "../Events/EventCard";
import api from "@/lib/api";
import React from "react";
import { IEvent } from "@/@types/models/event";

export default function SearchEvents() {
  const { data, isPending, error } = useQuery<IEvent[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await api.get("/api/events/");
      return response.data;
    },
  });

  if (isPending || error || !data) {
    return (
      <div className="relative not-visited: bg-white p-10 rounded-sm shadow-xl w-full h-[90vh]">
        <h1 className="font-medium text-3xl">Upcoming Events</h1>
      </div>
    );
  }

  return (
    <div className="relative not-visited: bg-white p-10 rounded-sm shadow-xl w-full h-[90vh]">
      <h1 className="font-medium text-3xl mb-10">Upcoming Events</h1>
      {data.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
