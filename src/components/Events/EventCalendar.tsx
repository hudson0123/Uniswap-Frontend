import React, { useState } from 'react';
import {
  isToday,
  isBefore,
  startOfDay,
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
} from 'date-fns';
import classNames from 'classnames';
import { IEvent } from '@/@types/models/event';
import { useModalStore } from '@/lib/store';

interface CalendarProps {
  events: IEvent[];
}

export default function EventCalendar({ events }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const modalStore = useModalStore();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = 'd';
  const days = [];

  let day = startDate;
  let formattedDate = '';

  const eventsByDate = events.reduce(
    (acc, event) => {
      const dateKey = format(parseISO(event.event_date), 'yyyy-MM-dd');
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(event);
      return acc;
    },
    {} as Record<string, IEvent[]>
  );

  while (day <= endDate) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const dateKey = format(day, 'yyyy-MM-dd');
      const eventsForDay = eventsByDate[dateKey] || [];

      week.push(
        <div
          key={day.toString()}
          className={classNames(
            'border p-2 h-fit md:h-30 overflow-y-auto',
            isBefore(day, startOfDay(new Date()))
              ? 'line-through bg-white'
              : 'bg-white',
            !isSameMonth(day, monthStart)
              ? 'bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)]'
              : isToday(day)
                ? 'bg-yellow-100'
                : ''
          )}
        >
          <div className="text-lg font-medium">{formattedDate}</div>
          {eventsForDay.map((event) => (
            <div
              onClick={() => modalStore.openModal('viewEvent', event)}
              key={event.id}
              className="mt-1 text-xs p-2 rounded bg-red-300 cursor-pointer hover:bg-red-200 transition duration-150"
            >
              {event.event_name}
            </div>
          ))}
        </div>
      );
      day = addDays(day, 1);
    }
    days.push(
      <div key={day.toString()} className="grid grid-cols-1 md:grid-cols-7">
        {week}
      </div>
    );
  }

  const handlePrevMonth = () => {
    setCurrentMonth(addDays(startOfMonth(currentMonth), -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addDays(endOfMonth(currentMonth), 1));
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-4 my-auto">
        <button
          onClick={handlePrevMonth}
          className="px-2 py-1 rounded-full hover:bg-gray-300 cursor-pointer"
        >
          ←
        </button>
        <h2 className="text-lg font-bold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={handleNextMonth}
          className="px-2 py-1 rounded-full hover:bg-gray-300 cursor-pointer"
        >
          →
        </button>
      </div>
      <div className="grid-cols-7 text-center font-semibold text-sm border-t-1 md:grid hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div className="border-x-1 px-3 py-2 bg-white" key={day}>
            {day.toUpperCase()}
          </div>
        ))}
      </div>
      {days}
    </div>
  );
}
