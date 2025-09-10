import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { IEvent } from '@/@types/models/event';
import Topbar from '@/components/Navigation/Topbar';
import EventCalendar from '@/components/Events/EventCalendar';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';

export default function Events() {
  const { data, isPending, error } = useQuery<IEvent[]>({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await api.get('/api/events/');
      return response.data;
    },
  });

  if (isPending) return <LoadingSpinner />;
  if (error) return <div>Error loading events</div>;
  if (!data || data.length === 0) return <div>No events found</div>;

  return (
    <div>
      <Topbar />
      <EventCalendar events={data} />
    </div>
  );
}
