"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { calendarEvents } from "@/lib/data";

const localizer = momentLocalizer(moment);

export type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
};

type Props = {
  events?: CalendarEvent[];
};

const BigCalendar = ({ events }: Props) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={events ?? calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={[Views.WORK_WEEK, Views.DAY]}
      view={view}
      defaultDate={new Date(2025, 7, 4)}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 7, 4, 8, 0, 0)}
      max={new Date(2025, 7, 4, 17, 0, 0)}
    />
  );
};

export default BigCalendar;
