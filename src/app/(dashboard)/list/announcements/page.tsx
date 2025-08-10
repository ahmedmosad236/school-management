import React from "react";
import GenericListClient from "@/components/GenericListClient";
import { announcementsData } from "@/lib/data";

const AnnouncementsListPage = () => {
  return (
    <GenericListClient
      title="Announcements"
      rows={announcementsData}
      rowIdKey="id"
      columns={[
        { key: "title", header: "Title" },
        { key: "class", header: "Class" },
        { key: "date", header: "Date" },
      ]}
    />
  );
};

export default AnnouncementsListPage;
