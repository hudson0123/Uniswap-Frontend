import React, { useState } from "react";
import { format, parseISO, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth } from "date-fns";
import classNames from "classnames";
import { IEvent } from "@/@types/models/event";

interface CalendarProps {
  events: IEvent[];
}

export default function EventCalendar({ events }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const days = [];

  let day = startDate;
  let formattedDate = "";

  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = format(parseISO(event.event_date), "yyyy-MM-dd");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, IEvent[]>);

  while (day <= endDate) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const dateKey = format(day, "yyyy-MM-dd");
      const eventsForDay = eventsByDate[dateKey] || [];

      week.push(
        <div
          key={day.toString()}
          className={classNames(
            "border p-2 h-30 overflow-y-auto",
            !isSameMonth(day, monthStart) ? "bg-gray-100 text-gray-400" : "bg-gray-300"
          )}
        >
          <div className="text-sm font-medium">{formattedDate}</div>
          {eventsForDay.map((event) => (
            <div key={event.id} className="mt-1 text-xs bg-red-300 p-2 rounded">
              {event.event_name}
            </div>
          ))}
        </div>
      );
      day = addDays(day, 1);
    }
    days.push(
      <div key={day.toString()} className="grid grid-cols-7">
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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-2 py-1 rounded-full hover:bg-gray-300 cursor-pointer"
        >
          ←
        </button>
        <h2 className="text-lg font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          onClick={handleNextMonth}
          className="px-2 py-1 rounded-full hover:bg-gray-300 cursor-pointer"
        >
          →
        </button>
      </div>
      <div className="grid grid-cols-7 mb-2 text-center font-semibold text-sm">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      {days}
    </div>
  );
}