import React from 'react';
import { IEvent } from '@/@types/models/event';
import moment from 'moment';
import { useModalStore } from '@/lib/store';

export interface EventCardProps {
  event: IEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const modalStore = useModalStore();

  return (
    <div
      onClick={() => modalStore.openModal('viewEvent', event)}
      className="bg-gray-100 hover:bg-gray-200 rounded-sm cursor-pointer p-2 mt-3 h-fit w-full flex flex-col justify-between duration-200"
    >
      <p className="text-xl">{event.event_name}</p>
      <p className="text-sm">
        {moment(new Date(event.event_date)).format('MMMM D, YYYY')}
      </p>
    </div>
  );
}
