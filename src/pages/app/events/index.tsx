import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { IEvent } from "@/@types/models/event";
import Topbar from "@/components/Navigation/Topbar";
import EventCard from "@/components/Events/EventCard";

export default function Events() {
  const { data, isPending, error } = useQuery<IEvent[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await api.get("/api/events/");
      return response.data;
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading events</div>;
  if (!data || data.length === 0) return <div>No events found</div>;

  return (
    <div>
      <Topbar />
      <h1 className="m-6 text-2xl">Events</h1>
      {data.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
