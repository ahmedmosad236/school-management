import React from "react";
import GenericListClient from "@/components/GenericListClient";
import { eventsData } from "@/lib/data";

const EventsListPage = () => {
  return (
    <GenericListClient
      title="Events"
      rows={eventsData}
      rowIdKey="id"
      viewBasePath="/list/events"
      editBasePath="/list/events"
      deleteBasePath="/list/events"
      addHref="/list/events/add"
      columns={[
        { key: "title", header: "Title" },
        { key: "class", header: "Class" },
        { key: "date", header: "Date" },
        { key: "startTime", header: "Start" },
        { key: "endTime", header: "End" },
      ]}
    />
  );
};

export default EventsListPage;
