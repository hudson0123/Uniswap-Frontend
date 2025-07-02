import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { IEvent } from "@/@types/models/event";
import Topbar from "@/components/Navigation/Topbar";

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
      <h1>Events</h1>
      {data.map((event) => (
        <p key={event.id}>{event.event_name}</p>
      ))}
    </div>
  );
}
